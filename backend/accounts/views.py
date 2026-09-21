from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.serializers import CustomTokenObtainPairSerializer, UserSerializer
from accounts.models import User

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = UserSerializer(user).data
        if hasattr(user, 'student_profile'):
            profile = user.student_profile
            data['student_profile'] = {
                'id': profile.id,
                'register_number': profile.register_number,
                'department': profile.department,
                'year': profile.year,
                'section': profile.section,
                'company': profile.company,
                'status': profile.status,
                'mentor_name': profile.mentor.user.get_full_name() if profile.mentor else None,
            }
        elif hasattr(user, 'mentor_profile'):
            profile = user.mentor_profile
            data['mentor_profile'] = {
                'id': profile.id,
                'employee_id': profile.employee_id,
                'department': profile.department,
                'designation': profile.designation,
                'specialization': profile.specialization,
            }
        return Response({'success': True, 'data': data})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return Response({'success': True, 'message': 'Logged out successfully.'})
