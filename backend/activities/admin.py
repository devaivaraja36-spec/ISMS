from django.contrib import admin

from .models import Activity


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('student', 'date', 'title', 'status', 'reviewed_by')
    list_filter = ('status', 'date')
    search_fields = ('title', 'student__email')
