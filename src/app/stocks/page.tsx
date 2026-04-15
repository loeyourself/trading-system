'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, RefreshCw, Search } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface Stock {
  id: string;
  code: string;
  name: string;
  status: string;
  strategy: string | null;
  notes: string | null;
  add_date: string;
}

interface StockQuote {
  code: string;
  name: string;
  price: number;
  pctChange: number;
  change: number;
}

export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [quotes, setQuotes] = useState<Record<string, StockQuote>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'hold' | 'watch' | 'sold'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stocks');
      const data = await res.json();
      setStocks(data.stocks || []);
    } catch (error) {
      console.error('获取股票失败:', error);
    }
    setLoading(false);
  };

  const fetchQuotes = async (codes: string[]) => {
    if (codes.length === 0) return;
    try {
      const res = await fetch(`/api/stock?codes=${codes.join(',')}`);
      const data = await res.json();
      const quoteMap: Record<string, StockQuote> = {};
      data.stocks?.forEach((s: StockQuote) => {
        quoteMap[s.code] = s;
      });
      setQuotes(quoteMap);
    } catch (error) {
      console.error('获取行情失败:', error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    if (stocks.length > 0) {
      const codes = stocks.map(s => s.code);
      fetchQuotes(codes);
      const interval = setInterval(() => fetchQuotes(codes), 30000);
      return () => clearInterval(interval);
    }
  }, [stocks]);

  const deleteStock = async (id: string) => {
    if (!confirm('确定要删除这只股票吗？')) return;
    try {
      await fetch('/api/stocks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchStocks();
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/stocks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchStocks();
    } catch (error) {
      console.error('更新失败:', error);
    }
  };

  const filteredStocks = filter === 'all'
    ? stocks
    : stocks.filter(s => s.status === filter);

  const statusColors: Record<string, string> = {
    hold: 'bg-emerald-100 text-emerald-700',
    watch: 'bg-amber-100 text-amber-700',
    sold: 'bg-slate-100 text-slate-600',
  };

  const statusLabels: Record<string, string> = {
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
            <h1 className="text-3xl font-bold text-slate-800">📈 股票池</h1>
            <p className="text-slate-500 mt-1">自选股管理</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={fetchStocks}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              刷新
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Plus size={20} />
              添加股票
            </button>
          </div>
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
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">现价</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">涨跌幅</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">策略</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">状态</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">备注</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-slate-600">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredStocks.map((stock) => {
                  const quote = quotes[stock.code];
                  return (
                    <tr key={stock.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{stock.name}</div>
                        <div className="text-sm text-slate-500">{stock.code}</div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {quote?.price || '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {quote ? (
                          <span className={quote.pctChange >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                            {quote.pctChange >= 0 ? '+' : ''}{quote.pctChange.toFixed(2)}%
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4">
                        {stock.strategy && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {stock.strategy}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={stock.status}
                          onChange={(e) => updateStatus(stock.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm border-0 cursor-pointer ${statusColors[stock.status]}`}
                        >
                          <option value="watch">观察</option>
                          <option value="hold">持有</option>
                          <option value="sold">已卖出</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{stock.notes || '-'}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteStock(stock.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-slate-400">
            暂无股票数据
          </div>
        )}
      </main>

      {/* 添加股票弹窗 */}
      {showAddModal && (
        <AddStockModal 
          onClose={() => setShowAddModal(false)} 
          onSuccess={() => {
            setShowAddModal(false);
            fetchStocks();
          }} 
        />
      )}
    </div>
  );
}

function AddStockModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [strategy, setStrategy] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name) return;

    setLoading(true);
    try {
      await fetch('/api/stocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, name, status: 'watch', strategy, notes }),
      });
      onSuccess();
    } catch (error) {
      console.error('添加失败:', error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-slate-800 mb-4">添加股票</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">股票代码</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="如: sh600110 或 sz000001"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">股票名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="如: 诺德股份"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">策略</label>
            <input
              type="text"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              placeholder="如: 波段交易"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">备注</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="可选备注..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
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
