"""egreme URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include

from backend.views import *
from backend.models import *
from backend.endpoint.views import *
from backend.endpoint.routers import *

from django.contrib.auth.decorators import login_required 

urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('list/', GetProducerListView.as_view(), name='list'),
    path('edit/', EditProducerView.as_view(), name='edit'), 
    path('api/', include(router_producer.urls), name='api')    
]
