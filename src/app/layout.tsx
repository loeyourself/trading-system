import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "猎手交易系统",
  description: "波段交易系统 v2.0 - 纯K线+成交量",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
