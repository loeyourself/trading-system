'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ListOrdered, BookOpen, Brain, TrendingUp } from 'lucide-react';

const navItems = [
  { href: '/', label: '📊 仪表盘', icon: LayoutDashboard },
  { href: '/stocks', label: '股票池', icon: ListOrdered },
  { href: '/trades', label: '交易日志', icon: BookOpen },
  { href: '/strategies', label: '策略管理', icon: Brain },
  { href: '/analytics', label: '数据分析', icon: TrendingUp },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-emerald-400">🎯 猎手交易系统</h1>
        <p className="text-sm text-slate-400 mt-1">Trading System v2.0</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-slate-700">
        <div className="text-xs text-slate-500">
          <p>波段交易系统 v2.0</p>
          <p className="mt-1">纯K线 + 成交量</p>
        </div>
      </div>
    </aside>
  );
}
