'use client';

import { useState } from 'react';

interface ResearchResult {
  success: boolean;
  ticker: string;
  date?: string;
  decision?: string;
  error?: string;
}

export default function ResearchPage() {
  const [ticker, setTicker] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleResearch = async () => {
    if (!ticker.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: ticker.trim().toUpperCase(), date }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({
        success: false,
        ticker: ticker,
        error: error.message || '请求失败',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleResearch();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>AI 投研分析</h1>

      {/* 输入区域 */}
      <div style={{
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
              股票代码
            </label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="如: AAPL, NVDA, 600110"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
              分析日期
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ flex: '0 0 auto', alignSelf: 'flex-end' }}>
            <button
              onClick={handleResearch}
              disabled={loading || !ticker.trim()}
              style={{
                padding: '10px 24px',
                background: loading ? '#ccc' : '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? '分析中...' : '开始分析'}
            </button>
          </div>
        </div>

        <p style={{ marginTop: '12px', fontSize: '13px', color: '#666' }}>
          支持美股（AAPL、NVDA）、A股（600110、000001）、港股（0700.HK）等
        </p>
      </div>

      {/* 加载状态 */}
      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: '#f9f9f9',
          borderRadius: '8px',
        }}>
          <div style={{ marginBottom: '12px' }}>
            <span style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              border: '3px solid #0070f3',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
          <p>TradingAgents 正在分析 {ticker}...</p>
          <p style={{ fontSize: '13px', color: '#888' }}>
            首次运行可能需要 3-5 分钟，请耐心等待
          </p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* 结果展示 */}
      {result && !loading && (
        <div style={{
          background: result.success ? '#f0f9ff' : '#fff1f0',
          border: `1px solid ${result.success ? '#91d5ff' : '#ffccc7'}`,
          borderRadius: '8px',
          padding: '20px',
        }}>
          <h3 style={{
            marginTop: 0,
            color: result.success ? '#1890ff' : '#ff4d4f',
          }}>
            {result.success ? '分析完成' : '分析失败'}
          </h3>

          <div style={{ marginBottom: '12px' }}>
            <strong>股票:</strong> {result.ticker}
            {result.date && <span> | <strong>日期:</strong> {result.date}</span>}
          </div>

          {result.success && result.decision && (
            <div>
              <strong style={{ display: 'block', marginBottom: '8px' }}>交易决策:</strong>
              <div style={{
                background: '#fff',
                padding: '16px',
                borderRadius: '6px',
                whiteSpace: 'pre-wrap',
                fontSize: '14px',
                lineHeight: 1.6,
                maxHeight: '400px',
                overflowY: 'auto',
              }}>
                {result.decision}
              </div>
            </div>
          )}

          {result.error && (
            <div style={{ color: '#ff4d4f' }}>
              <strong>错误信息:</strong>
              <p style={{ whiteSpace: 'pre-wrap' }}>{result.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
