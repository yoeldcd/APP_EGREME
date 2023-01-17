from rest_framework import serializers
from backend.models import Producer

class ProducerSerializer(serializers.ModelSerializer):
    request = None
    
    class Meta:
        model = Producer
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'last_modified',
            'last_modifier'
        ]