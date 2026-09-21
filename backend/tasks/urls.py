from django.urls import path

from .views import create_task, task_list

urlpatterns = [
    path('', task_list, name='task_list'),
    path('create/', create_task, name='create_task'),
]
