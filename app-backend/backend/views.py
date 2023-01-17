
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.views import View

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from backend.models import *
from backend.endpoint.serializers import ProducerSerializer

class GetProducerListView(generics.ListCreateAPIView):
    queryset = Producer.objects.all()
    serializer_class = ProducerSerializer
    
# Create your views here.
class EditProducerView(APIView):
    
    def get(self, req:Request):
        q_params = req.query_params 
        response = dict()
        
        # execute data model query
        state = ProducerManager.get_producer(req, q_params, response)
        
        # make Http REST Response
        if state == INTERNAL_ERROR:
            return Response(response.get('query_message',''), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        elif state == INSTANCE_NOT_FOUND:
            return Response(response.get('query_message',''), status=status.HTTP_404_NOT_FOUND)
        
        else:
            serializer = ProducerSerializer(response.get('producer'), many=True)
            return Response(serializer.data)

    def post(self, req:Request):
        q_params = req.data
        response = dict()
        
        print(q_params)
        
        # execute data model query
        state = ProducerManager.create_producer(req, q_params, response)
        
        # make Http REST Response
        if state == INTERNAL_ERROR:
            return Response('', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        elif state == FIELDS_ERROR:
            return Response('', status=status.HTTP_406_NOT_ACCEPTABLE)
        
        else:
            serializer = ProducerSerializer(response.get('producer'), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, req:Request):
        q_params = req.data 
        response = dict()
        
        # execute data model query
        state = ProducerManager.update_producer(req, q_params, response)
        
        # make Http REST Response
        if state == INTERNAL_ERROR:
            return Response(response.get('query_message'), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        elif state == FIELDS_ERROR:
            return Response(response.get('query_message'), status=status.HTTP_406_NOT_ACCEPTABLE)
        
        elif state == INSTANCE_NOT_FOUND:
            return Response(response.get('query_message'), status=status.HTTP_404_NOT_FOUND)
        
        else:
            serializer = ProducerSerializer(response.get('producer'), many=True)
            return Response(serializer.data)
            
    def delete(self, req:Request):
        q_params = req.data 
        response = dict()
        
        # execute data model query
        state = ProducerManager.delete_producer(req, q_params, response)
        
        # make Http REST Response
        if state == INTERNAL_ERROR:
            return Response(response.get('query_message',''), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        elif state == INSTANCE_NOT_FOUND:
            return Response(response.get('query_message',''), status=status.HTTP_404_NOT_FOUND)
        
        else:
            serializer = ProducerSerializer(response.get('producer'), many=True)
            return Response(serializer.data)
        
    