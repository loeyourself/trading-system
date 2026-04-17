"""Test TradingAgents research"""
import sys
import json
import os
from datetime import datetime

sys.path.insert(0, r'C:\Users\14261\.openclaw\workspace\TradingAgents')

from tradingagents.graph.trading_graph import TradingAgentsGraph
from tradingagents.default_config import DEFAULT_CONFIG

ticker = "AAPL"
date_str = "2026-04-15"

config = DEFAULT_CONFIG.copy()
config["llm_provider"] = "minimax"
config["deep_think_llm"] = "MiniMax-M2.7"
config["quick_think_llm"] = "MiniMax-M2"

os.environ['MINIMAX_API_KEY'] = 'sk-cp-cu_EZIL9nUJYgJ7yy8uF8M3PwN3_sS0TM-7IVkBZcWLtq0d8DHAGspYSRHO1wAVEgfbgUlPzLlK27LqcUC1QzfQHiCvsdbMtQ2blCTmSL0bNMPHSoDhiiUg'

print(f"Testing TradingAgents with {ticker}...")

try:
    ta = TradingAgentsGraph(debug=False, config=config)
    result = ta.propagate(ticker, date_str)
    print("SUCCESS")
    print(type(result))
    if isinstance(result, tuple):
        state, decision = result
        print("Decision:", decision[:200] if decision else "None")
except Exception as e:
    print("ERROR:", str(e)[:300])
