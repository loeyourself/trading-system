'use client';

import { TrendingUp, Users, Cpu, Zap, Radio, Shield } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// 策略精选 - 按强逻辑方向分类
const strategyCategories = [
  {
    icon: '📈',
    name: '锂矿（大周期）',
    logic: '26年紧平衡，27年供给短缺，碳酸锂涨价趋势',
    stocks: [
      { code: 'sh600460', name: '赣锋锂业', role: '行业龙头', status: '低位布局' },
      { code: 'sh002240', name: '盛新锂能', role: '核心品种', status: '已新高' },
    ],
  },
  {
    icon: '🏢',
    name: 'AIDC（数据中心）',
    logic: 'AIDC才是可持续商业模式，算力租赁被看淡',
    stocks: [
      { code: 'sh300442', name: '润泽科技', role: '纯正AIDC', status: '底部形态' },
      { code: 'sz003638', name: '光环新网', role: 'AIDC', status: '上升结构' },
      { code: 'sh600183', name: '生益科技', role: '铜箔+PCB', status: '强势' },
    ],
  },
  {
    icon: '🔧',
    name: '封测设备（后道）',
    logic: 'AI+先进封装推动设备需求，后道预期差最大',
    stocks: [
      { code: 'sh603195', name: '金海通', role: '分选机龙头', status: '历史新高' },
      { code: 'sh688004', name: '伟测科技', role: '测试', status: '底部形态' },
      { code: 'sz300567', name: '精测电子', role: '检测', status: '上升结构' },
    ],
  },
  {
    icon: '⚡',
    name: '电源/温控',
    logic: '谷歌电源三供（约10%份额），壁垒高，份额持续提升',
    stocks: [
      { code: 'sh002812', name: '恩捷股份', role: '隔膜', status: '超跌' },
      { code: 'sz300124', name: '汇川技术', role: '工控', status: '震荡' },
    ],
  },
  {
    icon: '💡',
    name: '光模块/光芯片',
    logic: '1.6T需求爆发弹性被低估，三处预期差',
    stocks: [
      { code: 'sh600522', name: '中天科技', role: '光纤', status: '低位' },
      { code: 'sz300308', name: '中际旭创', role: '光模块', status: '强势' },
    ],
  },
  {
    icon: '🚀',
    name: '商业航天',
    logic: '4/28长十乙首飞，海南商业航天发射场',
    stocks: [
      { code: 'sh688330', name: '宏力嘉', role: '航天', status: '低位' },
      { code: 'sz300455', name: '康拓红外', role: '航天', status: '平台突破' },
    ],
  },
];

export default function StocksPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">🎯 策略精选</h1>
          <p className="text-slate-500 mt-1">强逻辑方向 · 核心标的分类</p>
        </div>

        <div className="space-y-6">
          {strategyCategories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-slate-700 to-slate-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h2 className="text-lg font-bold text-white">{category.name}</h2>
                    <p className="text-slate-300 text-sm">{category.logic}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {category.stocks.map((stock, sIdx) => (
                    <div key={sIdx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-800">{stock.name}</span>
                        <span className="text-xs text-slate-500">{stock.code}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">{stock.role}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          stock.status === '历史新高' || stock.status === '已新高' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : stock.status === '强势' || stock.status === '低位布局'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {stock.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-amber-800 text-sm">
            <strong>⚠️ 注意：</strong>以上标的仅供参考，不构成投资建议。交易请严格遵守止损纪律（-7%无条件止损）。
          </p>
        </div>
      </main>
    </div>
  );
}
