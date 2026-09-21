from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from internships.models import Internship
from internships.serializers import InternshipSerializer
from accounts.permissions import IsAdminUserRole

class InternshipListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        internships = Internship.objects.all().order_by('-created_at')
        serializer = InternshipSerializer(internships, many=True)
        return Response({'success': True, 'data': serializer.data})

    def post(self, request):
        if not (request.user.role == 'ADMIN' or request.user.is_staff):
            return Response({'success': False, 'message': 'Admin permission required'}, status=status.HTTP_403_FORBIDDEN)

        serializer = InternshipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
