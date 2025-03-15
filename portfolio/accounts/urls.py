from django.urls import path
from .views import LoginUser, RegisterUser, GetUser, buy_stock
from .views import get_stock_data 

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path("login/", LoginUser.as_view(), name="login"),
    path('user/<int:user_id>/', GetUser.as_view(), name='get_user'),
    path('get_stock_data/<str:ticker>/', get_stock_data, name='get_stock_data'),
    path('buy/', buy_stock, name='buy_stock'),
]
