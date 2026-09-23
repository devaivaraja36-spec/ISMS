from rest_framework import serializers
from files.models import Document

class DocumentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = [
            'id', 'student', 'student_name', 'file', 'file_url', 'document_type',
            'uploaded_at', 'status', 'verified_by', 'verified_at'
        ]
        read_only_fields = ['id', 'student', 'uploaded_at', 'status', 'verified_by', 'verified_at']

    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and hasattr(obj.file, 'url'):
            if request:
                return request.build_absolute_uri(obj.file.url)
            return obj.file.url
        return None
