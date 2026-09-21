from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from notifications.models import Notification

def send_notification(recipient, title, message, notification_type=Notification.Type.SYSTEM_NOTIFICATION, sender=None, related_object_id=None, related_object_type=None):
    # 1. Create DB notification record
    notification = Notification.objects.create(
        recipient=recipient,
        sender=sender,
        notification_type=notification_type,
        title=title,
        message=message,
        related_object_id=str(related_object_id) if related_object_id else None,
        related_object_type=related_object_type
    )

    # 2. Push WebSocket real-time event via Django Channels
    try:
        channel_layer = get_channel_layer()
        if channel_layer:
            async_to_sync(channel_layer.group_send)(
                f"user_{recipient.id}",
                {
                    'type': 'notification_message',
                    'notification': {
                        'id': notification.id,
                        'title': notification.title,
                        'message': notification.message,
                        'notification_type': notification.notification_type,
                        'sender_name': sender.get_full_name() if sender else 'System',
                        'created_at': notification.created_at.isoformat(),
                        'is_read': notification.is_read,
                    }
                }
            )
    except Exception as e:
        # Logging fallback if channels layer is unavailable
        print(f"WebSocket notification push failed: {e}")

    return notification
