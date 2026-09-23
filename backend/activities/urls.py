from django.urls import path

from .views import activity_list, submit_activity

urlpatterns = [
    path('', activity_list, name='activity_list'),
    path('submit/', submit_activity, name='submit_activity'),
]
