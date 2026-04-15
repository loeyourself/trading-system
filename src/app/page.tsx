'use client';

import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, DollarSign, Target } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// 股票筛选条件
const STOCK_CRITERIA = {
  marketCap: { min: 50, max: 500, label: '市值 50-500亿' },
  pattern: ['底部形态', '上升结构中', '平台突破'],
  sectors: ['光模块', '储能', '数据中心', 'PCB', '算力租赁', '铜箔'],
};

// 买入信号
const BUY_SIGNALS = [
  { type: '缩量回踩撑住', desc: '价格回调时成交量萎缩，获得支撑', priority: 1 },
  { type: '放量突破', desc: '放量突破关键点位/平台', priority: 2 },
  { type: '趋势确认', desc: '均线多头排列，趋势向上', priority: 3 },
];

// 卖出信号
const SELL_SIGNALS = [
  { type: '-7%止损', desc: '亏损达到7%无条件止损', priority: 1, urgent: true },
  { type: '盈利>15%大阴线减仓', desc: '盈利超过15%出现大阴线减仓50%', priority: 2, urgent: true },
  { type: '盈利>25%高位清仓', desc: '盈利超过25%高位考虑清仓', priority: 3 },
  { type: '放量滞涨', desc: '放量但不涨，警惕顶部', priority: 4 },
];

// 仓位管理规则
const POSITION_RULES = {
  singleMax: '30%',
  totalStocks: '≤3只',
  stopLoss: '-7%',
  profitTaking: [
    { condition: '>15%', action: '大阴线减仓50%' },
    { condition: '>25%', action: '高位清仓' },
  ],
};

export default function TradingSystem() {
  const [stockCode, setStockCode] = useState('');
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  // 模拟选股分析
  const analyzeStock = () => {
    if (!stockCode) return;

    // 模拟分析结果
    const result = {
      code: stockCode,
      name: stockCode.toUpperCase().includes('600') ? '示例股票' : '示例股票',
      marketCap: Math.floor(Math.random() * 400) + 50,
      pattern: STOCK_CRITERIA.pattern[Math.floor(Math.random() * 3)],
      sector: STOCK_CRITERIA.sectors[Math.floor(Math.random() * 6)],
      buySignals: BUY_SIGNALS.filter(() => Math.random() > 0.5),
      sellSignals: SELL_SIGNALS.filter(() => Math.random() > 0.6),
      positionAdvice: Math.random() > 0.5 ? '可关注' : '观望',
      riskLevel: Math.random() > 0.5 ? '低风险' : Math.random() > 0.5 ? '中风险' : '高风险',
    };

    setSelectedStock(result);
    setAnalysis(result);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">🎯 波段交易系统 v2.0</h1>
          <p className="text-slate-500 mt-1">纯K线 + 成交量 · 量化买卖点</p>
        </div>

        {/* 核心规则卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 选股标准 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Target className="text-emerald-600" size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">选股标准</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                市值 50-500亿
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                底部形态或上升结构
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                热门赛道（光模块/储能/数据中心）
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                有增量逻辑/催化事件
              </li>
            </ul>
          </div>

          {/* 买入信号 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">买入信号</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {BUY_SIGNALS.map((signal, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded font-bold">{signal.priority}</span>
                  <div>
                    <span className="font-medium">{signal.type}</span>
                    <p className="text-slate-400 text-xs">{signal.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 卖出信号 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="text-red-600" size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">卖出信号</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {SELL_SIGNALS.map((signal, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle size={16} className={signal.urgent ? 'text-red-500' : 'text-amber-500'} />
                  <div>
                    <span className="font-medium">{signal.type}</span>
                    <p className="text-slate-400 text-xs">{signal.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 仓位管理 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">💼 仓位管理</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <DollarSign className="mx-auto text-slate-400 mb-2" size={32} />
              <div className="text-2xl font-bold text-slate-800">单只≤30%</div>
              <div className="text-sm text-slate-500">单只仓位上限</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <Target className="mx-auto text-slate-400 mb-2" size={32} />
              <div className="text-2xl font-bold text-slate-800">≤3只</div>
              <div className="text-sm text-slate-500">同时持仓上限</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="mx-auto text-red-500 mb-2" size={32} />
              <div className="text-2xl font-bold text-red-600">-7%止损</div>
              <div className="text-sm text-slate-500">无条件止损</div>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <TrendingUp className="mx-auto text-emerald-500 mb-2" size={32} />
              <div className="text-2xl font-bold text-emerald-600">&gt;15%减仓</div>
              <div className="text-sm text-slate-500">大阴线减仓50%</div>
            </div>
          </div>
        </div>

        {/* 股票分析工具 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">🔍 股票分析</h2>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={stockCode}
              onChange={(e) => setStockCode(e.target.value)}
              placeholder="输入股票代码，如 sh600110"
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              onKeyPress={(e) => e.key === 'Enter' && analyzeStock()}
            />
            <button
              onClick={analyzeStock}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
            >
              <Search size={20} />
              分析
            </button>
          </div>

          {/* 分析结果 */}
          {analysis && (
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 股票信息 */}
                <div>
                  <h3 className="font-bold text-lg mb-4">{analysis.name} ({analysis.code})</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">市值</span>
                      <span className="font-medium">{analysis.marketCap}亿</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">形态</span>
                      <span className="font-medium">{analysis.pattern}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">赛道</span>
                      <span className="font-medium">{analysis.sector}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">风险等级</span>
                      <span className={`font-medium ${analysis.riskLevel === '低风险' ? 'text-emerald-500' : analysis.riskLevel === '中风险' ? 'text-amber-500' : 'text-red-500'}`}>
                        {analysis.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 信号判断 */}
                <div>
                  <h4 className="font-medium mb-2">买入信号</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {analysis.buySignals.length > 0 ? (
                      analysis.buySignals.map((s: any, i: number) => (
                        <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                          {s.type}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400">暂无明显买入信号</span>
                    )}
                  </div>
                  <h4 className="font-medium mb-2">卖出信号</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.sellSignals.length > 0 ? (
                      analysis.sellSignals.map((s: any, i: number) => (
                        <span key={i} className={`px-3 py-1 rounded-full text-sm ${s.urgent ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {s.type}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400">暂无明显卖出信号</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
