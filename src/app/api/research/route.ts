import { NextRequest, NextResponse } from 'next/server';

// TradingAgents 微服务地址（本地开发用）
const SERVICE_URL = process.env.TRADING_SERVICE_URL || 'http://localhost:8000';

interface ResearchRequest {
  ticker: string;
  date?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { ticker, date }: ResearchRequest = await request.json();

    if (!ticker) {
      return NextResponse.json(
        { success: false, error: '缺少股票代码' },
        { status: 400 }
      );
    }

    console.log(`调用微服务研究: ${ticker}`);

    // 调用微服务
    const response = await fetch(`${SERVICE_URL}/research`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker, date }),
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('研究接口错误:', error);
    return NextResponse.json(
      { success: false, error: error.message || '服务暂时不可用' },
      { status: 500 }
    );
  }
}
