from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    mydict={'author':'hebilical'}
    return render(request,'Tango_app/index.html',mydict)

def about(request):
    ab_dict={'page_author':'hebilical'}
    return render(request,'Tango_app/about.html',ab_dict)
