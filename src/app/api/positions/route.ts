import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('positions')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ positions: data });
  } catch (error) {
    console.error('获取持仓失败:', error);
    return NextResponse.json({ error: '获取数据失败' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stockCode, stockName, quantity, avgPrice, currentPrice } = body;

    const pnl = currentPrice ? (currentPrice - avgPrice) * quantity : 0;

    const { data, error } = await supabase
      .from('positions')
      .insert({ stock_code: stockCode, stock_name: stockName, quantity, avg_price: avgPrice, current_price: currentPrice, pnl })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ position: data });
  } catch (error) {
    console.error('添加持仓失败:', error);
    return NextResponse.json({ error: '添加失败' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, quantity, avgPrice, currentPrice } = body;

    const pnl = currentPrice && avgPrice ? (currentPrice - avgPrice) * quantity : 0;

    const { data, error } = await supabase
      .from('positions')
      .update({ quantity, avg_price: avgPrice, current_price: currentPrice, pnl, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ position: data });
  } catch (error) {
    console.error('更新持仓失败:', error);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const { error } = await supabase
      .from('positions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除持仓失败:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
