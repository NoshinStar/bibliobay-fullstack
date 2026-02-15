from rest_framework import serializers
from decimal import Decimal
from .models import Order, OrderItem
from books.models import Cart

class OrderItemSerializer(serializers.ModelSerializer):
    """Order Item Serializer"""
    class Meta:
        model = OrderItem
        fields = ['id', 'book', 'book_title', 'book_author', 'quantity', 'price', 'subtotal']
        read_only_fields = ['id', 'book_title', 'book_author', 'price']

class OrderSerializer(serializers.ModelSerializer):
    """Order Serializer (READING Data)"""
    items = OrderItemSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Order
        # ADDED 'transaction_id' here so the Dashboard can see it
        fields = ['id', 'order_number', 'user', 'user_name', 'user_email', 'status', 
                  'payment_status', 'payment_method', 'subtotal', 'shipping', 'tax', 'total',
                  'shipping_address', 'shipping_city', 'shipping_postal_code', 'shipping_country',
                  'notes', 'items', 'created_at', 'updated_at', 'transaction_id']
        read_only_fields = ['id', 'order_number', 'user', 'subtotal', 'shipping', 'tax', 'total', 'created_at', 'updated_at']

class OrderCreateSerializer(serializers.ModelSerializer):
    """Order Creation Serializer (WRITING Data)"""
    
    class Meta:
        model = Order
        # ADDED 'transaction_id' here so the Frontend can save it
        fields = ['payment_method', 'shipping_address', 'shipping_city', 
                  'shipping_postal_code', 'shipping_country', 'notes', 'transaction_id']
    
    def create(self, validated_data):
        user = self.context['request'].user
        
        # Get cart items
        cart_items = Cart.objects.filter(user=user)
        if not cart_items.exists():
            raise serializers.ValidationError("Cart is empty")
        
        # Calculate totals using Decimal
        subtotal = sum(item.subtotal for item in cart_items)
        shipping = Decimal('5.00')
        tax_rate = Decimal('0.08')
        tax = subtotal * tax_rate
        total = subtotal + shipping + tax
        
        # Create order
        order = Order.objects.create(
            user=user,
            subtotal=subtotal,
            shipping=shipping,
            tax=tax,
            total=total,
            **validated_data
        )
        
        # Create order items and save book info
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                book=cart_item.book,
                book_title=cart_item.book.title,
                book_author=cart_item.book.author,
                quantity=cart_item.quantity,
                price=cart_item.book.price
            )
            
            # Update book stock
            cart_item.book.stock -= cart_item.quantity
            cart_item.book.save()
        
        # Clear cart
        cart_items.delete()
        
        return order