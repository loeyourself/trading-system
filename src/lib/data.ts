import { Trade, Stock, Strategy, EquityPoint, Stats } from './types';

// 模拟数据 - 正式使用时替换为 Supabase 数据

export const mockTrades: Trade[] = [
  { id: '1', date: '2026-04-10', stockCode: '600110', stockName: '诺德股份', type: 'buy', price: 12.50, quantity: 10000, reason: '铜箔板块放量突破', pnl: 0 },
  { id: '2', date: '2026-04-11', stockCode: '600183', stockName: '生益科技', type: 'buy', price: 28.30, quantity: 5000, reason: 'PCB板块强势', pnl: 0 },
  { id: '3', date: '2026-04-12', stockCode: '600110', stockName: '诺德股份', type: 'sell', price: 13.20, quantity: 10000, reason: '止盈卖出', pnl: 7000 },
];

export const mockStocks: Stock[] = [
  { id: '1', code: '600110', name: '诺德股份', addDate: '2026-04-08', strategy: '波段突破', status: 'sold', notes: '铜箔龙头' },
  { id: '2', code: '600183', name: '生益科技', addDate: '2026-04-10', strategy: '板块轮动', status: 'hold', notes: 'PCB概念' },
  { id: '3', code: '688388', name: '嘉元科技', addDate: '2026-04-11', strategy: '超跌反弹', status: 'watch', notes: '锂电铜箔' },
  { id: '4', code: '688188', name: '华工科技', addDate: '2026-04-12', strategy: '光模块', status: 'watch', notes: 'CPO概念' },
];

export const mockStrategies: Strategy[] = [
  {
    id: '1',
    name: '波段突破',
    description: '在支撑位缩量回踩后放量突破时买入，止损设在支撑位下方5%',
    signalHistory: [],
    createdAt: '2026-04-01',
  },
  {
    id: '2',
    name: '板块轮动',
    description: '跟踪热门板块龙头股，在板块启动初期介入',
    signalHistory: [],
    createdAt: '2026-04-05',
  },
];

// 生成资金曲线数据
export const mockEquityCurve: EquityPoint[] = [
  { date: '2026-04-01', value: 1000000, pnl: 0 },
  { date: '2026-04-02', value: 1005000, pnl: 5000 },
  { date: '2026-04-03', value: 1002000, pnl: -3000 },
  { date: '2026-04-04', value: 1010000, pnl: 8000 },
  { date: '2026-04-07', value: 1015000, pnl: 5000 },
  { date: '2026-04-08', value: 1023000, pnl: 8000 },
  { date: '2026-04-09', value: 1028000, pnl: 5000 },
  { date: '2026-04-10', value: 1035000, pnl: 7000 },
  { date: '2026-04-11', value: 1042000, pnl: 7000 },
  { date: '2026-04-14', value: 1050000, pnl: 8000 },
];

export const mockStats: Stats = {
  totalPnl: 50000,
  totalPnlPercent: 5.0,
  winRate: 68.5,
  totalTrades: 23,
  holdStocks: 3,
};
