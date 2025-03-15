from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import yfinance as yf
from datetime import datetime, timedelta
from .serializers import UserSerializer, StockPurchaseSerializer
from .models import StockPurchase

User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data.get('password'))
            user.save()
            tokens = get_tokens_for_user(user)
            return Response({"message": "User registered successfully!", "tokens": tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            serializer = UserSerializer(user)
            return Response({"message": "Login Successful!", "user": serializer.data, 
                             "tokens": {
                                        "access": str(refresh.access_token),
                                        "refresh": str(refresh)
                }}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class GetUser(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buy_stock(request):
    user = request.user
    symbol = request.data.get('symbol')
    company_name = request.data.get('company_name')
    price = request.data.get('price')
    quantity = request.data.get('quantity', 1)

    if not symbol or not company_name or not price:
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        price = float(price)
    except ValueError:
        return Response({"error": "Invalid price format"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        quantity = int(quantity)
        if quantity <= 0:
            raise ValueError
    except ValueError:
        return Response({"error": "Quantity must be a positive integer"}, status=status.HTTP_400_BAD_REQUEST)

    stock_purchase = StockPurchase.objects.create(
        user=user, symbol=symbol, company_name=company_name, price=price, quantity=quantity
    )
    return Response(StockPurchaseSerializer(stock_purchase).data, status=status.HTTP_201_CREATED)

def get_stock_data(request, ticker="AAPL"):
    stock = yf.Ticker(ticker)
    df = stock.history(period="1mo", interval="1d")
    df.reset_index(inplace=True)
    df['Date'] = df['Date'].astype(str)
    stock_data = df[['Date', 'Open', 'High', 'Low', 'Close']].to_dict(orient="records")
    return JsonResponse({"data": stock_data})
