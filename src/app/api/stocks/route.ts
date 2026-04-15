import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ stocks: data });
  } catch (error) {
    console.error('获取股票池失败:', error);
    return NextResponse.json({ error: '获取数据失败' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, name, status, strategy, notes } = body;

    const { data, error } = await supabase
      .from('stocks')
      .insert({ code, name, status, strategy, notes })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ stock: data });
  } catch (error) {
    console.error('添加股票失败:', error);
    return NextResponse.json({ error: '添加失败' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const { error } = await supabase
      .from('stocks')
      .delete()
      .eq('id', id);

    if (error) throw error;
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

    const { data, error } = await supabase
      .from('stocks')
      .update({ status, strategy, notes })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ stock: data });
  } catch (error) {
    console.error('更新股票失败:', error);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}
