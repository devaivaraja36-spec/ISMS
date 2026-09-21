from django.contrib import admin

from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'assigned_to', 'assigned_by', 'status', 'priority', 'deadline')
    list_filter = ('status', 'priority')
    search_fields = ('title', 'assigned_to__email')
