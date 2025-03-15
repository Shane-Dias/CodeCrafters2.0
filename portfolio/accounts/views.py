from sqlite3 import IntegrityError
from portfolio.accounts import admin
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
    def get(self, request, user_id):
        try:
            auth_header = request.META.get('HTTP_AUTHORIZATION')
            if auth_header and auth_header.startswith('Bearer '):
                try:
                    token_str = auth_header.split(' ')[1]
                    token = AccessToken(token_str)
                    user = User.objects.get(id=token['user_id'])
                except Exception as e:
                    return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"error": "No Authorization token"}, status=status.HTTP_401_UNAUTHORIZED)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['POST'])
def buy_stock(request):
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if auth_header and auth_header.startswith('Bearer '):
        try:
            token_str = auth_header.split(' ')[1]
            token = AccessToken(token_str)
            user = User.objects.get(id=token['user_id'])
        except Exception as e:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"error": "No Authorization token"}, status=status.HTTP_401_UNAUTHORIZED)
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


# Register and Login Script with Token Generaton

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
import logging
logger = logging.getLogger(__name__)
from rest_framework import generics, status
class SignUpView(APIView):
    def post(self, request):
        data = request.data

        # Validate required fields
        required_fields = [
            "firstName", "lastName", "email", "phoneNumber",
            "address", "aadharNumber", "emergencyContact1",
            "emergencyContact2", "password"
        ]
        for field in required_fields:
            if not data.get(field):
                return Response({field: f"{field} is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check for unique constraints
        if User.objects.filter(email=data["email"]).exists():
            return Response({"email": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Save user
        try:
            user = User.objects.create(
                first_name=data["firstName"],
                last_name=data["lastName"],
                email=data["email"],  # Use email as username
                password=make_password(data["password"])  # Hash the password
            )

            # Add custom fields if you're using a custom User model
            user.phone_number = data["phoneNumber"]
            user.address = data["address"]
            user.aadhar_number = data["aadharNumber"]
            user.emergency_contact1 = data["emergencyContact1"]
            user.emergency_contact2 = data["emergencyContact2"]
            user.save()

            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

        except IntegrityError:
            return Response({"error": "An error occurred while creating the user."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Input validation
        if not email or not password:
            return Response({
                "error": "Both email and password are required."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Determine if it's an admin or regular user login
            if email.endswith("@admin.com"):
                user = get_object_or_404(admin, email=email)
                user_type = "admin"
            else:
                user = get_object_or_404(User, email=email)
                user_type = "user"

            # Verify password
            if not check_password(password, user.password):
                return Response({
                    "error": "Invalid credentials"
                }, status=status.HTTP_401_UNAUTHORIZED)

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "user_type": user_type,
                "user_id": user.id,
                "email": user.email,
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh)
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "error": "Invalid credentials"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
