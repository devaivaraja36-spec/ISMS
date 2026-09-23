from rest_framework import serializers
from tasks.models import Task

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_name = serializers.CharField(source='assigned_to.user.get_full_name', read_only=True)
    assigned_by_name = serializers.CharField(source='assigned_by.user.get_full_name', read_only=True, default='Admin/System')
    project_title = serializers.CharField(source='project.title', read_only=True, default=None)

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'assigned_to', 'assigned_by',
            'assigned_to_name', 'assigned_by_name', 'project', 'project_title',
            'deadline', 'priority', 'status', 'created_at', 'updated_at', 'completed_at'
        ]
        read_only_fields = ['id', 'assigned_by', 'created_at', 'updated_at']
