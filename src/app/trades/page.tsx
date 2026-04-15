'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface Trade {
  id: string;
  stock_code: string;
  stock_name: string;
  type: string;
  price: number;
  quantity: number;
  date: string;
  reason: string | null;
  pnl: number | null;
}

function formatValue(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
  }).format(value);
}

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchTrades = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/trades');
      const data = await res.json();
      setTrades(data.trades || []);
    } catch (error) {
      console.error('获取交易记录失败:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const deleteTrade = async (id: string) => {
    if (!confirm('确定要删除这条交易记录吗？')) return;
    try {
      await fetch('/api/trades', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchTrades();
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">📝 交易日志</h1>
            <p className="text-slate-500 mt-1">买入/卖出记录</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={fetchTrades}
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
              添加记录
            </button>
          </div>
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
                  <th className="text-center px-6 py-4 text-sm font-medium text-slate-600">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {trades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-600">{trade.date}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{trade.stock_name}</div>
                      <div className="text-sm text-slate-500">{trade.stock_code}</div>
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
                      {trade.pnl !== null ? (
                        <span className={`font-medium ${trade.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                          {trade.pnl >= 0 ? '+' : ''}{formatValue(trade.pnl)}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{trade.reason || '-'}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteTrade(trade.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
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

      {showAddModal && (
        <AddTradeModal 
          onClose={() => setShowAddModal(false)} 
          onSuccess={() => {
            setShowAddModal(false);
            fetchTrades();
          }} 
        />
      )}
    </div>
  );
}

function AddTradeModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [stockCode, setStockCode] = useState('');
  const [stockName, setStockName] = useState('');
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockCode || !stockName || !price || !quantity || !date) return;

    setLoading(true);
    try {
      await fetch('/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stockCode,
          stockName,
          type,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          date,
          reason,
        }),
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
        <h2 className="text-xl font-bold text-slate-800 mb-4">添加交易记录</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">股票代码</label>
              <input
                type="text"
                value={stockCode}
                onChange={(e) => setStockCode(e.target.value)}
                placeholder="如: sh600110"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">股票名称</label>
              <input
                type="text"
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                placeholder="如: 诺德股份"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">交易类型</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'buy' | 'sell')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="buy">买入</option>
                <option value="sell">卖出</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">日期</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">价格</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="成交价格"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">数量</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="股数"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">交易理由</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="为什么买入/卖出？"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              rows={2}
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
