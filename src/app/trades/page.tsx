'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const mockTrades = [
  { id: '1', date: '2026-04-01', stock: '诺德股份', code: 'sh600110', type: '买入', price: 9.80, quantity: 10000, pnl: null, reason: '放量突破' },
  { id: '2', date: '2026-04-08', stock: '诺德股份', code: 'sh600110', type: '卖出', price: 10.50, quantity: 5000, pnl: 3500, reason: '盈利减仓' },
  { id: '3', date: '2026-04-10', stock: '生益科技', code: 'sh600183', type: '买入', price: 65.00, quantity: 5000, pnl: null, reason: '缩量回踩撑住' },
];

export default function TradesPage() {
  const [trades] = useState(mockTrades);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">📝 交易日志</h1>
          <p className="text-slate-500 mt-1">买卖记录 · 复盘依据</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">日期</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">股票</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">类型</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">价格</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">数量</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">盈亏</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">理由</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-600">{trade.date}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{trade.stock}</div>
                    <div className="text-sm text-slate-500">{trade.code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${trade.type === '买入' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600">{trade.price}</td>
                  <td className="px-6 py-4 text-right text-slate-600">{trade.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    {trade.pnl !== null ? (
                      <span className={`font-medium ${trade.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toLocaleString()}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{trade.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-amber-50 rounded-xl p-4 text-sm text-amber-700">
          <strong>复盘要点：</strong> 诺德股份买入依据放量突破，卖出依据盈利超过15%大阴线，按规则减仓50%。
        </div>
      </main>
    </div>
  );
}
