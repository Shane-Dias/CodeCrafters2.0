from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Add password field but hide it in responses

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'phone_number', 'address', 'bank_account', 'password', 'wallet']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            address=validated_data['address'],
            bank_account=validated_data['bank_account'],
            password=validated_data['password']  # Django automatically hashes this
        )
        return user
    
from rest_framework import serializers
from .models import StockPurchase

class StockPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPurchase
        fields = ['id', 'user', 'symbol', 'company_name', 'price', 'quantity', 'purchased_at']

