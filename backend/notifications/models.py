from django.db import models
from django.conf import settings

class Notification(models.Model):
    class Type(models.TextChoices):
        TASK_ASSIGNED = 'TASK_ASSIGNED', 'Task Assigned'
        TASK_UPDATED = 'TASK_UPDATED', 'Task Updated'
        ACTIVITY_SUBMITTED = 'ACTIVITY_SUBMITTED', 'Activity Submitted'
        ACTIVITY_APPROVED = 'ACTIVITY_APPROVED', 'Activity Approved'
        ACTIVITY_CHANGES_REQUESTED = 'ACTIVITY_CHANGES_REQUESTED', 'Activity Changes Requested'
        DEADLINE_REMINDER = 'DEADLINE_REMINDER', 'Deadline Reminder'
        PROJECT_UPDATED = 'PROJECT_UPDATED', 'Project Updated'
        SYSTEM_NOTIFICATION = 'SYSTEM_NOTIFICATION', 'System Notification'

    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='sent_notifications')
    notification_type = models.CharField(max_length=35, choices=Type.choices, default=Type.SYSTEM_NOTIFICATION)
    title = models.CharField(max_length=200)
    message = models.TextField()
    related_object_id = models.CharField(max_length=100, blank=True, null=True)
    related_object_type = models.CharField(max_length=100, blank=True, null=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.notification_type} -> {self.recipient}: {self.title}"
