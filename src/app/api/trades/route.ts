import { NextRequest, NextResponse } from 'next/server';

// Mock 数据用于测试
const mockTrades = [
  { id: '1', stock_code: 'sh600110', stock_name: '诺德股份', type: 'buy', price: 9.80, quantity: 10000, date: '2026-04-01', reason: '放量突破', pnl: null, created_at: new Date().toISOString() },
  { id: '2', stock_code: 'sh600110', stock_name: '诺德股份', type: 'sell', price: 10.50, quantity: 5000, date: '2026-04-08', reason: '盈利减仓', pnl: 3500, created_at: new Date().toISOString() },
  { id: '3', stock_code: 'sh600183', stock_name: '生益科技', type: 'buy', price: 65.00, quantity: 5000, date: '2026-04-05', reason: '缩量回踩', pnl: null, created_at: new Date().toISOString() },
  { id: '4', stock_code: 'sz300857', stock_name: '协创数据', type: 'buy', price: 260.00, quantity: 2000, date: '2026-04-10', reason: '算力概念', pnl: null, created_at: new Date().toISOString() },
];

const mockTradesData = [...mockTrades];

export async function GET() {
  return NextResponse.json({ trades: mockTradesData });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stockCode, stockName, type, price, quantity, date, reason } = body;

    let pnl = null;
    if (type === 'sell') {
      // 简单计算盈亏
      const buyTrades = mockTradesData.filter(t => t.stock_code === stockCode && t.type === 'buy');
      if (buyTrades.length > 0) {
        const avgBuyPrice = buyTrades.reduce((sum, t) => sum + t.price, 0) / buyTrades.length;
        pnl = (price - avgBuyPrice) * quantity;
      }
    }

    const newTrade = {
      id: Date.now().toString(),
      stock_code: stockCode,
      stock_name: stockName,
      type,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      date,
      reason: reason || null,
      pnl,
      created_at: new Date().toISOString(),
    };

    mockTradesData.unshift(newTrade);
    return NextResponse.json({ trade: newTrade });
  } catch (error) {
    console.error('添加交易记录失败:', error);
    return NextResponse.json({ error: '添加失败' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const index = mockTradesData.findIndex(t => t.id === id);
    if (index > -1) {
      mockTradesData.splice(index, 1);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除交易记录失败:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
