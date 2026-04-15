'use client';

import { Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { useTrades } from '@/hooks/useRealtimeData';

function formatValue(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
  }).format(value);
}

export default function TradesPage() {
  const { trades, loading } = useTrades();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">交易日志</h1>
            <p className="text-slate-500 mt-1">买入/卖出记录</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus size={20} />
            添加记录
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-slate-400">
            加载中...
          </div>
        ) : trades.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">日期</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">股票</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">类型</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">价格</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">数量</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">金额</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">盈亏</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">交易理由</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {trades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-600">{trade.date}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{trade.stockName}</div>
                      <div className="text-sm text-slate-500">{trade.stockCode}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        trade.type === 'buy'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {trade.type === 'buy' ? '买入' : '卖出'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600">{trade.price}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{trade.quantity.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-slate-600">
                      {formatValue(trade.price * trade.quantity)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {trade.pnl !== undefined && trade.pnl !== null && (
                        <span className={`font-medium ${trade.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                          {trade.pnl >= 0 ? '+' : ''}{formatValue(trade.pnl)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{trade.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-slate-400">
            暂无交易记录
          </div>
        )}
      </main>
    </div>
  );
}
