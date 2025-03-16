from django.urls import path
from .views import LoginUser, RegisterUser, GetUser, request_sell_stock, confirm_sell_stock, request_buy_stock, confirm_buy_stock
from .views import get_stock_data, get_user

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path("login/", LoginUser.as_view(), name="login"),
    path('user/<int:user_id>/', GetUser.as_view(), name='get_user'),
    path('get_stock_data/<str:ticker>/', get_stock_data, name='get_stock_data'),
    path('request-sell/', request_sell_stock, name='request_sell_stock'),
    path('confirm-sell/', confirm_sell_stock, name='confirm_sell_stock'),
     path('request-buy/', request_buy_stock, name='request_buy_stock'),
    path('confirm-buy/', confirm_buy_stock, name='confirm_buy_stock'),
    path('get_user/', get_user, name='get_user'),
]
