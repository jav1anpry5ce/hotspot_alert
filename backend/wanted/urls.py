from django.urls import path, include
from wanted import views

urlpatterns = [
    path('wanted-list', views.WantedList.as_view()),
    path('create-wanted-person/', views.WantedView.as_view()),
]