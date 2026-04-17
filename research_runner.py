"""
TradingAgents 研究脚本
用法: python research_runner.py <股票代码> [日期]
"""
import sys
import json
import os
from datetime import datetime

# 添加 TradingAgents 到路径
sys.path.insert(0, r'C:\Users\14261\.openclaw\workspace\TradingAgents')

from tradingagents.graph.trading_graph import TradingAgentsGraph
from tradingagents.default_config import DEFAULT_CONFIG

def run_research(ticker: str, date_str: str = None):
    """运行 TradingAgents 研究"""
    
    # 配置 MiniMax
    config = DEFAULT_CONFIG.copy()
    config["llm_provider"] = "minimax"
    config["deep_think_llm"] = "MiniMax-M2.7"
    config["quick_think_llm"] = "MiniMax-M2"
    
    # 设置 API Key
    os.environ['MINIMAX_API_KEY'] = 'sk-cp-cu_EZIL9nUJYgJ7yy8uF8M3PwN3_sS0TM-7IVkBZcWLtq0d8DHAGspYSRHO1wAVEgfbgUlPzLlK27LqcUC1QzfQHiCvsdbMtQ2blCTmSL0bNMPHSoDhiiUg'
    
    print(f"开始研究 {ticker}...", file=sys.stderr)
    
    try:
        # 初始化 TradingAgents
        ta = TradingAgentsGraph(debug=False, config=config)
        
        # 运行研究
        if date_str is None:
            date_str = datetime.now().strftime('%Y-%m-%d')
        
        print(f"分析日期: {date_str}", file=sys.stderr)
        
        # propagate 返回 (state, decision)
        result = ta.propagate(ticker, date_str)
        
        if isinstance(result, tuple):
            state, decision = result
        else:
            decision = str(result)
            state = {}
        
        return {
            "success": True,
            "ticker": ticker,
            "date": date_str,
            "decision": decision,
            "state": state if isinstance(state, dict) else {}
        }
        
    except Exception as e:
        return {
            "success": False,
            "ticker": ticker,
            "error": str(e)
        }

if __name__ == "__main__":
    ticker = sys.argv[1] if len(sys.argv) > 1 else "AAPL"
    date_str = sys.argv[2] if len(sys.argv) > 2 else None
    
    result = run_research(ticker, date_str)
    print(json.dumps(result, ensure_ascii=False))
