from rest_framework import serializers
from students.models import StudentProfile
from accounts.serializers import UserSerializer
from mentors.models import MentorProfile
from internships.models import Internship

class MentorMiniSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = MentorProfile
        fields = ['id', 'employee_id', 'department', 'designation', 'phone', 'name', 'email']

class InternshipMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = ['id', 'company_name', 'role', 'start_date', 'end_date', 'status']

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    mentor = MentorMiniSerializer(read_only=True)
    internship = InternshipMiniSerializer(read_only=True)

    class Meta:
        model = StudentProfile
        fields = [
            'id', 'user', 'register_number', 'department', 'year', 'section',
            'phone', 'mentor', 'internship', 'company', 'start_date', 'end_date',
            'status', 'created_at'
        ]
