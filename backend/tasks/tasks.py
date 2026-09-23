from celery import shared_task
from django.utils import timezone
from datetime import timedelta
# pyrefly: ignore [missing-import]
from tasks.models import Task
from notifications.services import send_notification
from notifications.models import Notification

@shared_task
def check_upcoming_deadlines():
    now = timezone.now()
    tomorrow = now + timedelta(days=1)

    # 1. Mark overdue tasks
    overdue_tasks = Task.objects.filter(
        deadline__lt=now,
        status__in=[Task.Status.PENDING, Task.Status.IN_PROGRESS]
    )
    for task in overdue_tasks:
        task.status = Task.Status.OVERDUE
        task.save()

        send_notification(
            recipient=task.assigned_to.user,
            notification_type=Notification.Type.DEADLINE_REMINDER,
            title=f"Task Overdue: {task.title}",
            message=f"The deadline for task '{task.title}' has passed.",
            related_object_id=task.id,
            related_object_type='Task'
        )

    # 2. Send 24h deadline reminder
    upcoming_tasks = Task.objects.filter(
        deadline__range=(now, tomorrow),
        status__in=[Task.Status.PENDING, Task.Status.IN_PROGRESS]
    )
    for task in upcoming_tasks:
        send_notification(
            recipient=task.assigned_to.user,
            notification_type=Notification.Type.DEADLINE_REMINDER,
            title=f"Deadline Approaching: {task.title}",
            message=f"Task '{task.title}' is due within 24 hours.",
            related_object_id=task.id,
            related_object_type='Task'
        )
