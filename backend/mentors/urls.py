from django.urls import path
from mentors.views import (
    MentorProfileView, MentorDashboardView, MentorStudentsView,
    MentorTasksView, MentorReviewsView, MentorReviewApproveView,
    MentorReviewRequestChangesView
)

urlpatterns = [
    path('me/', MentorProfileView.as_view(), name='mentor_profile'),
    path('me/dashboard/', MentorDashboardView.as_view(), name='mentor_dashboard'),
    path('me/students/', MentorStudentsView.as_view(), name='mentor_students'),
    path('me/tasks/', MentorTasksView.as_view(), name='mentor_tasks'),
    path('me/reviews/', MentorReviewsView.as_view(), name='mentor_reviews'),
    path('reviews/<int:pk>/approve/', MentorReviewApproveView.as_view(), name='mentor_review_approve'),
    path('reviews/<int:pk>/request-changes/', MentorReviewRequestChangesView.as_view(), name='mentor_review_request_changes'),
]
