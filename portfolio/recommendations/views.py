from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import yfinance as yf
from .utils import stock_optimization
# Create your views here.

@api_view(['POST'])
def recommend_portfolio(request):
    tickers = request.data['tickers']
    total_portfolio_value = request.data['total_portfolio_value']
    risk = request.data['risk']
    
    corrected_tickers = []
    
    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)
            info = stock.info
            exchange = info.get('exchange', '').upper()  # Get exchange info
            
            if 'NSE' in exchange:
                corrected_tickers.append(ticker + ".NS")  # NSE Suffix
            elif 'BSE' in exchange:
                corrected_tickers.append(ticker + ".BO")  # BSE Suffix
            else:
                corrected_tickers.append(ticker)  # If unknown, keep as is
        except Exception as e:
            return Response({'error': f"Failed to fetch exchange for {ticker}: {str(e)}"}, status=400)

    # Call the stock optimization function
    expected_return, volatility, sharpe, cleaned_weights, allocation, leftover = stock_optimization(corrected_tickers, total_portfolio_value, risk)

    return Response({
        'expected_return': expected_return,
        'volatility': volatility,
        'sharpe': sharpe,
        'cleaned_weights': cleaned_weights,
        'allocation': allocation,
        'leftover': leftover
    })