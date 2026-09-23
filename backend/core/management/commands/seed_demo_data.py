from django.core.management.base import BaseCommand

from seed import seed


class Command(BaseCommand):
    help = 'Seed the development database with deterministic frontend-aligned data.'

    def handle(self, *args, **options):
        seed()
        self.stdout.write(self.style.SUCCESS('Successfully seeded demo data.'))
