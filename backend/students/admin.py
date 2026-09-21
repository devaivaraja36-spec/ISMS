from django.contrib import admin

from .models import StudentProfile


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'register_number', 'department', 'status', 'mentor')
    search_fields = ('register_number', 'department', 'user__email')
    list_filter = ('status', 'department')
