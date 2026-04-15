'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// Mock 自选股池
const mockStocks = [
  { id: '1', code: 'sh600110', name: '诺德股份', sector: '铜箔', pattern: '上升结构', risk: '低', notes: '放量突破' },
  { id: '2', code: 'sh600183', name: '生益科技', sector: 'PCB', pattern: '底部形态', risk: '中', notes: '缩量回踩' },
  { id: '3', code: 'sz300857', name: '协创数据', sector: '算力', pattern: '平台突破', risk: '低', notes: '算力概念' },
  { id: '4', code: 'sh688388', name: '嘉元科技', sector: '铜箔', pattern: '上升结构', risk: '中', notes: '锂电铜箔' },
  { id: '5', code: 'sz002335', name: '科华数据', sector: '数据中心', pattern: '底部形态', risk: '低', notes: '电源龙头' },
];

export default function StocksPage() {
  const [stocks, setStocks] = useState(mockStocks);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">📈 股票池</h1>
          <p className="text-slate-500 mt-1">自选股管理 · 跟踪标的</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">股票</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">赛道</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">形态</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">风险</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">备注</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {stocks.map((stock) => (
                <tr key={stock.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{stock.name}</div>
                    <div className="text-sm text-slate-500">{stock.code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {stock.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{stock.pattern}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${stock.risk === '低' ? 'text-emerald-500' : stock.risk === '中' ? 'text-amber-500' : 'text-red-500'}`}>
                      {stock.risk}风险
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{stock.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center text-slate-400 text-sm">
          当前 {stocks.length} 只自选股 · 最多持有3只
        </div>
      </main>
    </div>
  );
}
