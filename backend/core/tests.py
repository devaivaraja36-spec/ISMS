from django.core.management import call_command
from django.test import TestCase

from accounts.models import User
from mentors.models import MentorProfile
from projects.models import Project
from students.models import StudentProfile


class CoreSmokeTests(TestCase):
    def test_core_app_loads(self):
        self.assertTrue(True)


class DemoSeedDataTests(TestCase):
    def test_seed_demo_data_creates_frontend_aligned_records(self):
        call_command('seed_demo_data')

        self.assertTrue(User.objects.filter(email='admin@interntrack.local').exists())
        self.assertEqual(MentorProfile.objects.count(), 6)
        self.assertEqual(StudentProfile.objects.count(), 6)
        self.assertEqual(Project.objects.count(), 6)
        self.assertTrue(Project.objects.filter(title='InternTrack System').exists())
        self.assertTrue(StudentProfile.objects.filter(register_number='CS-2026-001').exists())
