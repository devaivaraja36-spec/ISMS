from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg
from django.db import transaction

from accounts.permissions import IsAdminUserRole
from accounts.models import User
from accounts.serializers import UserSerializer
from students.models import StudentProfile
from students.serializers import StudentProfileSerializer
from mentors.models import MentorProfile
from mentors.serializers import MentorProfileSerializer
from internships.models import Internship
from internships.serializers import InternshipSerializer
from tasks.models import Task
from activities.models import Activity
from core.models import AuditLog

class AdminDashboardView(APIView):
    permission_classes = [IsAdminUserRole]

    def get(self, request):
        total_students = StudentProfile.objects.count()
        active_students = StudentProfile.objects.filter(status=StudentProfile.Status.ACTIVE).count()
        total_mentors = MentorProfile.objects.count()
        total_internships = Internship.objects.count()
        active_internships = Internship.objects.filter(status=Internship.Status.ACTIVE).count()

        total_tasks = Task.objects.count()
        completed_tasks = Task.objects.filter(status=Task.Status.COMPLETED).count()
        completion_rate = round((completed_tasks / total_tasks * 100), 1) if total_tasks > 0 else 0.0

        pending_activities = Activity.objects.filter(status=Activity.Status.PENDING).count()

        recent_audit_logs = AuditLog.objects.select_related('user')[:10]
        audit_data = [
            {
                'id': log.id,
                'user': log.user.get_full_name() if log.user else 'System',
                'action': log.action,
                'module': log.module,
                'details': log.details,
                'timestamp': log.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            }
            for log in recent_audit_logs
        ]

        data = {
            'stats': {
                'total_students': total_students,
                'active_students': active_students,
                'total_mentors': total_mentors,
                'total_internships': total_internships,
                'active_internships': active_internships,
                'total_tasks': total_tasks,
                'completed_tasks': completed_tasks,
                'completion_rate': completion_rate,
                'pending_activities': pending_activities,
            },
            'recent_audit_logs': audit_data,
        }
        return Response({'success': True, 'data': data})

class AdminStudentsView(APIView):
    permission_classes = [IsAdminUserRole]

    def get(self, request):
        students = StudentProfile.objects.select_related('user', 'mentor__user', 'internship').order_by('-created_at')
        serializer = StudentProfileSerializer(students, many=True)
        return Response({'success': True, 'data': serializer.data})

    @transaction.atomic
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password', 'Student@123')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        register_number = request.data.get('register_number')
        department = request.data.get('department', 'Computer Science')
        year = request.data.get('year', '4th Year')
        section = request.data.get('section', 'A')
        mentor_id = request.data.get('mentor_id')
        internship_id = request.data.get('internship_id')
        company = request.data.get('company', '')

        if not email or not register_number:
            return Response({'success': False, 'message': 'Email and Register Number are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'success': False, 'message': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            role=User.Role.STUDENT,
            phone=request.data.get('phone', '')
        )

        mentor = MentorProfile.objects.filter(id=mentor_id).first() if mentor_id else None
        internship = Internship.objects.filter(id=internship_id).first() if internship_id else None

        profile = StudentProfile.objects.create(
            user=user,
            register_number=register_number,
            department=department,
            year=year,
            section=section,
            phone=request.data.get('phone', ''),
            mentor=mentor,
            internship=internship,
            company=company or (internship.company_name if internship else ''),
            status=StudentProfile.Status.ACTIVE
        )

        AuditLog.objects.create(
            user=request.user,
            action='CREATE_STUDENT',
            module='Admin',
            object_id=str(profile.id),
            details={'email': email, 'register_number': register_number}
        )

        return Response({'success': True, 'data': StudentProfileSerializer(profile).data}, status=status.HTTP_201_CREATED)

class AdminMentorsView(APIView):
    permission_classes = [IsAdminUserRole]

    def get(self, request):
        mentors = MentorProfile.objects.select_related('user').order_by('-created_at')
        serializer = MentorProfileSerializer(mentors, many=True)
        return Response({'success': True, 'data': serializer.data})

    @transaction.atomic
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password', 'Mentor@123')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        employee_id = request.data.get('employee_id')
        department = request.data.get('department', 'Computer Science')
        designation = request.data.get('designation', 'Assistant Professor')
        specialization = request.data.get('specialization', 'Software Engineering')

        if not email or not employee_id:
            return Response({'success': False, 'message': 'Email and Employee ID are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'success': False, 'message': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            role=User.Role.MENTOR,
            phone=request.data.get('phone', '')
        )

        profile = MentorProfile.objects.create(
            user=user,
            employee_id=employee_id,
            department=department,
            designation=designation,
            phone=request.data.get('phone', ''),
            specialization=specialization
        )

        AuditLog.objects.create(
            user=request.user,
            action='CREATE_MENTOR',
            module='Admin',
            object_id=str(profile.id),
            details={'email': email, 'employee_id': employee_id}
        )

        return Response({'success': True, 'data': MentorProfileSerializer(profile).data}, status=status.HTTP_201_CREATED)

class AdminReportsView(APIView):
    permission_classes = [IsAdminUserRole]

    def get(self, request):
        student_reports = []
        for student in StudentProfile.objects.select_related('user', 'mentor__user'):
            tot_tasks = student.tasks.count()
            comp_tasks = student.tasks.filter(status=Task.Status.COMPLETED).count()
            prog = round((comp_tasks / tot_tasks * 100), 1) if tot_tasks > 0 else 0.0
            hours = Activity.objects.filter(student=student).aggregate(Sum('hours'))['hours__sum'] or 0.0

            student_reports.append({
                'id': student.id,
                'name': student.user.get_full_name(),
                'register_number': student.register_number,
                'department': student.department,
                'company': student.company or 'N/A',
                'mentor': student.mentor.user.get_full_name() if student.mentor else 'Unassigned',
                'tasks_completed': comp_tasks,
                'total_tasks': tot_tasks,
                'progress': prog,
                'hours_logged': float(hours),
                'status': student.status,
            })

        return Response({'success': True, 'data': student_reports})

class AdminAuditLogsView(APIView):
    permission_classes = [IsAdminUserRole]

    def get(self, request):
        logs = AuditLog.objects.select_related('user')[:50]
        data = [
            {
                'id': log.id,
                'user': log.user.get_full_name() if log.user else 'System',
                'action': log.action,
                'module': log.module,
                'object_id': log.object_id,
                'details': log.details,
                'timestamp': log.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            }
            for log in logs
        ]
        return Response({'success': True, 'data': data})
