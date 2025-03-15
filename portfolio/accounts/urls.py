from django.urls import path
from .views import LoginUser, RegisterUser, GetUser

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path("login/", LoginUser.as_view(), name="login"),
    path('user/<int:user_id>/', GetUser.as_view(), name='get_user'),
]
