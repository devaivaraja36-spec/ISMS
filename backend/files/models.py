from django.db import models
from django.conf import settings
from students.models import StudentProfile

class Document(models.Model):
    class Type(models.TextChoices):
        RESUME = 'RESUME', 'Resume'
        OFFER_LETTER = 'OFFER_LETTER', 'Offer Letter'
        INTERNSHIP_CERTIFICATE = 'INTERNSHIP_CERTIFICATE', 'Internship Certificate'
        WEEKLY_REPORT = 'WEEKLY_REPORT', 'Weekly Report'
        FINAL_REPORT = 'FINAL_REPORT', 'Final Report'
        PROJECT_DOC = 'PROJECT_DOC', 'Project Documentation'

    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        VERIFIED = 'VERIFIED', 'Verified'
        REJECTED = 'REJECTED', 'Rejected'

    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='documents')
    file = models.FileField(upload_to='documents/')
    document_type = models.CharField(max_length=30, choices=Type.choices)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    verified_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_documents')
    verified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.get_document_type_display()} - {self.student}"
