from django.urls import path
from . import views

urlpatterns = [
    path('recommend_portfolio/', views.recommend_portfolio, name='recommend_portfolio'),
    path('chatbot/', views.ChatbotView_Therapist.as_view(), name='chatbot'),
    path('news/', views.NewsNews.as_view(), name='News'),
]
