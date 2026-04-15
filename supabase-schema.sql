-- 股票池表
CREATE TABLE stocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(10) NOT NULL,
  name VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'watch',
  strategy VARCHAR(100),
  notes TEXT,
  add_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 交易记录表
CREATE TABLE trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stock_code VARCHAR(10) NOT NULL,
  stock_name VARCHAR(50) NOT NULL,
  type VARCHAR(10) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  date DATE NOT NULL,
  reason TEXT,
  pnl DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 持仓表
CREATE TABLE positions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stock_code VARCHAR(10) NOT NULL,
  stock_name VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  avg_price DECIMAL(10, 2) NOT NULL,
  current_price DECIMAL(10, 2),
  pnl DECIMAL(10, 2),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 资金曲线表
CREATE TABLE equity_curve (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  value DECIMAL(15, 2) NOT NULL,
  pnl DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 策略表
CREATE TABLE strategies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  signal_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 信号记录表
CREATE TABLE signals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  strategy_id UUID REFERENCES strategies(id),
  stock_code VARCHAR(10),
  stock_name VARCHAR(50),
  signal_type VARCHAR(20),
  price DECIMAL(10, 2),
  date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 开启 RLS
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE equity_curve ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;

-- 公开访问策略（简单版本，生产环境需要更严格的控制）
CREATE POLICY "Allow all" ON stocks FOR ALL USING (true);
CREATE POLICY "Allow all" ON trades FOR ALL USING (true);
CREATE POLICY "Allow all" ON positions FOR ALL USING (true);
CREATE POLICY "Allow all" ON equity_curve FOR ALL USING (true);
CREATE POLICY "Allow all" ON strategies FOR ALL USING (true);
CREATE POLICY "Allow all" ON signals FOR ALL USING (true);
