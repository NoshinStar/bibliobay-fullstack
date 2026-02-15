from django.contrib import admin
from .models import Blog

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    """Blog Admin"""
    list_display = ['title', 'author', 'status', 'views', 'published_at', 'created_at']
    list_filter = ['status', 'published_at', 'created_at']
    search_fields = ['title', 'content', 'tags']
    list_editable = ['status']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['views', 'created_at', 'updated_at']
    ordering = ['-published_at', '-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'author', 'excerpt', 'content')
        }),
        ('Publishing', {
            'fields': ('status', 'published_at', 'tags')
        }),
        ('Media', {
            'fields': ('featured_image',)
        }),
        ('Statistics', {
            'fields': ('views',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['publish_blogs', 'unpublish_blogs']
    
    def publish_blogs(self, request, queryset):
        """Bulk publish blogs"""
        from django.utils import timezone
        queryset.update(status='published', published_at=timezone.now())
        self.message_user(request, f"{queryset.count()} blogs published.")
    publish_blogs.short_description = "Publish selected blogs"
    
    def unpublish_blogs(self, request, queryset):
        """Bulk unpublish blogs"""
        queryset.update(status='draft')
        self.message_user(request, f"{queryset.count()} blogs unpublished.")
    unpublish_blogs.short_description = "Unpublish selected blogs"