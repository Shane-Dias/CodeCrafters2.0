import yfinance as yf
import matplotlib.pyplot as plt
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt.risk_models import CovarianceShrinkage
from pypfopt.expected_returns import mean_historical_return
from pypfopt.discrete_allocation import DiscreteAllocation, get_latest_prices
from datetime import datetime, timedelta
import xgboost as xgb
import pandas as pd
import joblib

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
    print(allocation)
    print(leftover)

    return expected_return, volatility, sharpe, cleaned_weights, allocation, leftover

# tickers = ['AAPL', 'AMZN', 'MSFT', 'GOOGL', 'META']
# total_portfolio_value = 10000
# stock_optimization(tickers, total_portfolio_value, risk='high')

def get_stock_data(stock):
    end_date = datetime.today().strftime('%Y-%m-%d')
    start_date = (datetime.today() - timedelta(days=6*365)).strftime('%Y-%m-%d')
    data = yf.download(stock, start=start_date, end=end_date)
    df = pd.DataFrame(data)
    df.columns = ['_'.join(col).strip() if isinstance(col, tuple) else col for col in df.columns]
    df.rename(columns={'Close_' + stock: 'Close',	'High_'+ stock: 'High',	'Low_' + stock: 'Low', 	'Open_' + stock: 'Open',	'Volume_' + stock: 'Volume'}, inplace=True)

def preprocess(df):
    df['Year'] = df.index.year
    df['Month'] = df.index.month
    df['Day'] = df.index.day
    df['DayOfWeek'] = df.index.dayofweek  # 0=Monday, 6=Sunday
    df['IsMonthEnd'] = df.index.is_month_end.astype(int)
    df['IsMonthStart'] = df.index.is_month_start.astype(int)
    df['IsBudgetDay'] = (df.index == '2024-02-01').astype(int)
    df['Quarter'] = df.index.quarter
    # Add technical indicators
        # 1. Moving averages
    df['MA5'] = df['Close'].rolling(window=5).mean()
    df['MA20'] = df['Close'].rolling(window=20).mean()
    df['MA50'] = df['Close'].rolling(window=50).mean()
        
        # 2. Relative Strength Index (RSI)
    delta = df['Close'].diff()
    gain = delta.where(delta > 0, 0).rolling(window=14).mean()
    loss = -delta.where(delta < 0, 0).rolling(window=14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))
        
        # 3. MACD
    df['EMA12'] = df['Close'].ewm(span=12).mean()
    df['EMA26'] = df['Close'].ewm(span=26).mean()
    df['MACD'] = df['EMA12'] - df['EMA26']
    df['Signal'] = df['MACD'].ewm(span=9).mean()
        
        # 4. Bollinger Bands
    df['20MA'] = df['Close'].rolling(window=20).mean()
    df['20STD'] = df['Close'].rolling(window=20).std()
    df['Upper_Band'] = df['20MA'] + 2 * df['20STD']
    df['Lower_Band'] = df['20MA'] - 2 * df['20STD']
        
        # 5. Volume features
    df['Volume_Change'] = df['Volume'].pct_change()
    df['Volume_MA5'] = df['Volume'].rolling(window=5).mean()
        
        # 6. Price momentum
    df['Price_Change'] = df['Close'].pct_change()
    df['Price_Change_5d'] = df['Close'].pct_change(periods=5)
        
        # Drop NaN values that result from calculations
    df = df.dropna()
    df['Target'] = df['Close'].shift(-1)
    df['Target'][-1] = df['Close'][-1]
    return 


def update_xgb_model(new_data_path="new_stock_data.csv"):
    global model

    # Load new data
    new_data = pd.read_csv(new_data_path)
    new_data['Date'] = pd.to_datetime(new_data['Date'])

    # Preprocess new data
    new_data = preprocess_data(new_data)
    X_new = new_data.drop(columns=['Close'])
    y_new = new_data['Close']

    # Convert to DMatrix
    dnew = xgb.DMatrix(X_new, label=y_new)

    # Update model using warm start
    model.fit(X_new, y_new, xgb_model="xgboost_model.pkl")

    # Save updated model
    joblib.dump(model, "xgboost_model.pkl")

    print(f"🔄 XGBoost model updated with new data from {new_data_path}!")