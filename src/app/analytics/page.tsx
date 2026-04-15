'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface Trade {
  id: string;
  stock_code: string;
  stock_name: string;
  type: string;
  price: number;
  quantity: number;
  date: string;
  pnl: number | null;
}

export default function AnalyticsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/trades');
      const data = await res.json();
      setTrades(data.trades || []);
    } catch (error) {
      console.error('获取数据失败:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 计算统计数据
  const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const winTrades = trades.filter(t => t.pnl && t.pnl > 0);
  const loseTrades = trades.filter(t => t.pnl && t.pnl < 0);
  const winRate = trades.filter(t => t.pnl !== null).length > 0 
    ? (winTrades.length / trades.filter(t => t.pnl !== null).length * 100) 
    : 0;

  // 按股票统计
  const stockStats = trades.reduce((acc: Record<string, any>, t) => {
    if (!acc[t.stock_code]) {
      acc[t.stock_code] = { name: t.stock_name, code: t.stock_code, pnl: 0, count: 0 };
    }
    acc[t.stock_code].pnl += t.pnl || 0;
    acc[t.stock_code].count += 1;
    return acc;
  }, {});

  const stockData = Object.values(stockStats)
    .sort((a: any, b: any) => b.pnl - a.pnl)
    .slice(0, 10);

  // 盈亏分布
  const pieData = [
    { name: '盈利', value: winTrades.length, color: '#10b981' },
    { name: '亏损', value: loseTrades.length, color: '#ef4444' },
    { name: '待定', value: trades.length - winTrades.length - loseTrades.length, color: '#94a3b8' },
  ];

  // 月度统计（模拟）
  const monthlyData = [
    { month: '1月', pnl: 15000 },
    { month: '2月', pnl: -8000 },
    { month: '3月', pnl: 22000 },
    { month: '4月', pnl: totalPnl },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">📊 数据分析</h1>
            <p className="text-slate-500 mt-1">交易数据统计与可视化</p>
          </div>
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            刷新数据
          </button>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-sm">总盈亏</span>
              {totalPnl >= 0 ? <TrendingUp size={20} className="text-emerald-500" /> : <TrendingDown size={20} className="text-red-500" />}
            </div>
            <div className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {totalPnl >= 0 ? '+' : ''}{totalPnl.toLocaleString()} 元
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-sm">胜率</span>
              <Target size={20} className="text-slate-400" />
            </div>
            <div className={`text-2xl font-bold ${winRate >= 50 ? 'text-emerald-500' : 'text-red-500'}`}>
              {winRate.toFixed(1)}%
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-sm">盈利交易</span>
              <Activity size={20} className="text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-500">{winTrades.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-sm">亏损交易</span>
              <Activity size={20} className="text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-500">{loseTrades.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 月度盈亏 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">月度盈亏</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}千`} />
                  <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} 元`, '盈亏']} />
                  <Bar dataKey="pnl" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 盈亏分布 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">交易结果分布</h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 股票盈亏排行 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">股票盈亏排行</h2>
          {stockData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">股票</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">交易次数</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">累计盈亏</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {stockData.map((stock: any) => (
                    <tr key={stock.code}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800">{stock.name}</div>
                        <div className="text-sm text-slate-500">{stock.code}</div>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">{stock.count}</td>
                      <td className={`px-4 py-3 text-right font-medium ${stock.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {stock.pnl >= 0 ? '+' : ''}{stock.pnl.toLocaleString()} 元
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-slate-400 py-8">暂无数据</p>
          )}
        </div>
      </main>
    </div>
  );
}
