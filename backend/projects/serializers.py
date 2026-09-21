from rest_framework import serializers
from projects.models import Project

class ProjectSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    mentor_name = serializers.CharField(source='mentor.user.get_full_name', read_only=True, default=None)

    class Meta:
        model = Project
        fields = [
            'id', 'student', 'mentor', 'student_name', 'mentor_name', 'title',
            'description', 'technology_stack', 'start_date', 'expected_end_date',
            'status', 'progress', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
