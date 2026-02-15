from rest_framework import serializers
from .models import User
from django.contrib.auth.models import Group  # <--- Make sure this is imported

class UserSerializer(serializers.ModelSerializer):
    """User Serializer"""
    password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'role', 'phone', 'address', 'profile_image', 'is_active', 
                  'date_joined', 'password']
        read_only_fields = ['id', 'date_joined']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class UserRegistrationSerializer(serializers.ModelSerializer):
    """User Registration Serializer"""
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True, min_length=6)
    
    # Allow extra fields
    role = serializers.CharField(required=False, default='customer')
    address = serializers.CharField(required=False, allow_blank=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'role', 'address', 'first_name']
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        
        # 1. Create the User
        user = User.objects.create_user(**validated_data)
        
        # 2. FORCE Group Assignment
        # Check the 'role' field we just saved to the user
        if user.role == 'member':
            try:
                # Find group named "Member" (Case sensitive)
                group = Group.objects.get(name='Member')
                user.groups.add(group)
            except Group.DoesNotExist:
                # If it doesn't exist, create it and add
                group = Group.objects.create(name='Member')
                user.groups.add(group)
        
        return user


class UserLoginSerializer(serializers.Serializer):
    """User Login Serializer"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)