from django.urls import path
from students.views import (
    StudentProfileView, StudentDashboardView, StudentTasksView,
    StudentTaskDetailView, StudentActivitiesView, StudentProjectView
)

urlpatterns = [
    path('me/', StudentProfileView.as_view(), name='student_profile'),
    path('me/dashboard/', StudentDashboardView.as_view(), name='student_dashboard'),
    path('me/tasks/', StudentTasksView.as_view(), name='student_tasks'),
    path('me/tasks/<int:pk>/', StudentTaskDetailView.as_view(), name='student_task_detail'),
    path('me/activities/', StudentActivitiesView.as_view(), name='student_activities'),
    path('me/project/', StudentProjectView.as_view(), name='student_project'),
]
