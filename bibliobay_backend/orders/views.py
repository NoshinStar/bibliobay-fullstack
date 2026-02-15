from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderCreateSerializer

class OrderViewSet(viewsets.ModelViewSet):
    """Order CRUD operations"""
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            queryset = Order.objects.all()
        else:
            queryset = Order.objects.filter(user=user)
        
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset.order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer
    
    # --- THIS IS THE FIX ---
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        
        # FIX: Return simple data instead of using OrderSerializer immediately.
        # This prevents the "500 Internal Server Error" crash.
        return Response({
            'id': order.id,
            'order_number': order.order_number,
            'total': order.total,
            'status': order.status,
            'message': 'Order created successfully'
        }, status=status.HTTP_201_CREATED)
    # -----------------------
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('status')
        if new_status not in dict(Order.STATUS_CHOICES):
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        order.status = new_status
        order.save()
        return Response(OrderSerializer(order).data)
    
    @action(detail=True, methods=['patch'])
    def update_payment_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('payment_status')
        if new_status not in dict(Order.PAYMENT_STATUS_CHOICES):
            return Response({'error': 'Invalid payment status'}, status=status.HTTP_400_BAD_REQUEST)
        order.payment_status = new_status
        order.save()
        return Response(OrderSerializer(order).data)