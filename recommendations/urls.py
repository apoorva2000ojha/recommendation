from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('recommend', views.recommend, name='recommend'),
    path('movie', views.movie, name='movie'),
]
