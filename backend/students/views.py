from rest_framework import status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Sum, Count, Q

from accounts.permissions import IsStudentUserRole
from students.models import StudentProfile
from students.serializers import StudentProfileSerializer
from tasks.models import Task
from tasks.serializers import TaskSerializer
from activities.models import Activity
from activities.serializers import ActivitySerializer
from projects.models import Project
from projects.serializers import ProjectSerializer
from notifications.services import send_notification
from notifications.models import Notification

class StudentProfileView(APIView):
    permission_classes = [IsStudentUserRole]

    def get(self, request):
        try:
            profile = request.user.student_profile
            serializer = StudentProfileSerializer(profile)
            return Response({'success': True, 'data': serializer.data})
        except StudentProfile.DoesNotExist:
            return Response({'success': False, 'message': 'Student profile not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        profile = request.user.student_profile
        serializer = StudentProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'data': serializer.data})
        return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class StudentDashboardView(APIView):
    permission_classes = [IsStudentUserRole]

    def get(self, request):
        profile = request.user.student_profile
        tasks = Task.objects.filter(assigned_to=profile)

        total_tasks = tasks.count()
        completed_tasks = tasks.filter(status=Task.Status.COMPLETED).count()
        pending_tasks = tasks.filter(status=Task.Status.PENDING).count()
        in_progress_tasks = tasks.filter(status=Task.Status.IN_PROGRESS).count()
        overdue_tasks = tasks.filter(status=Task.Status.OVERDUE).count()

        # Dynamic progress calculation
        progress_percentage = round((completed_tasks / total_tasks * 100), 1) if total_tasks > 0 else 0.0

        # Hours logged & activities
        activities = Activity.objects.filter(student=profile)
        total_hours = activities.aggregate(Sum('hours'))['hours__sum'] or 0.0
        pending_reviews = activities.filter(status=Activity.Status.PENDING).count()

        # Project
        project = Project.objects.filter(student=profile).first()

        # Recent activities & tasks
        recent_tasks = TaskSerializer(tasks[:5], many=True).data
        recent_activities = ActivitySerializer(activities[:5], many=True).data

        data = {
            'student_info': {
                'id': profile.id,
                'name': request.user.get_full_name() or request.user.email,
                'register_number': profile.register_number,
                'department': profile.department,
                'company': profile.company,
                'status': profile.status,
                'mentor_name': profile.mentor.user.get_full_name() if profile.mentor else 'Not Assigned',
            },
            'stats': {
                'total_tasks': total_tasks,
                'completed_tasks': completed_tasks,
                'pending_tasks': pending_tasks,
                'in_progress_tasks': in_progress_tasks,
                'overdue_tasks': overdue_tasks,
                'progress_percentage': progress_percentage,
                'total_hours': float(total_hours),
                'pending_reviews': pending_reviews,
            },
            'project': ProjectSerializer(project).data if project else None,
            'recent_tasks': recent_tasks,
            'recent_activities': recent_activities,
        }
        return Response({'success': True, 'data': data})

class StudentTasksView(APIView):
    permission_classes = [IsStudentUserRole]

    def get(self, request):
        profile = request.user.student_profile
        tasks = Task.objects.filter(assigned_to=profile).order_by('-created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response({'success': True, 'data': serializer.data})

class StudentTaskDetailView(APIView):
    permission_classes = [IsStudentUserRole]

    def patch(self, request, pk):
        profile = request.user.student_profile
        try:
            task = Task.objects.get(pk=pk, assigned_to=profile)
        except Task.DoesNotExist:
            return Response({'success': False, 'message': 'Task not found or access denied'}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        if new_status in [Task.Status.IN_PROGRESS, Task.Status.COMPLETED, Task.Status.PENDING]:
            task.status = new_status
            if new_status == Task.Status.COMPLETED and not task.completed_at:
                task.completed_at = timezone.now()
            task.save()

            # Auto-update project progress
            if task.project:
                proj_tasks = Task.objects.filter(project=task.project)
                tot = proj_tasks.count()
                comp = proj_tasks.filter(status=Task.Status.COMPLETED).count()
                task.project.progress = round((comp / tot * 100), 1) if tot > 0 else 0.0
                task.project.save()

            # Notify mentor if assigned
            if profile.mentor and profile.mentor.user:
                send_notification(
                    recipient=profile.mentor.user,
                    sender=request.user,
                    notification_type=Notification.Type.TASK_UPDATED,
                    title=f"Task Updated: {task.title}",
                    message=f"Student {request.user.get_full_name()} marked task '{task.title}' as {task.get_status_display()}.",
                    related_object_id=task.id,
                    related_object_type='Task'
                )

            return Response({'success': True, 'data': TaskSerializer(task).data})
        return Response({'success': False, 'message': 'Invalid status update'}, status=status.HTTP_400_BAD_REQUEST)

class StudentActivitiesView(APIView):
    permission_classes = [IsStudentUserRole]

    def get(self, request):
        profile = request.user.student_profile
        activities = Activity.objects.filter(student=profile).order_by('-date', '-created_at')
        serializer = ActivitySerializer(activities, many=True)
        return Response({'success': True, 'data': serializer.data})

    def post(self, request):
        profile = request.user.student_profile
        data = request.data.copy()
        
        serializer = ActivitySerializer(data=data)
        if serializer.is_valid():
            activity = serializer.save(student=profile, status=Activity.Status.PENDING)

            # Send notification to assigned mentor
            if profile.mentor and profile.mentor.user:
                send_notification(
                    recipient=profile.mentor.user,
                    sender=request.user,
                    notification_type=Notification.Type.ACTIVITY_SUBMITTED,
                    title=f"Daily Activity Submitted: {activity.title}",
                    message=f"Student {request.user.get_full_name()} submitted daily activity for {activity.date}.",
                    related_object_id=activity.id,
                    related_object_type='Activity'
                )

            return Response({'success': True, 'data': ActivitySerializer(activity).data}, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class StudentProjectView(APIView):
    permission_classes = [IsStudentUserRole]

    def get(self, request):
        profile = request.user.student_profile
        project = Project.objects.filter(student=profile).first()
        if project:
            return Response({'success': True, 'data': ProjectSerializer(project).data})
        return Response({'success': True, 'data': None, 'message': 'No project assigned yet'})
