from rest_framework import serializers
from .models import Book, Category, Cart, Wishlist

class CategorySerializer(serializers.ModelSerializer):
    book_count = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'book_count', 'created_at']
    def get_book_count(self, obj):
        return obj.books.count()

class BookSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    review_count = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'category', 'category_name', 'isbn', 
                  'description', 'price', 'original_price', 'stock', 'cover_image', 
                  'status', 'review_count', 'created_at']
    def get_review_count(self, obj):
        return obj.reviews.filter(status='approved').count()

class CartSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    book_author = serializers.CharField(source='book.author', read_only=True)
    book_price = serializers.DecimalField(source='book.price', max_digits=10, decimal_places=2, read_only=True)
    book_image = serializers.ImageField(source='book.cover_image', read_only=True, allow_null=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'user', 'book', 'book_title', 'book_author', 'book_price', 
                  'book_image', 'quantity', 'subtotal', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class WishlistSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    book_author = serializers.CharField(source='book.author', read_only=True)
    book_price = serializers.DecimalField(source='book.price', max_digits=10, decimal_places=2, read_only=True)
    book_image = serializers.ImageField(source='book.cover_image', read_only=True, allow_null=True)
    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'book', 'book_title', 'book_author', 'book_price', 'book_image', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']