from django.db import models
from django.conf import settings
from mentors.models import MentorProfile
from internships.models import Internship

class StudentProfile(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Active'
        COMPLETED = 'COMPLETED', 'Completed'
        INACTIVE = 'INACTIVE', 'Inactive'

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    register_number = models.CharField(max_length=50, unique=True)
    department = models.CharField(max_length=100)
    year = models.CharField(max_length=20, default='4th Year')
    section = models.CharField(max_length=10, default='A')
    phone = models.CharField(max_length=20, blank=True)
    mentor = models.ForeignKey(MentorProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_students')
    internship = models.ForeignKey(Internship, on_delete=models.SET_NULL, null=True, blank=True, related_name='students')
    company = models.CharField(max_length=200, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.email} ({self.register_number})"
