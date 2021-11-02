from django.urls import path, include
from station import views

urlpatterns = [
    path('get-stations', views.get_stations),
]