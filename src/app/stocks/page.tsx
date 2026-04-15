'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { useStocks } from '@/hooks/useRealtimeData';
import { Stock } from '@/lib/types';

export default function StocksPage() {
  const { stocks, loading } = useStocks();
  const [filter, setFilter] = useState<'all' | 'hold' | 'watch' | 'sold'>('all');

  const filteredStocks = filter === 'all'
    ? stocks
    : stocks.filter(s => s.status === filter);

  const statusColors = {
    hold: 'bg-emerald-100 text-emerald-700',
    watch: 'bg-amber-100 text-amber-700',
    sold: 'bg-slate-100 text-slate-600',
  };

  const statusLabels = {
    hold: '持有',
    watch: '观察',
    sold: '已卖出',
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">股票池</h1>
            <p className="text-slate-500 mt-1">自选股管理</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus size={20} />
            添加股票
          </button>
        </div>

        {/* 筛选器 */}
        <div className="flex gap-2 mb-6">
          {(['all', 'hold', 'watch', 'sold'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status === 'all' ? '全部' : statusLabels[status]}
            </button>
          ))}
        </div>

        {/* 股票列表 */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-slate-400">
            加载中...
          </div>
        ) : filteredStocks.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">股票</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">加入日期</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">策略</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">状态</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">备注</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredStocks.map((stock) => (
                  <tr key={stock.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{stock.name}</div>
                      <div className="text-sm text-slate-500">{stock.code}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{stock.addDate}</td>
                    <td className="px-6 py-4">
                      {stock.strategy && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {stock.strategy}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${statusColors[stock.status]}`}>
                        {statusLabels[stock.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{stock.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-slate-400">
            暂无股票数据
          </div>
        )}
      </main>
    </div>
  );
}
