from django.urls import path

from .views import project_detail

urlpatterns = [
    path('me/', project_detail, name='project_detail'),
]
