from rest_framework import serializers
from internships.models import Internship

class InternshipSerializer(serializers.ModelSerializer):
    student_count = serializers.SerializerMethodField()

    class Meta:
        model = Internship
        fields = [
            'id', 'company_name', 'company_address', 'role', 'description',
            'start_date', 'end_date', 'status', 'student_count', 'created_at'
        ]

    def get_student_count(self, obj):
        return obj.students.count()
