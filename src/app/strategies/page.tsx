'use client';

import { useState, useEffect } from 'react';
import { Plus, Lightbulb, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface Strategy {
  id: string;
  name: string;
  description: string | null;
  signal_count: number;
  created_at: string;
}

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // 内置策略
  const builtInStrategies: Strategy[] = [
    {
      id: '1',
      name: '波段交易',
      description: '缩量回踩支撑买入，放量突破卖出。严格止损-7%，盈利15%以上大阴线减仓50%。',
      signal_count: 12,
      created_at: '2026-01-01',
    },
    {
      id: '2',
      name: '突破买入',
      description: '放量突破关键点时买入，要求股票处于上升结构中，位置不能太高。',
      signal_count: 8,
      created_at: '2026-01-15',
    },
    {
      id: '3',
      name: '趋势跟踪',
      description: '多指数叠加判断趋势方向，均线多头排列时持有，空头排列时离场。',
      signal_count: 5,
      created_at: '2026-02-01',
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">🧠 策略管理</h1>
            <p className="text-slate-500 mt-1">交易策略定义与信号记录</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus size={20} />
            新增策略
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {builtInStrategies.map((strategy) => (
            <div key={strategy.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Lightbulb size={24} className="text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800">{strategy.name}</h3>
                  <p className="text-slate-500 mt-2">{strategy.description}</p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                    <span className="text-sm text-slate-400">创建于 {strategy.created_at}</span>
                    <span className="text-sm text-slate-400">信号数 {strategy.signal_count}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 信号历史 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">📡 信号历史</h2>
          <div className="text-center text-slate-400 py-8">
            暂无信号记录
          </div>
        </div>

        {/* 策略说明 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">📖 策略说明</h2>
          <div className="space-y-4 text-slate-600">
            <div>
              <h3 className="font-medium text-slate-800">波段交易核心规则</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>买入：缩量回踩撑住 或 放量突破关键点</li>
                <li>卖出：-7%无条件止损 / 盈利&gt;15%大阴线减仓50%</li>
                <li>仓位：单只&lt;=30%，同时持仓&lt;=3只</li>
                <li>禁忌：不扛单、不追涨、不重仓</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-800">选股标准</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>市值：50-500亿</li>
                <li>形态：底部形态或上升结构中</li>
                <li>赛道：热门方向（光模块、储能、数据中心等）</li>
                <li>催化：有业绩或预期支撑</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {showAddModal && (
        <AddStrategyModal 
          onClose={() => setShowAddModal(false)} 
          onSuccess={() => {
            setShowAddModal(false);
          }} 
        />
      )}
    </div>
  );
}

function AddStrategyModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    // 实际项目中这里会调用 API 保存到数据库
    await new Promise(resolve => setTimeout(resolve, 500));
    onSuccess();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-slate-800 mb-4">新增策略</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">策略名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="如: 趋势跟踪策略"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">策略描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="描述策略的核心逻辑..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              rows={4}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? '添加中...' : '添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
