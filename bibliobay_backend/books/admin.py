from django.contrib import admin
from .models import Book, Category, Cart

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Category Admin"""
    list_display = ['name', 'description', 'created_at']
    search_fields = ['name']
    ordering = ['name']


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    """Book Admin"""
    list_display = ['title', 'author', 'category', 'price', 'stock', 'status', 'created_at']
    list_filter = ['category', 'status', 'created_at']
    search_fields = ['title', 'author', 'isbn']
    list_editable = ['price', 'stock', 'status']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'author', 'category', 'isbn', 'description')
        }),
        ('Pricing', {
            'fields': ('price', 'original_price')
        }),
        ('Inventory', {
            'fields': ('stock', 'status')
        }),
        ('Media', {
            'fields': ('cover_image',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    """Cart Admin"""
    list_display = ['user', 'book', 'quantity', 'subtotal', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'book__title']
    readonly_fields = ['subtotal', 'created_at', 'updated_at']
    ordering = ['-created_at']