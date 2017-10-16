from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse('hollow world!')

def about(request):
    return HttpResponse ('this is the about page !')
