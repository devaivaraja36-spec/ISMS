import os
from datetime import date, timedelta

import django
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User
from activities.models import Activity
from internships.models import Internship
from mentors.models import MentorProfile
from notifications.models import Notification
from projects.models import Project
from students.models import StudentProfile
from tasks.models import Task


def clear_seed_data():
    Notification.objects.all().delete()
    Activity.objects.all().delete()
    Task.objects.all().delete()
    Project.objects.all().delete()
    StudentProfile.objects.all().delete()
    MentorProfile.objects.all().delete()
    Internship.objects.all().delete()
    User.objects.all().delete()


def seed():
    clear_seed_data()

    admin_user, _ = User.objects.get_or_create(
        email='admin@interntrack.local',
        defaults={
            'username': 'admin',
            'first_name': 'System',
            'last_name': 'Administrator',
            'role': User.Role.ADMIN,
            'phone': '+91 98765 43210',
        },
    )
    admin_user.username = 'admin'
    admin_user.first_name = 'System'
    admin_user.last_name = 'Administrator'
    admin_user.role = User.Role.ADMIN
    admin_user.phone = '+91 98765 43210'
    admin_user.set_password('1234')
    admin_user.save()

    mentors = [
        {
            'name': 'Dr. Priya Sharma',
            'username': 'mentor1',
            'email': 'priya@example.com',
            'employee_id': 'MNT-001',
            'department': 'Computer Science',
            'designation': 'Associate Professor',
            'specialization': 'AI & Web Systems',
        },
        {
            'name': 'Dr. Manoj Kumar',
            'username': 'manoj01',
            'email': 'manoj@example.com',
            'employee_id': 'MNT-002',
            'department': 'Information Technology',
            'designation': 'Assistant Professor',
            'specialization': 'Machine Learning',
        },
        {
            'name': 'Dr. Anitha',
            'username': 'anitha01',
            'email': 'anitha@example.com',
            'employee_id': 'MNT-003',
            'department': 'Computer Science',
            'designation': 'Senior Mentor',
            'specialization': 'Full-Stack Engineering',
        },
        {
            'name': 'Dr. Rajesh',
            'username': 'rajesh01',
            'email': 'rajesh@example.com',
            'employee_id': 'MNT-004',
            'department': 'Cloud Computing',
            'designation': 'Professor',
            'specialization': 'Cloud & DevOps',
        },
        {
            'name': 'Dr. Meena',
            'username': 'meena01',
            'email': 'meena@example.com',
            'employee_id': 'MNT-005',
            'department': 'Data Science',
            'designation': 'Professor',
            'specialization': 'Data Analytics',
        },
        {
            'name': 'Dr. Karthik',
            'username': 'karthik01',
            'email': 'karthik@example.com',
            'employee_id': 'MNT-006',
            'department': 'Computer Science',
            'designation': 'Associate Professor',
            'specialization': 'Mobile Application Development',
        },
    ]

    mentor_profiles = {}
    for mentor in mentors:
        mentor_user, _ = User.objects.get_or_create(
            email=mentor['email'],
            defaults={
                'username': mentor['username'],
                'first_name': mentor['name'].split()[0],
                'last_name': ' '.join(mentor['name'].split()[1:]),
                'role': User.Role.MENTOR,
                'phone': '+91 90000 00000',
            },
        )
        mentor_user.username = mentor['username']
        mentor_user.first_name = mentor['name'].split()[0]
        mentor_user.last_name = ' '.join(mentor['name'].split()[1:])
        mentor_user.role = User.Role.MENTOR
        mentor_user.phone = '+91 90000 00000'
        mentor_user.set_password('1234')
        mentor_user.save()

        profile, _ = MentorProfile.objects.update_or_create(
            user=mentor_user,
            defaults={
                'employee_id': mentor['employee_id'],
                'department': mentor['department'],
                'designation': mentor['designation'],
                'phone': '+91 90000 00000',
                'specialization': mentor['specialization'],
            },
        )
        mentor_profiles[mentor['name']] = profile

    internship_data = [
        {'company_name': 'InternTrack Labs', 'role': 'InternTrack System', 'status': Internship.Status.ACTIVE, 'start_date': date(2026, 1, 10), 'end_date': date(2026, 6, 30)},
        {'company_name': 'Insight Analytics', 'role': 'AI Analytics', 'status': Internship.Status.ACTIVE, 'start_date': date(2026, 2, 15), 'end_date': date(2026, 8, 15)},
        {'company_name': 'PixelForge Studio', 'role': 'Web Development', 'status': Internship.Status.COMPLETED, 'start_date': date(2026, 1, 5), 'end_date': date(2026, 5, 31)},
        {'company_name': 'CloudNest Labs', 'role': 'Cloud Computing', 'status': Internship.Status.ACTIVE, 'start_date': date(2026, 3, 1), 'end_date': date(2026, 9, 30)},
        {'company_name': 'DataVision Labs', 'role': 'Data Science', 'status': Internship.Status.ACTIVE, 'start_date': date(2026, 2, 10), 'end_date': date(2026, 8, 10)},
        {'company_name': 'AppSphere', 'role': 'Mobile Application', 'status': Internship.Status.COMPLETED, 'start_date': date(2026, 1, 5), 'end_date': date(2026, 6, 5)},
    ]

    internship_map = {}
    for item in internship_data:
        internship, _ = Internship.objects.update_or_create(
            company_name=item['company_name'],
            role=item['role'],
            defaults={
                'company_address': f'{item["company_name"]} Campus, Bengaluru',
                'description': f'{item["role"]} internship project.',
                'start_date': item['start_date'],
                'end_date': item['end_date'],
                'status': item['status'],
                'created_by': admin_user,
            },
        )
        internship_map[item['role']] = internship

    students = [
        {
            'name': 'Arun Kumar',
            'username': 'student1',
            'email': 'arun@example.com',
            'register_number': 'CS-2026-001',
            'department': 'Computer Science',
            'year': '4th Year',
            'section': 'A',
            'mentor_name': 'Dr. Priya Sharma',
            'project_title': 'InternTrack System',
            'status': StudentProfile.Status.ACTIVE,
            'company': 'InternTrack Labs',
            'progress': 75,
        },
        {
            'name': 'Rahul Kumar',
            'username': 'rahul01',
            'email': 'rahul@example.com',
            'register_number': 'IT-2026-021',
            'department': 'Information Technology',
            'year': '4th Year',
            'section': 'B',
            'mentor_name': 'Dr. Manoj Kumar',
            'project_title': 'AI Analytics',
            'status': StudentProfile.Status.ACTIVE,
            'company': 'Insight Analytics',
            'progress': 48,
        },
        {
            'name': 'Sneha Patel',
            'username': 'sneha01',
            'email': 'sneha@example.com',
            'register_number': 'CS-2026-045',
            'department': 'Computer Science',
            'year': '3rd Year',
            'section': 'A',
            'mentor_name': 'Dr. Anitha',
            'project_title': 'Web Development',
            'status': StudentProfile.Status.ACTIVE,
            'company': 'PixelForge Studio',
            'progress': 91,
        },
        {
            'name': 'Vikram Singh',
            'username': 'vikram01',
            'email': 'vikram@example.com',
            'register_number': 'CC-2026-011',
            'department': 'Cloud Computing',
            'year': '4th Year',
            'section': 'C',
            'mentor_name': 'Dr. Rajesh',
            'project_title': 'Cloud Computing',
            'status': StudentProfile.Status.ACTIVE,
            'company': 'CloudNest Labs',
            'progress': 63,
        },
        {
            'name': 'Priya Nair',
            'username': 'priya01',
            'email': 'priya.nair@example.com',
            'register_number': 'DS-2026-030',
            'department': 'Data Science',
            'year': '3rd Year',
            'section': 'B',
            'mentor_name': 'Dr. Meena',
            'project_title': 'Data Science',
            'status': StudentProfile.Status.ACTIVE,
            'company': 'DataVision Labs',
            'progress': 35,
        },
        {
            'name': 'Aditya Sharma',
            'username': 'aditya01',
            'email': 'aditya@example.com',
            'register_number': 'CS-2026-076',
            'department': 'Computer Science',
            'year': '4th Year',
            'section': 'D',
            'mentor_name': 'Dr. Karthik',
            'project_title': 'Mobile Application',
            'status': StudentProfile.Status.COMPLETED,
            'company': 'AppSphere',
            'progress': 82,
        },
    ]

    student_profiles = {}
    for student in students:
        student_user, _ = User.objects.get_or_create(
            email=student['email'],
            defaults={
                'username': student['username'],
                'first_name': student['name'].split()[0],
                'last_name': ' '.join(student['name'].split()[1:]),
                'role': User.Role.STUDENT,
                'phone': '+91 90000 11111',
            },
        )
        student_user.username = student['username']
        student_user.first_name = student['name'].split()[0]
        student_user.last_name = ' '.join(student['name'].split()[1:])
        student_user.role = User.Role.STUDENT
        student_user.phone = '+91 90000 11111'
        student_user.set_password('1234')
        student_user.save()

        profile, _ = StudentProfile.objects.update_or_create(
            user=student_user,
            defaults={
                'register_number': student['register_number'],
                'department': student['department'],
                'year': student['year'],
                'section': student['section'],
                'phone': '+91 90000 11111',
                'mentor': mentor_profiles[student['mentor_name']],
                'internship': internship_map[student['project_title']],
                'company': student['company'],
                'start_date': internship_map[student['project_title']].start_date,
                'end_date': internship_map[student['project_title']].end_date,
                'status': student['status'],
            },
        )
        profile.mentor = mentor_profiles[student['mentor_name']]
        profile.internship = internship_map[student['project_title']]
        profile.company = student['company']
        profile.start_date = internship_map[student['project_title']].start_date
        profile.end_date = internship_map[student['project_title']].end_date
        profile.status = student['status']
        profile.save()
        student_profiles[student['project_title']] = profile

    for student in students:
        profile = student_profiles[student['project_title']]
        mentor_profile = mentor_profiles[student['mentor_name']]
        project, _ = Project.objects.update_or_create(
            student=profile,
            defaults={
                'mentor': mentor_profile,
                'title': student['project_title'],
                'description': f'{student["project_title"]} internship project tracking and review workflow.',
                'technology_stack': 'React, Django, PostgreSQL, Redis',
                'start_date': profile.start_date,
                'expected_end_date': profile.end_date,
                'status': Project.Status.IN_PROGRESS if student['progress'] < 100 else Project.Status.COMPLETED,
                'progress': student['progress'],
            },
        )
        if student['progress'] >= 80:
            project.status = Project.Status.COMPLETED if student['project_title'] in {'Web Development', 'Mobile Application'} else Project.Status.IN_PROGRESS
        project.mentor = mentor_profile
        project.description = f'{student["project_title"]} internship project tracking and review workflow.'
        project.technology_stack = 'React, Django, PostgreSQL, Redis'
        project.start_date = profile.start_date
        project.expected_end_date = profile.end_date
        project.progress = student['progress']
        project.save()

        base_deadline = timezone.now() + timedelta(days=5)
        task_seed = [
            ('Requirements Analysis', 'Gather requirements and finalize sprint backlog.', Task.Status.COMPLETED if student['project_title'] in {'InternTrack System', 'Web Development'} else Task.Status.IN_PROGRESS, Task.Priority.HIGH),
            ('Sprint Implementation', 'Complete milestone implementation with validation.', Task.Status.IN_PROGRESS if student['project_title'] in {'AI Analytics', 'Cloud Computing', 'Data Science'} else Task.Status.COMPLETED, Task.Priority.HIGH),
            ('Testing and QA', 'Validate features and resolve review feedback.', Task.Status.PENDING if student['project_title'] in {'Data Science', 'AI Analytics'} else Task.Status.COMPLETED, Task.Priority.MEDIUM),
            ('Documentation', 'Finalize technical documentation and daily summary notes.', Task.Status.PENDING if student['project_title'] == 'Cloud Computing' else Task.Status.COMPLETED, Task.Priority.LOW),
        ]

        for index, (title, description, status_value, priority) in enumerate(task_seed, start=1):
            task, _ = Task.objects.update_or_create(
                assigned_to=profile,
                title=title,
                defaults={
                    'description': description,
                    'assigned_by': mentor_profile,
                    'project': project,
                    'deadline': base_deadline + timedelta(days=index * 2),
                    'priority': priority,
                    'status': status_value,
                    'completed_at': timezone.now() if status_value == Task.Status.COMPLETED else None,
                },
            )
            if status_value == Task.Status.COMPLETED and not task.completed_at:
                task.completed_at = timezone.now()
                task.save()

        activity_dates = [date(2026, 9, 15), date(2026, 9, 16), date(2026, 9, 17)]
        for idx, activity_date in enumerate(activity_dates, start=1):
            Activity.objects.update_or_create(
                student=profile,
                date=activity_date,
                title=f'{student["project_title"]} Progress Update {idx}',
                defaults={
                    'description': f'{student["project_title"]} progress update covering status, blockers, and next actions.',
                    'hours': 2.5 + idx,
                    'status': Activity.Status.APPROVED if idx % 2 else Activity.Status.PENDING,
                    'mentor_comment': 'Looks good so far.' if idx % 2 else '',
                    'reviewed_by': mentor_profile,
                    'reviewed_at': timezone.now() if idx % 2 else None,
                },
            )

        Notification.objects.get_or_create(
            recipient=student_user,
            sender=admin_user,
            notification_type=Notification.Type.SYSTEM_NOTIFICATION,
            title='Welcome to InternTrack',
            defaults={'message': f'Your internship dashboard has been seeded with project data for {student["project_title"]}.'},
        )

    print(f'Seeded {MentorProfile.objects.count()} mentors, {StudentProfile.objects.count()} students, {Project.objects.count()} projects, and related task/activity data for the demo dashboard.')


if __name__ == '__main__':
    seed()
