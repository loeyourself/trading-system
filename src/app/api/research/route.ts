import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { ticker, date } = await request.json();

    if (!ticker) {
      return NextResponse.json(
        { success: false, error: '缺少股票代码' },
        { status: 400 }
      );
    }

    // Python 脚本路径
    const scriptPath = path.join(
      process.cwd(),
      'scripts',
      'research.py'
    );

    // 研究日期（默认今天）
    const researchDate = date || new Date().toISOString().split('T')[0];

    console.log(`开始研究: ${ticker}, 日期: ${researchDate}`);

    // 执行 Python 脚本
    const result = await new Promise<{ success: boolean; ticker: string; decision?: string; error?: string }>((resolve, reject) => {
      const pythonProcess = spawn('python', [scriptPath, ticker, researchDate], {
        cwd: process.cwd(),
        env: {
          ...process.env,
          PYTHONIOENCODING: 'utf-8',
        },
        timeout: 300000, // 5分钟超时
      });

      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          try {
            const result = JSON.parse(output);
            resolve(result);
          } catch {
            // 如果不是完整 JSON，尝试提取最后的 JSON 对象
            const jsonMatch = output.match(/\{[\s\S]*"success"[\s\S]*\}/);
            if (jsonMatch) {
              resolve(JSON.parse(jsonMatch[0]));
            } else {
              resolve({
                success: true,
                ticker,
                decision: output.substring(output.lastIndexOf('['), output.lastIndexOf(']') + 1).slice(0, 1000) || output.slice(-500),
              });
            }
          }
        } else {
          resolve({
            success: false,
            ticker,
            error: errorOutput || `进程退出码: ${code}`,
          });
        }
      });

      pythonProcess.on('error', (err) => {
        reject(err);
      });

      // 5分钟超时
      setTimeout(() => {
        pythonProcess.kill();
        reject(new Error('研究超时（5分钟）'));
      }, 300000);
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('研究接口错误:', error);
    return NextResponse.json(
      { success: false, error: error.message || '服务器内部错误' },
      { status: 500 }
    );
  }
}
