from django.contrib import admin

from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('student', 'document_type', 'status', 'uploaded_at')
    list_filter = ('document_type', 'status')
    search_fields = ('student__email', 'document_type')
