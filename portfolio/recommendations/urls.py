from django.urls import path
from . import views

urlpatterns = [
    path('recommend_portfolio/', views.recommend_portfolio, name='recommend_portfolio'),
    path('user/<int:user_id>/', GetUser.as_view(), name='get_user'),
]
