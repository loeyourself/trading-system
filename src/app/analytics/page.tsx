'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Sidebar from '@/components/Sidebar';
import { mockEquityCurve, mockStats } from '@/lib/data';

const monthlyData = [
  { month: '1月', pnl: 15000 },
  { month: '2月', pnl: 22000 },
  { month: '3月', pnl: 8000 },
  { month: '4月', pnl: 5000 },
];

const statusData = [
  { name: '盈利', value: 68.5, color: '#10b981' },
  { name: '亏损', value: 31.5, color: '#ef4444' },
];

export default function AnalyticsPage() {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">数据分析</h1>
          <p className="text-slate-500 mt-1">交易数据可视化分析</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 月度收益 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">月度收益</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}千`} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v) => [formatValue(v as number), '盈亏']} />
                  <Bar dataKey="pnl" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 胜率分布 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">胜率分布</h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 收益统计 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">收益统计</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                <span className="text-slate-600">总收益</span>
                <span className="text-xl font-bold text-emerald-500">+{formatValue(mockStats.totalPnl)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                <span className="text-slate-600">收益率</span>
                <span className="text-xl font-bold text-emerald-500">+{mockStats.totalPnlPercent}%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                <span className="text-slate-600">交易次数</span>
                <span className="text-xl font-bold text-slate-800">{mockStats.totalTrades}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                <span className="text-slate-600">胜率</span>
                <span className="text-xl font-bold text-slate-800">{mockStats.winRate}%</span>
              </div>
            </div>
          </div>

          {/* 资金曲线 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">资金曲线</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockEquityCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(v) => v.slice(5)}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    tickFormatter={(v) => `${(v/10000).toFixed(0)}万`}
                  />
                  <Tooltip formatter={(v) => [formatValue(v as number), '资金']} />
                  <Bar dataKey="value" fill="#10b981" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
