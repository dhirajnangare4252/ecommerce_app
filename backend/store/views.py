from django.shortcuts import render
from django.http import JsonResponse
def home(request):
    data = {'message': 'Welcome to the home page!'}
    return JsonResponse(data)