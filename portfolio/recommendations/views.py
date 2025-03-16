from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import yfinance as yf
import os
from .utils import stock_optimization
from rest_framework.parsers import JSONParser
from rest_framework import status
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema.output_parser import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import requests
# Create your views here.
load_dotenv()

@api_view(['POST'])
def recommend_portfolio(request):
    tickers = request.data['tickers']
    total_portfolio_value = request.data['total_portfolio_value']
    risk = request.data['risk']
    volatility = request.data['volatility']
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
            print(ticker)
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

class ChatbotView_Therapist(APIView):
    parser_classes=[JSONParser]
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        api_key = os.getenv("GOOGLE_API_KEY")
        self.llm = ChatGoogleGenerativeAI(
                model="gemini-1.5-flash",
                api_key=api_key,
                max_retries=3,
            )
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", """
            You are an AI assistant specializing in financial expertise, particularly in the Indian market.

            As a financial expert, provide accurate, up-to-date insights on investments, stock markets, mutual funds, taxation, personal finance, and economic trends in India. Offer practical, well-researched advice tailored to users' financial goals, risk appetite, and market conditions.

            Balance clarity and depth in your responses—ensuring they are concise, actionable, and easy to understand. When relevant, use the user’s location to recommend nearby financial institutions, tax consultants, or government agencies for further assistance.
             """),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{user_input}"),
        ])
        self.chain = self.prompt | self.llm | StrOutputParser()

    def post(self, request, *args, **kwargs):
        user_input = request.data.get("user_input", "").strip()
        chat_history = request.data.get("chat_history")
        location = request.data.get("location")

        if not isinstance(chat_history, list):  # Ensure chat_history is a list
            chat_history = []

        if not user_input:
            return Response({"error": "user_input is required"}, status=status.HTTP_400_BAD_REQUEST)

        chain_input = {"user_input": user_input, "chat_history": chat_history, "location": location}
        response = self.chain.invoke(chain_input)

        chat_history.append(f"User: {user_input}")
        chat_history.append(f"Bot: {response}")

        return Response({
            "user_input": user_input,
            "bot_response": response,
            "chat_history": chat_history,
        }, status=status.HTTP_200_OK)

# @api_view['GET']
# def get_stocks_data(request):
#     url = 

class NewsNews(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        google_key = os.getenv("GOOGLE_API_KEY")
        self.llm = ChatGoogleGenerativeAI(
                model="gemini-1.5-flash",
                api_key=google_key,
                max_retries=3,
            )
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", """
"You are an AI assistant specializing in financial analysis, with a deep focus on the Indian stock market. Your primary responsibility is to analyze global news, economic events, and geopolitical developments, and assess their potential impact on the Indian stock market. Using data-driven insights, predict how these events may influence stock prices, sectoral performance, market indices, and overall investor sentiment.

Your responses must follow these guidelines:
1. Start every message with: 'As per the latest news,' to provide context.
2. If no actionable insight can be derived, respond with: 'As per the latest news, there isn't enough data to derive actionable insights at the moment. We apologize for the inconvenience and will keep you updated as new information becomes available.'
3. Structure your analysis into four key areas:
   - Impact Assessment: Evaluate how global developments (e.g., geopolitical tensions, central bank policies, commodity price fluctuations, or corporate earnings abroad) could affect the Indian market.
   - Sectoral Insights: Identify which sectors (e.g., IT, banking, energy, pharmaceuticals) are likely to benefit or face challenges due to these developments.
   - Stock Recommendations: Recommend specific Indian stocks to monitor, highlighting potential profit opportunities or risks based on market conditions, company fundamentals, and investor risk appetite.
   - Actionable Insights: Provide concise, well-researched, and actionable recommendations, making complex financial trends easy to understand for investors.
4. Keep responses brief, concise, and tailored to current market conditions. Incorporate both short-term and long-term perspectives, and back your insights with relevant data and trends.
5. Empower investors with timely, accurate, and practical insights to help them make informed decisions.

**Example Responses**:
1. **With Insights**:  
   'As per the latest news, the US Federal Reserve's decision to maintain interest rates has led to a positive sentiment in global markets. This is likely to boost foreign institutional investment (FII) inflows into the Indian market, particularly in IT and banking sectors. Stocks to watch include Infosys (IT) and HDFC Bank (Banking). Investors should consider increasing exposure to these sectors for short-term gains.'
   
2. **Without Insights**:  
   'As per the latest news, there isn't enough data to derive actionable insights at the moment. We apologize for the inconvenience and will keep you updated as new information becomes available.'"
             """),
            ("human", "{user_input}"),
        ])
        self.chain = self.prompt | self.llm | StrOutputParser()

    def get(self, request, *args, **kwargs):
        api_key = os.getenv("NEWS_API_KEY")
        url = "https://api.marketaux.com/v1/news/all?filter_entities=true&language=en&api_token="+api_key
        response = requests.get(url)
        news = response.json()

        if not news:
            return Response({"error": "news is required"}, status=status.HTTP_400_BAD_REQUEST)

        chain_input = {"user_input": news}
        response = self.chain.invoke(chain_input)
        return Response({
            "bot_response": response,
        }, status=status.HTTP_200_OK)