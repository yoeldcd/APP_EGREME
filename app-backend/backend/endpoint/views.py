from rest_framework.viewsets import ModelViewSet

from backend.models import Producer
from backend.endpoint.serializers import ProducerSerializer

class ProducerApiSet(ModelViewSet):
    queryset = Producer.objects.all()
    serializer_class = ProducerSerializer