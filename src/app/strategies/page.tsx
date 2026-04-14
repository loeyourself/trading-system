'use client';

import { Plus, Lightbulb } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { mockStrategies } from '@/lib/data';

export default function StrategiesPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">策略管理</h1>
            <p className="text-slate-500 mt-1">交易策略定义与信号记录</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus size={20} />
            新增策略
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockStrategies.map((strategy) => (
            <div key={strategy.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Lightbulb size={24} className="text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800">{strategy.name}</h3>
                  <p className="text-slate-500 mt-2">{strategy.description}</p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                    <span className="text-sm text-slate-400">创建于 {strategy.createdAt}</span>
                    <span className="text-sm text-slate-400">信号数 {strategy.signalHistory.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 信号历史 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">信号历史</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-slate-500 text-center py-8">暂无信号记录</p>
          </div>
        </div>
      </main>
    </div>
  );
}
