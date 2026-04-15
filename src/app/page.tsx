'use client';

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity, Wallet, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface Stock {
  id: string;
  code: string;
  name: string;
  price: number;
  pctChange: number;
  change: number;
}

interface Trade {
  id: string;
  stockCode: string;
  stockName: string;
  type: string;
  price: number;
  quantity: number;
  date: string;
  pnl: number | null;
}

function formatValue(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
  }).format(value);
}

export default function Dashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchData = async () => {
    setLoading(true);
    try {
      // 获取持仓股票代码
      const stocksRes = await fetch('/api/stocks');
      const stocksData = await stocksRes.json();
      const watchStocks = stocksData.stocks?.filter((s: any) => s.status === 'hold' || s.status === 'watch') || [];

      // 获取交易记录
      const tradesRes = await fetch('/api/trades');
      const tradesData = await tradesRes.json();
      setTrades(tradesData.trades || []);

      // 获取实时行情
      if (watchStocks.length > 0) {
        const codes = watchStocks.map((s: any) => s.code).join(',');
        const stockRes = await fetch(`/api/stock?codes=${codes}`);
        const stockData = await stockRes.json();
        setStocks(stockData.stocks || []);
      }

      setLastUpdate(new Date().toLocaleTimeString('zh-CN'));
    } catch (error) {
      console.error('获取数据失败:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // 每30秒刷新
    return () => clearInterval(interval);
  }, []);

  // 计算统计数据
  const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const winTrades = trades.filter(t => t.pnl && t.pnl > 0).length;
  const winRate = trades.length > 0 ? (winTrades / trades.length * 100) : 0;
  const holdStocks = stocks.filter(s => stocks.some((st: any) => st.code === s.code));

  // 生成资金曲线（模拟）
  const equityCurve = [
    { date: '2026-04-01', value: 1000000, pnl: 0 },
    { date: '2026-04-08', value: 1020000, pnl: 20000 },
    { date: '2026-04-15', value: 1050000, pnl: 50000 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">📊 仪表盘</h1>
            <p className="text-slate-500 mt-1">交易系统概览</p>
          </div>
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            刷新数据
          </button>
        </div>

        {lastUpdate && (
          <p className="text-sm text-slate-400 mb-4">最后更新: {lastUpdate}</p>
        )}

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="总收益"
            value={formatValue(totalPnl)}
            change={`${totalPnl >= 0 ? '+' : ''}${totalPnl >= 0 ? '盈利' : '亏损'}`}
            positive={totalPnl >= 0}
            icon={Wallet}
          />
          <StatCard
            title="胜率"
            value={`${winRate.toFixed(1)}%`}
            change={`${winRate >= 50 ? '盈利为主' : '亏损为主'}`}
            positive={winRate >= 50}
            icon={Target}
          />
          <StatCard
            title="交易次数"
            value={trades.length.toString()}
            change="总记录"
            positive={null}
            icon={Activity}
          />
          <StatCard
            title="持仓股票"
            value={holdStocks.length.toString()}
            change="当前持有"
            positive={null}
            icon={TrendingUp}
          />
        </div>

        {/* 资金曲线图 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">资金曲线</h2>
          {equityCurve.length > 1 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityCurve}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.slice(5)}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${(value/10000).toFixed(0)}万`}
                  />
                  <Tooltip
                    formatter={(value) => [formatValue(Number(value)), '资金']}
                    labelFormatter={(label) => `日期: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-slate-400">
              暂无数据，请添加交易记录
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 持仓股票 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">持仓股票</h2>
            {holdStocks.length > 0 ? (
              <div className="space-y-3">
                {holdStocks.map((stock) => (
                  <div key={stock.code} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-800">{stock.name}</div>
                      <div className="text-sm text-slate-500">{stock.code}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-800">{stock.price}</div>
                      <div className={`text-sm ${stock.pctChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stock.pctChange >= 0 ? '+' : ''}{stock.pctChange.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">暂无持仓股票</p>
            )}
          </div>

          {/* 最近交易 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">最近交易</h2>
            {trades.length > 0 ? (
              <div className="space-y-3">
                {trades.slice(0, 5).map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-800">{trade.stockName}</div>
                      <div className="text-sm text-slate-500">{trade.date}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${trade.type === 'buy' ? 'text-red-500' : 'text-emerald-500'}`}>
                        {trade.type === 'buy' ? '买入' : '卖出'}
                      </div>
                      <div className="text-sm text-slate-500">{trade.price} × {trade.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">暂无交易记录</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, change, positive, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  positive: boolean | null;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-500 text-sm">{title}</span>
        <Icon size={20} className="text-slate-400" />
      </div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      <div className={`text-sm mt-1 ${positive === true ? 'text-emerald-500' : positive === false ? 'text-red-500' : 'text-slate-400'}`}>
        {positive !== null && (
          positive ? <TrendingUp size={14} className="inline mr-1" /> : <TrendingDown size={14} className="inline mr-1" />
        )}
        {change}
      </div>
    </div>
  );
}
