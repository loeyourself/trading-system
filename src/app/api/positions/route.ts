import { NextRequest, NextResponse } from 'next/server';

// Mock 持仓数据
const mockPositions = [
  { id: '1', stock_code: 'sh600110', stock_name: '诺德股份', quantity: 5000, avg_price: 9.80, current_price: 10.35, pnl: 2750, updated_at: new Date().toISOString() },
  { id: '2', stock_code: 'sz300857', stock_name: '协创数据', quantity: 2000, avg_price: 260.00, current_price: 280.00, pnl: 40000, updated_at: new Date().toISOString() },
];

const mockPositionsData = [...mockPositions];

export async function GET() {
  return NextResponse.json({ positions: mockPositionsData });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stockCode, stockName, quantity, avgPrice, currentPrice } = body;

    const pnl = currentPrice ? (currentPrice - avgPrice) * quantity : 0;

    const newPosition = {
      id: Date.now().toString(),
      stock_code: stockCode,
      stock_name: stockName,
      quantity,
      avg_price: avgPrice,
      current_price: currentPrice,
      pnl,
      updated_at: new Date().toISOString(),
    };

    mockPositionsData.push(newPosition);
    return NextResponse.json({ position: newPosition });
  } catch (error) {
    console.error('添加持仓失败:', error);
    return NextResponse.json({ error: '添加失败' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, quantity, avgPrice, currentPrice } = body;

    const position = mockPositionsData.find(p => p.id === id);
    if (position) {
      if (quantity !== undefined) position.quantity = quantity;
      if (avgPrice !== undefined) position.avg_price = avgPrice;
      if (currentPrice !== undefined) {
        position.current_price = currentPrice;
        position.pnl = (currentPrice - position.avg_price) * position.quantity;
      }
      position.updated_at = new Date().toISOString();
    }
    return NextResponse.json({ position });
  } catch (error) {
    console.error('更新持仓失败:', error);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const index = mockPositionsData.findIndex(p => p.id === id);
    if (index > -1) {
      mockPositionsData.splice(index, 1);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除持仓失败:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
