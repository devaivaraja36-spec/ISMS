from rest_framework import serializers
from notifications.models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.get_full_name', read_only=True, default='System')

    class Meta:
        model = Notification
        fields = [
            'id', 'recipient', 'sender', 'sender_name', 'notification_type',
            'title', 'message', 'related_object_id', 'related_object_type',
            'is_read', 'created_at', 'read_at'
        ]
        read_only_fields = ['id', 'recipient', 'sender', 'created_at']
