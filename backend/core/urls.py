from django.urls import path
from core.views import (
    AdminDashboardView, AdminStudentsView, AdminMentorsView,
    AdminReportsView, AdminAuditLogsView
)

urlpatterns = [
    path('dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('students/', AdminStudentsView.as_view(), name='admin_students'),
    path('mentors/', AdminMentorsView.as_view(), name='admin_mentors'),
    path('reports/', AdminReportsView.as_view(), name='admin_reports'),
    path('audit-logs/', AdminAuditLogsView.as_view(), name='admin_audit_logs'),
]
