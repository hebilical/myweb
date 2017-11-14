from django.shortcuts import render
from django.http import HttpResponse,Http404
from django.views.generic.base import View
from Tango_app.models import Article ,Category
# Create your views here.

class IndexView(View):

    def get(self,request):
        template_name='Tango_app/index.html'
        return render(request,template_name)




class ArticleView(View):
    def get(self,request):
        template_name='Tango_app/Article.html'
        return render(request,template_name)



    def post(self,request):
        pass


class AboutView(View):

    def get(self,request):
        template_name='Tango_app/about.html'
        return render(request,template_name)


    def post(self,request):
        pass
