from django.urls import path
from . import views

urlpatterns = [
    path('test', views.test, name='bot_test'),
    path('respond', views.respond, name='bot_respond'),
]