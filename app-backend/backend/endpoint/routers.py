
from rest_framework.routers import DefaultRouter
from backend.endpoint.views import ProducerApiSet

router_producer = DefaultRouter()
router_producer.register(prefix='producer', basename='producer', viewset=ProducerApiSet)
