import yfinance as yf
import matplotlib.pyplot as plt
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt.risk_models import CovarianceShrinkage
from pypfopt.expected_returns import mean_historical_return
from pypfopt.discrete_allocation import DiscreteAllocation, get_latest_prices

def stock_optimization(tickers, total_portfolio_value, risk, target_volatility=0.15):
    data = yf.download(tickers, start='2019-01-01', end='2025-03-01')['Close']

    mu = mean_historical_return(data)
    s = CovarianceShrinkage(data).ledoit_wolf()
    ef = EfficientFrontier(mu, s)
    if risk=="high":
        weights = ef.max_sharpe()
    elif risk=="low":
        weights = ef.min_volatility()
    else:
        weight = ef.efficient_risk(target_volatility = target_volatility) # find optimal asset allocation
    cleaned_weights = ef.clean_weights() # Round the weights to very small allocations

    expected_return, volatility, sharpe = ef.portfolio_performance(verbose=True)

    latest_prices = get_latest_prices(data)

    da = DiscreteAllocation(cleaned_weights, latest_prices, total_portfolio_value=total_portfolio_value)
    allocation, leftover = da.lp_portfolio()

    return expected_return, volatility, sharpe, cleaned_weights, allocation, leftover

# tickers = ['AAPL', 'AMZN', 'MSFT', 'GOOGL', 'META']
# total_portfolio_value = 10000
# stock_optimization(tickers, total_portfolio_value, risk='high')