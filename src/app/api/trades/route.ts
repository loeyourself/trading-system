import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ trades: data });
  } catch (error) {
    console.error('获取交易记录失败:', error);
    return NextResponse.json({ error: '获取数据失败' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stockCode, stockName, type, price, quantity, date, reason } = body;

    // 计算盈亏（如果是卖出）
    let pnl = null;
    if (type === 'sell') {
      // 获取该股票的买入平均价
      const { data: buyTrades } = await supabase
        .from('trades')
        .select('price, quantity')
        .eq('stock_code', stockCode)
        .eq('type', 'buy');

      if (buyTrades && buyTrades.length > 0) {
        const totalCost = buyTrades.reduce((sum, t) => sum + t.price * t.quantity, 0);
        const totalQty = buyTrades.reduce((sum, t) => sum + t.quantity, 0);
        const avgPrice = totalCost / totalQty;
        pnl = (price - avgPrice) * quantity;
      }
    }

    const { data, error } = await supabase
      .from('trades')
      .insert({ stock_code: stockCode, stock_name: stockName, type, price, quantity, date, reason, pnl })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ trade: data });
  } catch (error) {
    console.error('添加交易记录失败:', error);
    return NextResponse.json({ error: '添加失败' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const { error } = await supabase
      .from('trades')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除交易记录失败:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
