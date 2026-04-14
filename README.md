# 🎯 猎手交易系统

波段交易系统 v2.0 - 纯K线+成交量

## 功能模块

- **Dashboard** - 资金曲线、收益统计
- **股票池** - 自选股管理、策略标注
- **交易日志** - 买入/卖出记录、复盘笔记
- **策略管理** - 策略说明、信号记录
- **数据分析** - 可视化分析

## 技术栈

- **框架**: Next.js 16 (React)
- **样式**: Tailwind CSS
- **图表**: Recharts
- **数据库**: Supabase
- **部署**: Vercel

## 开始使用

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 本地预览
npm run start
```

## 部署到 Vercel

1. Fork 或导入此仓库到 GitHub
2. 在 [Vercel](https://vercel.com) 连接 GitHub 仓库
3. 自动部署

## 环境变量

创建 `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
