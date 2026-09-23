from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'student', 'mentor', 'status', 'progress')
    list_filter = ('status',)
    search_fields = ('title', 'student__user__email')
