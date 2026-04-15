import { NextRequest, NextResponse } from 'next/server';

// Mock 数据用于测试
const mockStocks = [
  { id: '1', code: 'sh600110', name: '诺德股份', status: 'hold', strategy: '波段交易', notes: '铜箔龙头', add_date: '2026-04-01', created_at: new Date().toISOString() },
  { id: '2', code: 'sh600183', name: '生益科技', status: 'watch', strategy: '突破买入', notes: 'PCB龙头', add_date: '2026-04-05', created_at: new Date().toISOString() },
  { id: '3', code: 'sz300857', name: '协创数据', status: 'hold', strategy: '算力租赁', notes: '算力概念', add_date: '2026-04-10', created_at: new Date().toISOString() },
];

const mockStocksData = [...mockStocks];

export async function GET() {
  return NextResponse.json({ stocks: mockStocksData });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, name, status, strategy, notes } = body;

    const newStock = {
      id: Date.now().toString(),
      code,
      name,
      status: status || 'watch',
      strategy: strategy || null,
      notes: notes || null,
      add_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    };

    mockStocksData.push(newStock);
    return NextResponse.json({ stock: newStock });
  } catch (error) {
    console.error('添加股票失败:', error);
    return NextResponse.json({ error: '添加失败' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const index = mockStocksData.findIndex(s => s.id === id);
    if (index > -1) {
      mockStocksData.splice(index, 1);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除股票失败:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, strategy, notes } = body;

    const stock = mockStocksData.find(s => s.id === id);
    if (stock) {
      if (status) stock.status = status;
      if (strategy !== undefined) stock.strategy = strategy;
      if (notes !== undefined) stock.notes = notes;
    }
    return NextResponse.json({ stock });
  } catch (error) {
    console.error('更新股票失败:', error);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}
