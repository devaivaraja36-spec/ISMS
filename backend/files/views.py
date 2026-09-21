from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from files.models import Document
from files.serializers import DocumentSerializer

class DocumentListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if hasattr(user, 'student_profile'):
            docs = Document.objects.filter(student=user.student_profile).order_by('-uploaded_at')
        elif hasattr(user, 'mentor_profile'):
            student_ids = user.mentor_profile.assigned_students.values_list('id', flat=True)
            docs = Document.objects.filter(student_id__in=student_ids).order_by('-uploaded_at')
        else:
            docs = Document.objects.all().order_by('-uploaded_at')

        serializer = DocumentSerializer(docs, many=True, context={'request': request})
        return Response({'success': True, 'data': serializer.data})

    def post(self, request):
        if not hasattr(request.user, 'student_profile'):
            return Response({'success': False, 'message': 'Only students can upload documents'}, status=status.HTTP_403_FORBIDDEN)

        file_obj = request.FILES.get('file')
        doc_type = request.data.get('document_type', 'PROJECT_DOC')

        if not file_obj:
            return Response({'success': False, 'message': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        # File size validation (max 10MB)
        if file_obj.size > 10 * 1024 * 1024:
            return Response({'success': False, 'message': 'File size exceeds 10MB limit'}, status=status.HTTP_400_BAD_REQUEST)

        # Extension validation
        allowed_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.zip']
        ext = file_obj.name[file_obj.name.rfind('.'):].lower() if '.' in file_obj.name else ''
        if ext not in allowed_extensions:
            return Response({'success': False, 'message': f'File extension {ext} not allowed'}, status=status.HTTP_400_BAD_REQUEST)

        doc = Document.objects.create(
            student=request.user.student_profile,
            file=file_obj,
            document_type=doc_type,
            status=Document.Status.PENDING
        )

        return Response({'success': True, 'data': DocumentSerializer(doc, context={'request': request}).data}, status=status.HTTP_201_CREATED)
