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
from Tango_app.models import Article ,Category,GW_pre_table,PRO_table
from Tango_app.forms import GW_forms , PRO_forms
from guardian.shortcuts import assign_perm
from django.core import serializers
# Create your views here.

class IndexView(View):

    def get(self,request):
        template_name='Tango_app/index.html'
        return render(request,template_name)

# class ArticleView(View):
#     def get(self,request):
#         template_name='Tango_app/Article.html'
#         return render(request,template_name)
#
#
#
#     def post(self,request):
#         pass

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
        gw_list=GW_pre_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT')
        form_list=[]
        gw_form=GW_forms()
        for item in gw_list:
            form_list.append(item)
            # assign_perm('Tango_app.gw_draft_post',request.user,item)
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
        form_list=[]
        gw_form=GW_forms()
        if request.user.is_authenticated():
            form=GW_forms(request.POST)
            if form.is_valid():
                record=form.save(commit=False)
                record.createBy=request.user.first_name
                record.save()
                assign_perm('Tango_app.gw_draft_post',request.user,record)
            gw_list=GW_pre_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT')
            for item in gw_list:
                form_list.append(item)
            info_dict['gw_form']=gw_form
            info_dict['form_list']=form_list
            # return JsonResponse(data,safe=False)
        else:
            return HttpResponseRedirect('/Tango_app/login')
        return render(request,template_name,info_dict)


# 为工务页面的ajax请求查询数据并且返回查询结果
@method_decorator([login_required,csrf_protect],name='dispatch')
class GW_AjaxView(View):
    def get(self,request):
        print(request.GET.get('staict_code'))
        gw_list=GW_pre_table.objects.filter(createBy=request.user.first_name,staticcode=request.GET.get('staict_code'))
        data=serializers.serialize('json',gw_list)
        return JsonResponse(data,safe=False)



    def post(self,request):
        staict_code=request.POST.get('staict_code')
        record=GW_pre_table.objects.filter(pk=int(request.POST.get('gw_id')),PrintNum=request.POST.get('gw_printnum'))
        if request.POST.get('staict_code')=='POST':
            record.update(staticcode=staict_code,postBy=request.user.username,posttime=datetime.now())
        else:
            record.update(staticcode=staict_code,updateBy=request.user.username,updatetime=datetime.now())

        pass

@method_decorator([login_required,csrf_protect],name='dispatch')
class GW_Mdf_View(View):

    # 工务表浏览器正常访问
    #
    def get(self,request):
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        template_name='Tango_app/gw_mdf.html'
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
            # 返回所有已过帐状态的记录
            form_list=[]
            template_name='Tango_app/gw_mdf.html'
            gw_list=GW_pre_table.objects.filter(staticcode='POST')
            data=serializers.serialize('json',gw_list)
            return JsonResponse(data,safe=False)
        else:
            print('Ajax失败!')
            return HttpResponse('Ajax 失败')

@method_decorator([login_required,csrf_protect],name='dispatch')
class GW_MdfView_ajax(View):
    # 返回工务修改页三个按钮的对应状态记录
    def get(self,request):
        if request.is_ajax:
            staict_code=request.GET.get('static_code')
            gw_list=GW_pre_table.objects.filter(staticcode=staict_code)
            data=serializers.serialize('json',gw_list)
            return JsonResponse(data,safe=False)
        else:
            pass




            # 工务修改处理函数
    def post(self,request):
            #是否是设置系数
        if request.is_ajax and request.POST.get('k_set')=='true':
            print(request.POST.get('k_set'))
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            k_val=request.POST.get('k_val')
            print (k_val)

            record=GW_pre_table.objects.get(id=record_id,PrintNum=printnum)
            record.K_val=k_val
            record.staticcode='CHECKED'
            record.CheckBy=request.user.username
            record.CheckTime=datetime.now()
            record.save()
            gw_list=GW_pre_table.objects.filter(staticcode='POST')
            data=serializers.serialize('json',gw_list)
            # 不是设置工务系数,就是发还操作
        else:
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            record=GW_pre_table.objects.get(id=record_id,PrintNum=printnum)
            record.staticcode='POST'
            record.save()
            gw_list=GW_pre_table.objects.filter(staticcode='CHECKED')
            data=serializers.serialize('json',gw_list)
        return JsonResponse(data,safe=False)

@method_decorator([login_required,csrf_protect],name='dispatch')
class PRD_View(View):
    # 浏览器正常访问制作报表页
    def get(self,request):
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        template_name='Tango_app/prd.html'
        gw_list=PRO_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT')
        form_list=[]
        print('进入方法')
        prd_form=PRO_forms()

        if request.user.is_authenticated():
            form=PRO_forms(request.POST)
            if form.is_valid():
                record=form.save(commit=False)
                record.createBy=request.user.first_name
                record.save()
                assign_perm('Tango_app.prd_draft_post',request.user,record)
            prd_list=PRO_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT')
            for item in gw_list:
                form_list.append(item)
            info_dict['prd_form']=prd_form
            info_dict['form_list']=form_list
            # return JsonResponse(data,safe=False)
        else:
            return HttpResponseRedirect('/Tango_app/login')
        return render(request,template_name,info_dict)

    def post(self,request):
        template_name='Tango_app/prd.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        form_list=[]
        prd_form=PRO_forms()
        if request.user.is_authenticated():
            form=PRO_forms(request.POST)
            if form.is_valid():
                record=form.save(commit=False)
                record.createBy=request.user.first_name
                record.save()
                assign_perm('Tango_app.prd_draft_post',request.user,record)
            gw_list=PRO_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT')
            for item in gw_list:
                form_list.append(item)
            info_dict['prd_form']=prd_form
            info_dict['form_list']=form_list
            # return JsonResponse(data,safe=False)
        else:
            return HttpResponseRedirect('/Tango_app/login')
        return render(request,template_name,info_dict)
