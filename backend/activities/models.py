from django.db import models
from students.models import StudentProfile
from mentors.models import MentorProfile

class Activity(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        APPROVED = 'APPROVED', 'Approved'
        CHANGES_REQUESTED = 'CHANGES_REQUESTED', 'Changes Requested'

    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='activities')
    date = models.DateField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    hours = models.DecimalField(max_digits=4, decimal_places=1, default=0.0)
    status = models.CharField(max_length=25, choices=Status.choices, default=Status.PENDING)
    mentor_comment = models.TextField(blank=True, default='')
    reviewed_by = models.ForeignKey(MentorProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_activities')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.date} - {self.student}: {self.title}"
