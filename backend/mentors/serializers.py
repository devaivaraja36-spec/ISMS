from rest_framework import serializers
from mentors.models import MentorProfile
from accounts.serializers import UserSerializer
from students.models import StudentProfile

class MentorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = MentorProfile
        fields = ['id', 'user', 'employee_id', 'department', 'designation', 'phone', 'specialization', 'created_at']

class AssignedStudentDetailSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    tasks_count = serializers.SerializerMethodField()
    completed_tasks_count = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()

    class Meta:
        model = StudentProfile
        fields = [
            'id', 'register_number', 'name', 'email', 'department', 'year', 'section',
            'company', 'status', 'tasks_count', 'completed_tasks_count', 'progress'
        ]

    def get_tasks_count(self, obj):
        return obj.tasks.count()

    def get_completed_tasks_count(self, obj):
        return obj.tasks.filter(status='COMPLETED').count()

    def get_progress(self, obj):
        tot = obj.tasks.count()
        if tot == 0:
            return 0.0
        comp = obj.tasks.filter(status='COMPLETED').count()
        return round((comp / tot * 100), 1)
