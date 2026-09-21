from django.urls import path
from internships.views import InternshipListView

urlpatterns = [
    path('', InternshipListView.as_view(), name='internship_list'),
]
