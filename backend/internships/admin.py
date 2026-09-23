from django.contrib import admin

from .models import Internship


@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'role', 'status', 'start_date', 'end_date')
    list_filter = ('status',)
    search_fields = ('company_name', 'role')
