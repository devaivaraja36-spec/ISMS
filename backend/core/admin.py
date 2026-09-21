from django.contrib import admin

from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'module', 'timestamp')
    search_fields = ('action', 'module', 'details')
    list_filter = ('module', 'timestamp')
