from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import yfinance as yf
from .utils import stock_optimization
from rest_framework.parsers import JSONParser
from rest_framework import status
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema.output_parser import StrOutputParser
from langchain.chat_models import ChatGoogleGenerativeAI
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

class ChatbotView_Therapist(APIView):
    parser_classes=[JSONParser]
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        self.llm = ChatGoogleGenerativeAI(
                model="gemini-1.5-flash",
                api_key="AIzaSyDv7RThoILjeXAryluncDRZ1QeFxAixR7Q",
                max_retries=3,
                retry_wait_strategy=wait_exponential(multiplier=1, min=4, max=10)
            )
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", """
             You are an AI assistant specializing in both therapy and legal guidance in India.
            As a therapist, provide empathetic emotional support, comfort, and guidance, especially for users dealing with trauma.
            As a legal guidance officer, offer clear, concise advice based on Indian law, ensuring accuracy and relevance.
            Balance both roles carefully—your responses should be brief yet compassionate, legally sound, and practical. If appropriate, use the user’s location to recommend nearby government agencies or legal resources for further assistance.
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
