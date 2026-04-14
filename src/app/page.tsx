'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity, Wallet } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { mockEquityCurve, mockStats, mockStocks, mockTrades } from '@/lib/data';

export default function Dashboard() {
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
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">交易系统概览</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="总收益"
            value={formatValue(mockStats.totalPnl)}
            change={`+${mockStats.totalPnlPercent}%`}
            positive={true}
            icon={Wallet}
          />
          <StatCard
            title="胜率"
            value={`${mockStats.winRate}%`}
            change="近30日"
            positive={true}
            icon={Target}
          />
          <StatCard
            title="交易次数"
            value={mockStats.totalTrades.toString()}
            change="总记录"
            positive={null}
            icon={Activity}
          />
          <StatCard
            title="持仓股票"
            value={mockStats.holdStocks.toString()}
            change="当前持有"
            positive={null}
            icon={TrendingUp}
          />
        </div>

        {/* 资金曲线图 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">资金曲线</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockEquityCurve}>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 持仓股票 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">持仓股票</h2>
            <div className="space-y-3">
              {mockStocks.filter(s => s.status === 'hold').map((stock) => (
                <div key={stock.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-800">{stock.name}</div>
                    <div className="text-sm text-slate-500">{stock.code}</div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    {stock.strategy}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 最近交易 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">最近交易</h2>
            <div className="space-y-3">
              {mockTrades.slice(0, 3).map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-800">{trade.stockName}</div>
                    <div className="text-sm text-slate-500">{trade.date}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${trade.type === 'buy' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {trade.type === 'buy' ? '买入' : '卖出'}
                    </div>
                    {trade.pnl !== undefined && trade.pnl > 0 && (
                      <div className="text-sm text-emerald-500">+{trade.pnl}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
