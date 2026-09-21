from django.urls import path

from .views import report_list

urlpatterns = [
    path('', report_list, name='report_list'),
]
