from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    """Blog Serializer"""
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Blog
        fields = ['id', 'title', 'slug', 'author', 'author_name', 'excerpt', 
                  'content', 'featured_image', 'status', 'tags', 'views', 
                  'published_at', 'created_at', 'updated_at']
        read_only_fields = ['id', 'slug', 'views', 'created_at', 'updated_at']