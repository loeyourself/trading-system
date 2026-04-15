import { useState, useEffect } from 'react';

export interface Stock {
  id?: string;
  code: string;
  name: string;
  status?: string;
  strategy?: string;
  notes?: string;
  addDate?: string;
  price?: number;
  pctChange?: number;
  change?: number;
}

export interface Trade {
  id?: string;
  stockCode?: string;
  stockName?: string;
  stock_code?: string;
  stock_name?: string;
  type: string;
  price: number;
  quantity: number;
  date: string;
  reason?: string;
  pnl?: number | null;
}

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stocks')
      .then(res => res.json())
      .then(data => {
        setStocks(data.stocks || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { stocks, loading };
}

export function useTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trades')
      .then(res => res.json())
      .then(data => {
        setTrades(data.trades || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { trades, loading };
}
