'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trade, Stock, Strategy } from '@/lib/types';

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初始加载
    const fetchStocks = async () => {
      const { data, error } = await supabase
        .from('stocks')
        .select('*')
        .order('add_date', { ascending: false });
      
      if (!error && data) {
        setStocks(data.map(s => ({
          id: s.id,
          code: s.code,
          name: s.name,
          addDate: s.add_date,
          strategy: s.strategy || '',
          status: s.status || 'watch',
          notes: s.notes || '',
        })));
      }
      setLoading(false);
    };

    fetchStocks();

    // 实时订阅
    const channel = supabase
      .channel('stocks-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'stocks' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newStock = payload.new as any;
            setStocks(prev => [{
              id: newStock.id,
              code: newStock.code,
              name: newStock.name,
              addDate: newStock.add_date,
              strategy: newStock.strategy || '',
              status: newStock.status || 'watch',
              notes: newStock.notes || '',
            }, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as any;
            setStocks(prev => prev.map(s => 
              s.id === updated.id ? {
                ...s,
                code: updated.code,
                name: updated.name,
                addDate: updated.add_date,
                strategy: updated.strategy || '',
                status: updated.status || 'watch',
                notes: updated.notes || '',
              } : s
            ));
          } else if (payload.eventType === 'DELETE') {
            const deleted = payload.old as any;
            setStocks(prev => prev.filter(s => s.id !== deleted.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { stocks, loading };
}

export function useTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('date', { ascending: false });
      
      if (!error && data) {
        setTrades(data.map(t => ({
          id: t.id,
          date: t.date,
          stockCode: t.stock_code,
          stockName: t.stock_name,
          type: t.type,
          price: parseFloat(t.price),
          quantity: t.quantity,
          reason: t.reason || '',
          pnl: t.pnl ? parseFloat(t.pnl) : undefined,
          notes: t.notes || '',
        })));
      }
      setLoading(false);
    };

    fetchTrades();

    const channel = supabase
      .channel('trades-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'trades' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newTrade = payload.new as any;
            setTrades(prev => [{
              id: newTrade.id,
              date: newTrade.date,
              stockCode: newTrade.stock_code,
              stockName: newTrade.stock_name,
              type: newTrade.type,
              price: parseFloat(newTrade.price),
              quantity: newTrade.quantity,
              reason: newTrade.reason || '',
              pnl: newTrade.pnl ? parseFloat(newTrade.pnl) : undefined,
              notes: newTrade.notes || '',
            }, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { trades, loading };
}

export function useStrategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStrategies = async () => {
      const { data, error } = await supabase
        .from('strategies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setStrategies(data.map(s => ({
          id: s.id,
          name: s.name,
          description: s.description || '',
          signalHistory: [],
          createdAt: s.created_at,
        })));
      }
      setLoading(false);
    };

    fetchStrategies();
  }, []);

  return { strategies, loading };
}
