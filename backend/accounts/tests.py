from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from accounts.models import User
from students.models import StudentProfile
from mentors.models import MentorProfile

class AuthenticationSecurityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student_user = User.objects.create_user(
            email='student_test@example.com',
            password='TestPassword123',
            role=User.Role.STUDENT,
            first_name='Student',
            last_name='Test'
        )
        self.student_profile = StudentProfile.objects.create(
            user=self.student_user,
            register_number='TEST001',
            department='CSE'
        )

        self.mentor_user = User.objects.create_user(
            email='mentor_test@example.com',
            password='TestPassword123',
            role=User.Role.MENTOR,
            first_name='Mentor',
            last_name='Test'
        )
        self.mentor_profile = MentorProfile.objects.create(
            user=self.mentor_user,
            employee_id='MNT001',
            department='CSE'
        )

    def test_login_success_returns_jwt(self):
        url = reverse('token_obtain_pair')
        response = self.client.post(url, {'email': 'student_test@example.com', 'password': 'TestPassword123'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['role'], 'STUDENT')

    def test_student_cannot_access_mentor_dashboard(self):
        self.client.force_authenticate(user=self.student_user)
        url = reverse('mentor_dashboard')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_student_cannot_access_admin_dashboard(self):
        self.client.force_authenticate(user=self.student_user)
        url = reverse('admin_dashboard')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_request_rejected(self):
        url = reverse('student_dashboard')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
