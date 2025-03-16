from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Add password field but hide it in responses
    total_investment = serializers.SerializerMethodField()
    total_profit = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'phone_number', 'address', 'bank_account', 'password', 'wallet', 'total_investment', 'total_profit']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            address=validated_data['address'],
            bank_account=validated_data['bank_account'],
            password=validated_data['password']  # Django automatically hashes this
        )
        return user
    
    def get_total_investment(self, obj):
        # Calculate total investment
        purchases = StockPurchase.objects.filter(user=obj)
        total_investment = sum(purchase.price * purchase.quantity for purchase in purchases)
        return total_investment

    def get_total_profit(self, obj):
        # Calculate total profit (assuming profit is calculated as (current_price - purchase_price) * quantity)
        # For simplicity, let's assume current_price is the same as purchase_price
        # You can modify this logic based on your actual profit calculation
        purchases = StockPurchase.objects.filter(user=obj)
        total_profit = sum((purchase.price - purchase.price) * purchase.quantity for purchase in purchases)
        return total_profit
    
from rest_framework import serializers
from .models import StockPurchase

class StockPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPurchase
        fields = ['id', 'user', 'symbol', 'company_name', 'price', 'quantity', 'purchased_at']

