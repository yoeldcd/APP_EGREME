from django.contrib import admin
from backend.models import Producer

# Register your models here.
@admin.register(Producer)
class ProducerAdmin(admin.ModelAdmin):
    list_display = ['id','username','first_name','last_name','email','last_modified', 'last_modifier']
    