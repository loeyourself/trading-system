import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const codes = searchParams.get('codes');

  if (!codes) {
    return NextResponse.json({ error: '缺少股票代码参数' }, { status: 400 });
  }

  try {
    const url = `https://hq.sinajs.cn/list=${codes}`;
    const response = await fetch(url, {
      headers: {
        'Referer': 'https://finance.sina.com.cn',
      },
    });

    if (!response.ok) {
      throw new Error('获取数据失败');
    }

    const text = await response.text();
    const lines = text.trim().split('\n');

    const stocks: any[] = [];
    for (const line of lines) {
      const match = line.match(/hq_str_(\w+)="(.+)"/);
      if (match) {
        const code = match[1];
        const data = match[2].split(',');
        if (data.length >= 10) {
          stocks.push({
            code,
            name: data[0],
            price: parseFloat(data[1]) || 0,
            change: parseFloat(data[2]) || 0,
            pctChange: parseFloat(data[3]) || 0,
            volume: parseInt(data[4]) || 0,
            amount: parseFloat(data[5]) || 0,
            open: parseFloat(data[6]) || 0,
            close: parseFloat(data[7]) || 0,
            high: parseFloat(data[8]) || 0,
            low: parseFloat(data[9]) || 0,
          });
        }
      }
    }

    return NextResponse.json({ stocks });
  } catch (error) {
    console.error('股票数据获取失败:', error);
    return NextResponse.json({ error: '获取数据失败' }, { status: 500 });
  }
}
