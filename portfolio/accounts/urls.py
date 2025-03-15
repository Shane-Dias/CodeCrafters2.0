from django.urls import path
from .views import RegisterUser, GetUser

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path('user/<int:user_id>/', GetUser.as_view(), name='get_user'),
]
