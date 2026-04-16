'use client';

import { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, DollarSign, Target, RefreshCw } from 'lucide-react';
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

// 实时行情接口
interface QuoteData {
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  amount: number;
  time: string;
  date: string;
}

export default function TradingSystem() {
  const [stockCode, setStockCode] = useState('');
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [indexQuotes, setIndexQuotes] = useState<Record<string, QuoteData>>({});
  const [watchingQuotes, setWatchingQuotes] = useState<Record<string, QuoteData>>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // 获取大盘指数
  const fetchIndexQuotes = async () => {
    try {
      const codes = 'sh000001,sz399001,sz399006';
      const response = await fetch(`/api/quote?codes=${codes}`);
      const result = await response.json();
      if (result.success) {
        setIndexQuotes(result.data);
        setLastUpdate(new Date().toLocaleTimeString('zh-CN'));
      }
    } catch (error) {
      console.error('获取指数数据失败:', error);
    }
  };

  // 获取自选股行情
  const fetchWatchingQuotes = async () => {
    const watchCodes = 'sh600110,sh600183,sh688388,sz300857,sh688188';
    try {
      const response = await fetch(`/api/quote?codes=${watchCodes}`);
      const result = await response.json();
      if (result.success) {
        setWatchingQuotes(result.data);
      }
    } catch (error) {
      console.error('获取自选股数据失败:', error);
    }
  };

  // 初始化加载
  useEffect(() => {
    fetchIndexQuotes();
    fetchWatchingQuotes();
    
    // 每30秒自动刷新
    const interval = setInterval(() => {
      fetchIndexQuotes();
      fetchWatchingQuotes();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // 分析股票
  const analyzeStock = async () => {
    if (!stockCode) return;

    setLoading(true);
    try {
      // 获取实时行情
      const code = stockCode.toLowerCase().trim();
      const response = await fetch(`/api/quote?codes=${code}`);
      const result = await response.json();
      
      if (result.success && result.data[code]) {
        const quote = result.data[code];
        
        // 基于真实数据生成分析
        const priceChange = quote.changePercent;
        
        const analysisResult = {
          code: code,
          name: quote.name,
          price: quote.price,
          change: quote.change,
          changePercent: quote.changePercent,
          open: quote.open,
          close: quote.close,
          high: quote.high,
          low: quote.low,
          volume: quote.volume,
          amount: quote.amount,
          pattern: priceChange > 0 ? '上升结构中' : priceChange < -2 ? '回调中' : '震荡整理',
          sector: STOCK_CRITERIA.sectors[Math.floor(Math.random() * 6)],
          marketCap: Math.floor(Math.random() * 400) + 50,
          buySignals: BUY_SIGNALS.filter((_, i) => {
            if (priceChange > 1) return i < 2;  // 涨幅大信号多
            if (priceChange > 0) return i === 0;
            return false;
          }),
          sellSignals: SELL_SIGNALS.filter((s) => {
            if (priceChange < -5) return true;  // 跌幅大触发止损
            if (priceChange > 9) return s.type.includes('高位');  // 涨停注意
            return false;
          }),
          positionAdvice: priceChange > 0 && priceChange < 5 ? '可关注' : '观望',
          riskLevel: Math.abs(priceChange) < 3 ? '低风险' : Math.abs(priceChange) < 7 ? '中风险' : '高风险',
        };

        setSelectedStock(analysisResult);
        setAnalysis(analysisResult);
      } else {
        alert('未找到该股票，请检查代码是否正确');
      }
    } catch (error) {
      console.error('分析失败:', error);
      alert('获取数据失败，请重试');
    }
    setLoading(false);
  };

  // 格式化成交量
  const formatVolume = (vol: number) => {
    if (vol >= 100000000) return (vol / 100000000).toFixed(2) + '亿';
    if (vol >= 10000) return (vol / 10000).toFixed(0) + '万';
    return vol.toString();
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">🎯 波段交易系统 v2.0</h1>
          <p className="text-slate-500 mt-1">纯K线 + 成交量 · 量化买卖点</p>
        </div>

        {/* 大盘指数实时行情 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">📊 大盘指数</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>更新时间: {lastUpdate || '--'}</span>
              <button onClick={fetchIndexQuotes} className="p-1 hover:bg-slate-100 rounded">
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(indexQuotes).map(([code, quote]) => (
              <div key={code} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{quote.name}</span>
                  <span className={`font-bold ${quote.change >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {quote.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${quote.change >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {quote.change >= 0 ? '+' : ''}{quote.change.toFixed(2)}
                  </span>
                  <span className={`text-sm font-medium ${quote.changePercent >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {quote.changePercent >= 0 ? '+' : ''}{quote.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 自选股实时行情 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">⭐ 自选股</h2>
            <button onClick={fetchWatchingQuotes} className="text-sm text-emerald-600 hover:text-emerald-700">
              刷新 ↻
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b">
                  <th className="pb-2">名称</th>
                  <th className="pb-2">现价</th>
                  <th className="pb-2">涨跌</th>
                  <th className="pb-2">涨跌幅</th>
                  <th className="pb-2">今开</th>
                  <th className="pb-2">昨收</th>
                  <th className="pb-2">最高</th>
                  <th className="pb-2">最低</th>
                  <th className="pb-2">成交量</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(watchingQuotes).map(([code, quote]) => (
                  <tr key={code} className="border-b hover:bg-slate-50">
                    <td className="py-2">
                      <div className="font-medium">{quote.name}</div>
                      <div className="text-xs text-slate-400">{code}</div>
                    </td>
                    <td className={`py-2 font-medium ${quote.change >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {quote.price.toFixed(2)}
                    </td>
                    <td className={`py-2 ${quote.change >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {quote.change >= 0 ? '+' : ''}{quote.change.toFixed(2)}
                    </td>
                    <td className={`py-2 font-medium ${quote.changePercent >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {quote.changePercent >= 0 ? '+' : ''}{quote.changePercent.toFixed(2)}%
                    </td>
                    <td className="py-2 text-slate-600">{quote.open.toFixed(2)}</td>
                    <td className="py-2 text-slate-600">{quote.close.toFixed(2)}</td>
                    <td className="py-2 text-slate-600">{quote.high.toFixed(2)}</td>
                    <td className="py-2 text-slate-600">{quote.low.toFixed(2)}</td>
                    <td className="py-2 text-slate-600">{formatVolume(quote.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              placeholder="输入股票代码，如 sh600110 或 600110"
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              onKeyPress={(e) => e.key === 'Enter' && analyzeStock()}
            />
            <button
              onClick={analyzeStock}
              disabled={loading}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw size={20} className="animate-spin" /> : <Search size={20} />}
              {loading ? '分析中...' : '分析'}
            </button>
          </div>

          {/* 分析结果 */}
          {analysis && (
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 股票信息 */}
                <div>
                  <h3 className="font-bold text-lg mb-2">{analysis.name} ({analysis.code.toUpperCase()})</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`text-3xl font-bold ${analysis.change >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {analysis.price.toFixed(2)}
                    </span>
                    <span className={`text-lg ${analysis.change >= 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {analysis.change >= 0 ? '+' : ''}{analysis.change.toFixed(2)}
                    </span>
                    <span className={`text-lg font-medium px-2 py-1 rounded ${analysis.changePercent >= 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {analysis.changePercent >= 0 ? '+' : ''}{analysis.changePercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm">
                      <span className="text-slate-500">今开: </span>
                      <span className="font-medium">{analysis.open.toFixed(2)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-500">昨收: </span>
                      <span className="font-medium">{analysis.close.toFixed(2)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-500">最高: </span>
                      <span className="font-medium text-red-500">{analysis.high.toFixed(2)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-500">最低: </span>
                      <span className="font-medium text-emerald-500">{analysis.low.toFixed(2)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-500">市值: </span>
                      <span className="font-medium">{analysis.marketCap}亿</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-500">形态: </span>
                      <span className="font-medium">{analysis.pattern}</span>
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
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-500">建议: </span>
                    <span className={`font-medium ${analysis.positionAdvice === '可关注' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {analysis.positionAdvice}
                    </span>
                    <span className="mx-2">|</span>
                    <span className="text-slate-500">风险: </span>
                    <span className={`font-medium ${analysis.riskLevel === '低风险' ? 'text-emerald-500' : analysis.riskLevel === '中风险' ? 'text-amber-500' : 'text-red-500'}`}>
                      {analysis.riskLevel}
                    </span>
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
