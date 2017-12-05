from django.shortcuts import render,render_to_response
from datetime import datetime
from django.contrib.auth import  authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from Tango_app.forms import GW_forms
from django.http import HttpResponse,Http404,HttpResponseRedirect,JsonResponse
from django.views.generic.base import View
from Tango_app.models import Article ,Category,GW_pre_table
from Tango_app.forms import GW_forms
from guardian.shortcuts import assign_perm
from django.core import serializers
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


class RegisterView(View):
    def get(self,request):
        template_name='Tango_app/register.html'
        return render(request,template_name)
    def post(self,request):
        user_name=request.POST.get('empcode')
        realname=request.POST.get('username')
        user_email=request.POST.get('userEmail')
        user_pswd=request.POST.get('userpassword')
        if user_pswd==request.POST.get('userpassword_check'):
            User.objects.create_user(username=user_name,first_name=realname,email=user_email,password=user_pswd)
            return HttpResponseRedirect('/Tango_app/login')
        else:
            template_name='Tango_app/register.html'
            return render(request,template_name)


class LoginView(View):

    def get(self,request):

        template_name='Tango_app/login.html'
        if request.user.is_authenticated():
            logout(request)
        return render(request,template_name)

    def post(self,request):
        user_name=request.POST.get('empcode')
        user_pswd=request.POST.get('userpassword')
        user=authenticate(username=user_name,password=user_pswd)
        if user:
            if request.user.is_authenticated():
                return HttpResponseRedirect('/Tango_app/gw')
            else:
                login(request,user)
                return HttpResponseRedirect('/Tango_app/gw')
        else:
            return HttpResponse ('无此用户!请确认您输入的用户名和密码是否无误.')


@method_decorator([login_required,csrf_protect],name='dispatch')
class GWView(View):

    def get(self,request):
        template_name='Tango_app/GW_table.html'
        gw_list=GW_pre_table.objects.filter(createBy=request.user.first_name)
        form_list=[]
        gw_form=GW_forms()
        for item in gw_list:
            form_list.append(item)
            assign_perm('Tango_app.gw_draft_post',request.user,item)
        if request.user.is_anonymous :
            info_dict={'username':'用户未登录','first_name':'用户未登录'}
        else:
            info_dict={'username':request.user.username,'first_name':request.user.first_name}
        info_dict['form_list']=form_list
        info_dict['gw_form']=gw_form
        return render(request,template_name,info_dict)

    # @login_required
    def post(self,request):
        template_name='Tango_app/GW_table.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        gw_form=GW_forms()
        if request.user.is_authenticated():
            form=GW_forms(request.POST)
            if form.is_valid():
                record=form.save(commit=False)
                record.createBy=request.user.first_name
                record.save()
            gw_list=GW_pre_table.objects.filter(createBy=request.user.first_name)
            form_list=[]
            for item in gw_list:
                assign_perm('Tango_app.gw_draft_post',request.user,item)
                form_list.append(item)
            info_dict['form_list']=form_list
            info_dict['gw_form']=gw_form
        else:
            return HttpResponseRedirect('/Tango_app/login')
        return render(request,template_name,info_dict)


# 为工务页面的ajax请求查询数据并且返回查询结果
@method_decorator([login_required,csrf_protect],name='dispatch')
class GW_AjaxView(View):
    def get(self,request):
        gw_list=GW_pre_table.objects.filter(createBy=request.user.first_name,staticcode=request.GET.get('staict_code'))
        data=serializers.serialize('json',gw_list)
        return JsonResponse(data,safe=False)
    def post(self,request):
        pass






@method_decorator([login_required,csrf_protect],name='dispatch')
class GW_Mdf_View(View):

    # def dispatch(self,*args,**kwargs):
    #     return super(GW_Mdf_View,self).dispatch(*args,**kwargs)
    def get(self,request):
        form_list=[]
        template_name='Tango_app/gw_mdf.html'
        gw_list=GW_pre_table.objects.filter(PrintNum=request.GET.get('S_printnum'))
        for item in gw_list:
            if request.user.has_perm('Tango_app.gw_draft_post',item):
                form_list.append(item)
        info_dict={'form_list':form_list}
        return render(request,template_name,info_dict)

    def post(self,request):
        if request.is_ajax:
            gw_k_val=request.POST.get('k_val')
            record_id=request.POST.get('record_id')
            gw_printnum=request.POST.get('printnum')

            gw_record=GW_pre_table.objects.get(id=record_id,PrintNum=gw_printnum)
            gw_record.K_val=float(gw_k_val)
            gw_record.updateBy=request.user.first_name
            gw_record.updatetime=datetime.now()
            gw_record.save()

            form_list=[]
            template_name='Tango_app/gw_mdf.html'
            gw_list=GW_pre_table.objects.filter(createBy=request.user.first_name)
            data=serializers.serialize('json',gw_list)
            return JsonResponse(data,safe=False)
        else:
            print('Ajax失败!')
            return HttpResponse('Ajax 失败')
