from django.urls import path, include
from post import views

urlpatterns = [
    path('posts', views.PostViewSet.as_view()),
    path('missing-person', views.MissingPersonViewSet.as_view()),
    path('create-post/', views.PostView.as_view()),
    path('get-post/<id>', views.get_post),
    path('add-comment/', views.add_comment),
    path('set-visibility/', views.set_visibility),
]