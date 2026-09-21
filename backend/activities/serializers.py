from rest_framework import serializers
from activities.models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    register_number = serializers.CharField(source='student.register_number', read_only=True)
    reviewer_name = serializers.CharField(source='reviewed_by.user.get_full_name', read_only=True, default=None)

    class Meta:
        model = Activity
        fields = [
            'id', 'student', 'student_name', 'register_number', 'date', 'title',
            'description', 'hours', 'status', 'mentor_comment', 'reviewed_by',
            'reviewer_name', 'reviewed_at', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'student', 'status', 'mentor_comment', 'reviewed_by', 'reviewed_at', 'created_at', 'updated_at']
