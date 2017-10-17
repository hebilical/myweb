from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    mydict={'author':'hebilical'}
    return render(request,'Tango_app/index.html',mydict)

def about(request):
    return HttpResponse ('this is the about page !')
