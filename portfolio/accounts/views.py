from sqlite3 import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import yfinance as yf
from datetime import datetime, timedelta
from .serializers import UserSerializer, StockPurchaseSerializer
from .models import StockPurchase
from django.core.mail import send_mail
from django.contrib.auth.hashers import check_password, make_password
import random
from django.core.cache import cache
import string
from .models import CustomUser
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
        
        # Validate that both email and password are provided
        if not email or not password:
            return Response({
                "error": "Email and password are required"
            }, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = get_object_or_404(User, email=email)
            if check_password(password, user.password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    "message": "Login Successful!",
                    "tokens": {
                        "access": str(refresh.access_token),
                        "refresh": str(refresh)
                    }
                }, status=status.HTTP_200_OK)
            else:
                # Don't specify which credential is invalid for security
                return Response({
                    "error": "Invalid credentials"
                }, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            # Use the same error message as password failure for security
            return Response({
                "error": "Invalid credentials"
            }, status=status.HTTP_401_UNAUTHORIZED)

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

def get_stock_data(request, ticker="AAPL"):
    stock = yf.Ticker(ticker)
    df = stock.history(period="1d")
    return df['Close']
        
def generate_otp(length=6):
    """Generate a numeric OTP of specified length"""
    return ''.join(random.choices(string.digits, k=length))

def send_otp_email(email, otp, action="sell stock"):
    """Send OTP to user's email"""
    subject = "OTP for Stock Transaction"
    message = f"Your OTP for {action} is: {otp}. This code will expire in 10 minutes."
    send_mail(
        subject,
        message,
        'mayankhmehta80@gmail.com',  # Replace with your sender email
        [email],
        fail_silently=False,
    )

@csrf_exempt
@api_view(['POST'])
def request_buy_stock(request):
    """First step: validate and send OTP for stock purchase"""
    # Authentication check
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if auth_header and auth_header.startswith('Bearer '):
        try:
            token_str = auth_header.split(' ')[1]
            token = AccessToken(token_str)
            print("hello")
            user = CustomUser.objects.get(id=token['user_id'])
        except Exception:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"error": "No Authorization token"}, status=status.HTTP_401_UNAUTHORIZED)

    print("checking user done")

    # Access data using request.data (DRF-specific)
    symbol = request.data.get('symbol')
    quantity = request.data.get('quantity', 1)

    if not symbol:
        return Response({"error": "Stock symbol is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        quantity = int(quantity)
        if quantity <= 0:
            raise ValueError
    except ValueError:
        return Response({"error": "Quantity must be a positive integer"}, status=status.HTTP_400_BAD_REQUEST)

    # Get current stock price (replace with your actual price retrieval logic)
    try:
        stock_price_series = get_stock_data(request, ticker=symbol)
        # Convert the pandas Series to a float
        stock_price = float(stock_price_series.iloc[0]) if not stock_price_series.empty else 0
    except Exception as e:
        return Response({"error": f"Could not get price for {symbol}: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    # Calculate total cost
    total_cost = stock_price * quantity
    print("total_cost:", total_cost)

    # Check if user has enough funds
    if user.wallet < total_cost:
        return Response(
            {"error": "Insufficient funds", "required": total_cost, "available": user.wallet},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Generate OTP and store in cache with transaction details
    otp = generate_otp()
    transaction_key = f"buy_stock_{user.id}_{symbol}_{quantity}_{stock_price}"
    cache.set(transaction_key, otp, timeout=600)  # 10 minutes expiry

    # Send OTP to user's email
    send_otp_email(user.email, otp, f"buy {quantity} shares of {symbol} at ${stock_price} per share")

    return Response({
        "message": "OTP sent to your email. Please verify to complete the purchase.",
        "transaction_key": transaction_key,
        "total_cost": total_cost,
        "price_per_share": stock_price
    }, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
def confirm_buy_stock(request):
    """Second step: verify OTP and complete stock purchase"""
    # Authentication check
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if auth_header and auth_header.startswith('Bearer '):
        try:
            token_str = auth_header.split(' ')[1]
            token = AccessToken(token_str)
            user = CustomUser.objects.get(id=token['user_id'])
        except Exception:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"error": "No Authorization token"}, status=status.HTTP_401_UNAUTHORIZED)
    
    transaction_key = request.data.get('transaction_key')
    otp = request.data.get('otp')
    
    if not transaction_key or not otp:
        return Response({"error": "Transaction key and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Verify the OTP
    stored_otp = cache.get(transaction_key)
    if not stored_otp or stored_otp != otp:
        return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Extract transaction details from key
    try:
        _, _, user_id, symbol, quantity, price = transaction_key.split('_')
        user_id = int(user_id)
        quantity = int(quantity)
        price = float(price)
        
        # Double-check user identity
        if user_id != user.id:
            return Response({"error": "User mismatch"}, status=status.HTTP_400_BAD_REQUEST)
    except (ValueError, IndexError):
        return Response({"error": "Invalid transaction key"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Calculate total cost
    total_cost = price * quantity
    
    # Check again if user still has enough funds
    if user.wallet < total_cost:
        return Response({"error": "Insufficient funds", "required": total_cost, "available": user.wallet}, 
                       status=status.HTTP_400_BAD_REQUEST)
    
    # Delete the OTP from cache
    cache.delete(transaction_key)
    
    # Deduct money from wallet
    user.wallet -= total_cost
    user.save()
    
    # Add or update stock in user's portfolio
    user_stock = StockPurchase.objects.filter(user=user, symbol=symbol).first()
    if user_stock:
        # Update existing position (average down the price)
        total_shares = user_stock.quantity + quantity
        total_value = (user_stock.price * user_stock.quantity) + (price * quantity)
        user_stock.price = total_value / total_shares  # Calculate new average price
        user_stock.quantity = total_shares
        user_stock.save()
    else:
        # Create new position
        StockPurchase.objects.create(
            user=user,
            symbol=symbol,
            quantity=quantity,
            price=price
        )
    
    return Response({
        "message": f"Successfully purchased {quantity} shares of {symbol}",
        "type":"buy",
        "wallet_balance": user.wallet,
        "price_per_share": price,
        "total_cost": total_cost
    }, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
def request_sell_stock(request):
    """First step: validate and send OTP"""
    # Authentication check (same as before)
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if auth_header and auth_header.startswith('Bearer '):
        try:
            token_str = auth_header.split(' ')[1]
            token = AccessToken(token_str)
            user = CustomUser.objects.get(id=token['user_id'])
        except Exception:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"error": "No Authorization token"}, status=status.HTTP_401_UNAUTHORIZED)
    
    symbol = request.data.get('symbol')
    quantity = request.data.get('quantity', 1)
    
    if not symbol:
        return Response({"error": "Stock symbol is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        quantity = int(quantity)
        if quantity <= 0:
            raise ValueError
    except ValueError:
        return Response({"error": "Quantity must be a positive integer"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if the user owns the stock and has enough quantity to sell
    user_stock = StockPurchase.objects.filter(user=user, symbol=symbol).first()
    if not user_stock or user_stock.quantity < quantity:
        return Response({"error": "Insufficient stock quantity"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        stock_price_series = get_stock_data(request, ticker=symbol)
        # Convert the pandas Series to a float
        stock_price = float(stock_price_series.iloc[0]) if not stock_price_series.empty else 0
    except Exception as e:
        return Response({"error": f"Could not get price for {symbol}: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    # Generate OTP and store in cache with user_id, symbol and quantity
    otp = generate_otp()
    transaction_key = f"sell_stock_{user.id}_{symbol}_{quantity}"
    cache.set(transaction_key, otp, timeout=600)  # 10 minutes expiry
    
    # Send OTP to user's email
    send_otp_email(user, otp, f"sell {quantity} shares of {symbol}")
    
    return Response({
        "message": "OTP sent to your email. Please verify to complete the transaction.",
        "transaction_key": transaction_key
    }, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
def confirm_sell_stock(request):
    """Second step: verify OTP and complete transaction"""
    # Authentication check (same as before)
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if auth_header and auth_header.startswith('Bearer '):
        try:
            token_str = auth_header.split(' ')[1]
            token = AccessToken(token_str)
            print("hello")
            user = CustomUser.objects.get(id=token['user_id'])
        except Exception:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"error": "No Authorization token"}, status=status.HTTP_401_UNAUTHORIZED)
    
    transaction_key = request.data.get('transaction_key')
    otp = request.data.get('otp')
    
    if not transaction_key or not otp:
        return Response({"error": "Transaction key and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Verify the OTP
    stored_otp = cache.get(transaction_key)
    if not stored_otp or stored_otp != otp:
        return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Extract transaction details from key
    try:
        _, _, user_id, symbol, quantity = transaction_key.split('_')
        quantity = int(quantity)
        
        # Double-check user identity
        if int(user_id) != user.id:
            return Response({"error": "User mismatch"}, status=status.HTTP_400_BAD_REQUEST)
    except (ValueError, IndexError):
        return Response({"error": "Invalid transaction key"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check again if the user still owns the stock (could have changed since OTP was sent)
    user_stock = StockPurchase.objects.filter(user=user, symbol=symbol).first()
    if not user_stock or user_stock.quantity < quantity:
        return Response({"error": "Insufficient stock quantity"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Delete the OTP from cache
    cache.delete(transaction_key)
    
    # Update stock quantity or delete if all shares are sold
    if user_stock.quantity == quantity:
        user_stock.delete()
    else:
        user_stock.quantity -= quantity
        user_stock.save()
    
    # Assume stock price is retrieved from some external API or stored data
    stock_price = user_stock.price  # Using the original purchase price (you might want market price)
    user.wallet += stock_price * quantity
    user.save()
    
    return Response({
        "message": "Stock sold successfully",
        "type": "sell", 
        "wallet_balance": user.wallet
    }, status=status.HTTP_200_OK)


