import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codes = searchParams.get('codes') || 'sh000001';

  try {
    const response = await fetch(
      `https://hq.sinajs.cn/list=${codes}`,
      {
        headers: {
          'Referer': 'https://finance.sina.com.cn',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        next: { revalidate: 10 } // 缓存10秒
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: '获取数据失败' }, { status: 500 });
    }

    const text = await response.text();
    
    // 解析新浪行情数据
    // 格式: var hq_str_代码="名称,当前价,涨跌,涨跌幅,成交量(手),成交额(元),...,时间,日期"
    const quotes: Record<string, any> = {};
    const lines = text.trim().split('\n');
    
    for (const line of lines) {
      const match = line.match(/var hq_str_(\w+)="(.+)"/);
      if (match) {
        const code = match[1];
        const data = match[2].split(',');
        
        if (data.length >= 32) {
          quotes[code] = {
            name: data[0],
            price: parseFloat(data[1]) || 0,
            change: parseFloat(data[2]) || 0,
            changePercent: parseFloat(data[3]) || 0,
            volume: parseInt(data[4]) || 0,
            amount: parseFloat(data[5]) || 0,
            open: parseFloat(data[6]) || 0,
            close: parseFloat(data[7]) || 0,
            high: parseFloat(data[9]) || 0,
            low: parseFloat(data[10]) || 0,
            time: data[30] || '',
            date: data[31] || '',
          };
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: quotes,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
