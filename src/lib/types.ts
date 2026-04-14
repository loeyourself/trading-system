// 交易记录
export interface Trade {
  id: string;
  date: string;
  stockCode: string;
  stockName: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  reason: string;
  pnl?: number; // 盈亏
  notes?: string;
}

// 股票池
export interface Stock {
  id: string;
  code: string;
  name: string;
  addDate: string;
  strategy: string; // 策略标签
  status: 'watch' | 'hold' | 'sold';
  notes?: string;
}

// 策略
export interface Strategy {
  id: string;
  name: string;
  description: string;
  signalHistory: Signal[];
  createdAt: string;
}

// 策略信号
export interface Signal {
  id: string;
  date: string;
  stockCode: string;
  type: 'long' | 'short' | 'exit';
  price: number;
  reason: string;
}

// 资金曲线数据点
export interface EquityPoint {
  date: string;
  value: number;
  pnl: number;
}

// 统计概览
export interface Stats {
  totalPnl: number;
  totalPnlPercent: number;
  winRate: number;
  totalTrades: number;
  holdStocks: number;
}
