# D:\bibliobay_backend\bibliobay\bibliobay\urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('books.urls')),
    path('api/v1/', include('accounts.urls')),
    path('api/v1/', include('orders.urls')),
    path('api/v1/', include('blogs.urls')),
    path('api/v1/', include('reviews.urls')),
]