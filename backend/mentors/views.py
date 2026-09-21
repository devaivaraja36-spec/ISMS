from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Sum, Avg

from accounts.permissions import IsMentorUserRole
from mentors.models import MentorProfile
from mentors.serializers import MentorProfileSerializer, AssignedStudentDetailSerializer
from students.models import StudentProfile
from tasks.models import Task
from tasks.serializers import TaskSerializer
from activities.models import Activity
from activities.serializers import ActivitySerializer
from notifications.services import send_notification
from notifications.models import Notification
from core.models import AuditLog

class MentorProfileView(APIView):
    permission_classes = [IsMentorUserRole]

    def get(self, request):
        try:
            profile = request.user.mentor_profile
            serializer = MentorProfileSerializer(profile)
            return Response({'success': True, 'data': serializer.data})
        except MentorProfile.DoesNotExist:
            return Response({'success': False, 'message': 'Mentor profile not found'}, status=status.HTTP_404_NOT_FOUND)

class MentorDashboardView(APIView):
    permission_classes = [IsMentorUserRole]

    def get(self, request):
        mentor = request.user.mentor_profile
        assigned_students = StudentProfile.objects.filter(mentor=mentor)
        total_students = assigned_students.count()

        student_ids = assigned_students.values_list('id', flat=True)
        assigned_tasks = Task.objects.filter(assigned_to_id__in=student_ids)

        total_tasks = assigned_tasks.count()
        completed_tasks = assigned_tasks.filter(status=Task.Status.COMPLETED).count()

        pending_reviews = Activity.objects.filter(student_id__in=student_ids, status=Activity.Status.PENDING).count()

        # Calculate average progress of assigned students
        student_progresses = []
        for st in assigned_students:
            st_tasks = st.tasks.count()
            if st_tasks > 0:
                comp = st.tasks.filter(status=Task.Status.COMPLETED).count()
                student_progresses.append(comp / st_tasks * 100)
            else:
                student_progresses.append(0.0)

        avg_progress = round(sum(student_progresses) / len(student_progresses), 1) if student_progresses else 0.0

        # Recent activities needing review
        recent_pending_reviews = ActivitySerializer(
            Activity.objects.filter(student_id__in=student_ids, status=Activity.Status.PENDING)[:5],
            many=True
        ).data

        # Recent students
        recent_students = AssignedStudentDetailSerializer(assigned_students[:5], many=True).data

        data = {
            'mentor_info': MentorProfileSerializer(mentor).data,
            'stats': {
                'total_students': total_students,
                'completed_tasks': completed_tasks,
                'pending_reviews': pending_reviews,
                'average_progress': avg_progress,
            },
            'assigned_students': recent_students,
            'pending_reviews_list': recent_pending_reviews,
        }
        return Response({'success': True, 'data': data})

class MentorStudentsView(APIView):
    permission_classes = [IsMentorUserRole]

    def get(self, request):
        mentor = request.user.mentor_profile
        students = StudentProfile.objects.filter(mentor=mentor).order_by('user__first_name')
        serializer = AssignedStudentDetailSerializer(students, many=True)
        return Response({'success': True, 'data': serializer.data})

class MentorTasksView(APIView):
    permission_classes = [IsMentorUserRole]

    def get(self, request):
        mentor = request.user.mentor_profile
        tasks = Task.objects.filter(assigned_by=mentor).order_by('-created_at')
        serializer = TaskSerializer(tasks, many=True)
        return Response({'success': True, 'data': serializer.data})

    def post(self, request):
        mentor = request.user.mentor_profile
        assigned_to_id = request.data.get('assigned_to')
        try:
            student = StudentProfile.objects.get(id=assigned_to_id, mentor=mentor)
        except StudentProfile.DoesNotExist:
            return Response(
                {'success': False, 'message': 'Student not found or not assigned to you'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save(assigned_by=mentor, assigned_to=student, status=Task.Status.PENDING)

            # Audit log
            AuditLog.objects.create(
                user=request.user,
                action='CREATE_TASK',
                module='Tasks',
                object_id=str(task.id),
                details={'title': task.title, 'assigned_to': student.register_number}
            )

            # Notification via WebSockets & DB
            send_notification(
                recipient=student.user,
                sender=request.user,
                notification_type=Notification.Type.TASK_ASSIGNED,
                title=f"New Task Assigned: {task.title}",
                message=f"Mentor {request.user.get_full_name()} assigned you a new task: '{task.title}'. Deadline: {task.deadline.strftime('%Y-%m-%d') if task.deadline else 'N/A'}.",
                related_object_id=task.id,
                related_object_type='Task'
            )

            return Response({'success': True, 'data': TaskSerializer(task).data}, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class MentorReviewsView(APIView):
    permission_classes = [IsMentorUserRole]

    def get(self, request):
        mentor = request.user.mentor_profile
        student_ids = StudentProfile.objects.filter(mentor=mentor).values_list('id', flat=True)
        activities = Activity.objects.filter(student_id__in=student_ids).order_by('-created_at')
        serializer = ActivitySerializer(activities, many=True)
        return Response({'success': True, 'data': serializer.data})

class MentorReviewApproveView(APIView):
    permission_classes = [IsMentorUserRole]

    def post(self, request, pk):
        mentor = request.user.mentor_profile
        student_ids = StudentProfile.objects.filter(mentor=mentor).values_list('id', flat=True)
        try:
            activity = Activity.objects.get(pk=pk, student_id__in=student_ids)
        except Activity.DoesNotExist:
            return Response({'success': False, 'message': 'Activity review not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)

        comment = request.data.get('comment', '')
        activity.status = Activity.Status.APPROVED
        activity.mentor_comment = comment
        activity.reviewed_by = mentor
        activity.reviewed_at = timezone.now()
        activity.save()

        # Audit log
        AuditLog.objects.create(
            user=request.user,
            action='APPROVE_ACTIVITY',
            module='Activities',
            object_id=str(activity.id),
            details={'student': activity.student.register_number, 'date': str(activity.date)}
        )

        # Send real-time Notification
        send_notification(
            recipient=activity.student.user,
            sender=request.user,
            notification_type=Notification.Type.ACTIVITY_APPROVED,
            title="Daily Activity Approved",
            message=f"Your activity for {activity.date} has been approved by your mentor.",
            related_object_id=activity.id,
            related_object_type='Activity'
        )

        return Response({'success': True, 'data': ActivitySerializer(activity).data})

class MentorReviewRequestChangesView(APIView):
    permission_classes = [IsMentorUserRole]

    def post(self, request, pk):
        mentor = request.user.mentor_profile
        student_ids = StudentProfile.objects.filter(mentor=mentor).values_list('id', flat=True)
        try:
            activity = Activity.objects.get(pk=pk, student_id__in=student_ids)
        except Activity.DoesNotExist:
            return Response({'success': False, 'message': 'Activity review not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)

        comment = request.data.get('comment', 'Changes requested by mentor.')
        activity.status = Activity.Status.CHANGES_REQUESTED
        activity.mentor_comment = comment
        activity.reviewed_by = mentor
        activity.reviewed_at = timezone.now()
        activity.save()

        # Audit log
        AuditLog.objects.create(
            user=request.user,
            action='REQUEST_ACTIVITY_CHANGES',
            module='Activities',
            object_id=str(activity.id),
            details={'student': activity.student.register_number, 'comment': comment}
        )

        # Send real-time Notification
        send_notification(
            recipient=activity.student.user,
            sender=request.user,
            notification_type=Notification.Type.ACTIVITY_CHANGES_REQUESTED,
            title="Activity Changes Requested",
            message=f"Mentor requested changes for {activity.date}: {comment}",
            related_object_id=activity.id,
            related_object_type='Activity'
        )

        return Response({'success': True, 'data': ActivitySerializer(activity).data})
