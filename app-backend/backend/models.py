
from datetime import datetime

from django.http import HttpRequest
from django.shortcuts import reverse

from django.db import models
from django.db import InternalError
from django.db.models import CharField, EmailField, DateTimeField

SUCCESS = 200
FIELDS_ERROR = -401
INTEGRITY_ERROR = -402
INSTANCE_NOT_FOUND = -404
INTERNAL_ERROR = -503

# Create your models here.
class Producer(models.Model):
    
    first_name = models.CharField(max_length=100, null=True, default='')
    last_name = models.CharField(max_length=100, null=True, default='')
    username = models.CharField(max_length=30, null=True, unique=True, default='')
    email = models.EmailField(null=True, unique=True)
    
    last_modified = DateTimeField(null=False)
    last_modifier = CharField(max_length=30, null=False)
    
    def __str__(self):
        return f"id: {self.id}, first_name: {self.first_name}, last_name: {self.last_name}, username: {self.username}, email: {self.email}"
    
    def get_absolute_url(self):
        return reverse("get_producer", kwargs={"pk": self.pk})

class ProducerManager:
    
    def get_producer(req:HttpRequest, id:int, q_params:dict, response:dict):
        
        try:
            
            # remove user from DB
            producer = Producer.objects.get(id=id)
            
            # make response
            response['producer'] = producer
            response['query_message']=f'Producer with id = {id} found'
            
        except InternalError:
            response['query_message']='Internal error when fetch'
            return INTERNAL_ERROR
        
        except Producer.DoesNotExist:
            response['query_message']=f'Producer with id = {id} not found'
            return INSTANCE_NOT_FOUND
        
        return SUCCESS    
        
    def create_producer(req:HttpRequest, q_params:dict, response:dict):
        
        # field values var
        first_name = str(q_params.get('first_name', ''))
        last_name = str(q_params.get('last_name',''))
        username = str(q_params.get('username',''))
        email = str(q_params.get('email',''))
        
        last_modified = datetime.now()
        last_modifier = req.user.username
        
        has_field_errors = False
        response['duplicated_fields'] = list()
        response['empty_fields'] = list()
            
        try:
            
            # check username field
            if username == '':
                response['empty_fields'].append('username')
                has_field_errors = True
            else:
                if Producer.objects.filter(username=username).count() > 0:
                    response['duplicated_fields'].append('username')
                    has_field_errors = True
                    
            # check email field
            if email == '':
                response['empty_fields'].append('email')
                has_field_errors = True
            else:
                if Producer.objects.filter(email=email).count() > 0:
                    response['duplicated_fields'].append('email')
                    has_field_errors = True
            
            if first_name == '':
                response['empty_fields'].append('first_name')
                has_field_errors = True
            
            if last_name == '':
                response['empty_fields'].append('last_name')
                has_field_errors = True
            
            
            # check create instance
            if has_field_errors:
                response['query_message']='Wrong input data'
                return FIELDS_ERROR
            
            # create DB instance
            producer = Producer.objects.create(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                last_modified=last_modified,
                last_modifier=last_modifier
            )
            producer.save()
            
            # make response
            response['producer'] = producer
            response['query_message']= f'Producer  with id = {producer.id} created'
            
        except InternalError:
            response['query_message']= 'Internal error when create'
            return INTERNAL_ERROR
        
        return SUCCESS
    
    def update_producer(req:HttpRequest, id:int, q_params:dict, response:dict):
        
        # get params field values
        first_name = str(q_params.get('first_name',''))
        last_name = str(q_params.get('last_name',''))
        username = str(q_params.get('username',''))
        email = str(q_params.get('email',''))
        
        has_changed = False
        last_modified = datetime.now()
        last_modifier = req.user.username
        response['updated_fields'] = list()
        
        has_field_errors = False
        response['duplicated_fields'] = list()
        response['empty_fields'] = list()
            
        try:
            
            if id == '':
                return INSTANCE_NOT_FOUND
            
            producer = Producer.objects.get(id=id)
            
            # check username field
            if username == '':
                response['empty_fields'].append('username')
            elif username != producer.username:
                if Producer.objects.filter(username=username).count() > 0:
                    response['duplicated_fields'].append('username')
                    has_field_errors = True
                else:
                    has_changed = True
                    response['duplicated_fields'].append('username')
                    producer.username = username
            
            # check email field
            if email == '':
                response['empty_fields'].append('email')
            elif email != producer.username:
                if Producer.objects.filter(email=email).count() > 0:
                    response['duplicated_fields'].append('email')
                    has_field_errors = True
                else:
                    has_changed = True
                    response['changed_fields'].append('email')
                    producer.email = email
            
            # check first name
            if first_name == '':
                response['empty_fields'].append('first_name')
            elif first_name != producer.first_name:
                has_changed = True
                response['changed_fields'].append('first_name')
                producer.first_name = first_name
            
            # check last name
            if last_name == '':
                response['empty_fields'].append('last_name')
            elif last_name != producer.last_name:
                has_changed = True
                response['changed_fields'].append('last_name')
                producer.last_name = last_name
            
            if has_field_errors:
                response['query_message']='Wrong input data'
                return FIELDS_ERROR
            
            # make response
            response['producer'] = producer
            
            if has_changed:
            
                # update DB instance
                producer.last_modified = last_modified
                producer.last_modifier = last_modifier
                producer.save()
                
                response['query_message']= f'Producer with id = {id}  updated'

            else:
                response['query_message']= f'Producer  with id = {id} not changed'
            
        except Producer.DoesNotExist:
            response['query_message']=f'Producer with id = {id} not found'
            return INSTANCE_NOT_FOUND
        
        except InternalError:
            response['query_message']='Internal error when update'
            return INTERNAL_ERROR
        
        return SUCCESS        
    
    def delete_producer(req:HttpRequest, id:int, q_params:dict, response:dict):
        
        try:
            
            # remove user from DB
            producer = Producer.objects.get(id=id)
            producer.delete()
            
            # make response
            response['producer'] = producer
            response['query_message']=f'Producer with id = {id} deleted'
            
        except Producer.DoesNotExist:
            response['query_message']=f'Producer with id = {id} not found'
            return INSTANCE_NOT_FOUND
        
        except InternalError:
            response['query_message']='Internal error when delete'
            return INTERNAL_ERROR
        
        return SUCCESS
    
    def delete_all_producers(response):
        
        try:
            Producer.objects.all().delete()
            response['query_message']='All producers deleted'
            
        except InternalError:
            response['query_message']='Internal error when delete'
            return INTERNAL_ERROR
        
        return SUCCESS
        