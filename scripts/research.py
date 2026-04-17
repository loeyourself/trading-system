"""
TradingAgents 研究脚本 - 输出 JSON 格式结果
用法: python research.py <股票代码> [日期]
"""
import sys
import json
import os
import traceback
from datetime import datetime

# 设置环境变量
os.environ['MINIMAX_API_KEY'] = 'sk-cp-cu_EZIL9nUJYgJ7yy8uF8M3PwN3_sS0TM-7IVkBZcWLtq0d8DHAGspYSRHO1wAVEgfbgUlPzLlK27LqcUC1QzfQHiCvsdbMtQ2blCTmSL0bNMPHSoDhiiUg'
os.environ['ALPHA_VANTAGE_API_KEY'] = 'S1TBN9KKAD9FGPYX'

sys.path.insert(0, r'C:\Users\14261\.openclaw\workspace\TradingAgents')

from tradingagents.graph.trading_graph import TradingAgentsGraph
from tradingagents.default_config import DEFAULT_CONFIG

def run_research(ticker: str, date_str: str = None):
    """运行 TradingAgents 研究，返回 JSON"""

    config = DEFAULT_CONFIG.copy()
    config["llm_provider"] = "minimax"
    config["deep_think_llm"] = "MiniMax-M2.7"
    config["quick_think_llm"] = "MiniMax-M2"
    config["data_vendors"] = {
        "core_stock_apis": "alpha_vantage",
        "technical_indicators": "alpha_vantage",
        "fundamental_data": "alpha_vantage",
        "news_data": "alpha_vantage",
    }
    config["max_debate_rounds"] = 1

    if date_str is None:
        date_str = datetime.now().strftime('%Y-%m-%d')

    try:
        ta = TradingAgentsGraph(debug=False, config=config)
        result = ta.propagate(ticker, date_str)

        decision = ""
        if isinstance(result, tuple):
            _, decision = result
            decision = str(decision) if decision else ""

        return {
            "success": True,
            "ticker": ticker,
            "date": date_str,
            "decision": decision,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "success": False,
            "ticker": ticker,
            "date": date_str,
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

if __name__ == "__main__":
    ticker = sys.argv[1] if len(sys.argv) > 1 else "AAPL"
    date_str = sys.argv[2] if len(sys.argv) > 2 else datetime.now().strftime('%Y-%m-%d')

    result = run_research(ticker, date_str)
    print(json.dumps(result, ensure_ascii=False, indent=2))
