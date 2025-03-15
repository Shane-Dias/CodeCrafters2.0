from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()

class RegisterUser(APIView):
    def get(self, request):
        return Response({"message": "Register endpoint is working!"}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Uses ModelSerializer's create method
            user.set_password(request.data.get('password'))  # Hashes the password
            user.save()  
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUser(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from .models import CustomUser

class LoginUser(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)

        if user is not None:
            serializer = UserSerializer(user)
            return Response({"message": "Login Successful!", "user": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

import yfinance as yf
from django.http import JsonResponse
from datetime import datetime, timedelta

def get_stock_data(request, ticker="AAPL"):
    stock = yf.Ticker(ticker)
    end_date = datetime.today()
    start_date = end_date - timedelta(days=30)

    df = stock.history(period="1mo", interval="1d")  # Fetch last 1-month data
    df.reset_index(inplace=True)
    df['Date'] = df['Date'].astype(str)

    stock_data = df[['Date', 'Open', 'High', 'Low', 'Close']].to_dict(orient="records")
    return JsonResponse({"data": stock_data})
