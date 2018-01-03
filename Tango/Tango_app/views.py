import uuid
import json
from django.shortcuts import render,render_to_response
from datetime import datetime
from django.contrib.auth import  authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User, Group
# from Tango_app.forms import GW_forms
from django.http import HttpResponse,Http404,HttpResponseRedirect,JsonResponse
from django.views.generic.base import View
from Tango_app.models import Article ,Category,GW_pre_table,PRO_table,DF_table,ZJ_table,OUT_table,Longined_user,Page_loged
from Tango_app.forms import GW_forms , PRO_forms, DF_forms,ZJ_forms,OUT_forms,PageLogForms
from django.contrib.sessions.models import Session
from guardian.shortcuts import assign_perm
from django.core import serializers
from Tango_app.record_maker import gw_maker,prdMaker,dfMaker,zjMaker,set_gwFinalQty,set_prdFinalQty,set_dfFinalQty,set_zjFinalQty,getReport,getDetilReport
from Tango_app.permissioncheck import addK_seter, rmK_Seters, isK_Seter
# Create your views here.
@method_decorator([login_required,csrf_protect],name='dispatch')
class IndexView(View):

    def get(self,request):

        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        template_name='Tango_app/index.html'
        print(request.COOKIES.get('sessionid'))
        return render(request,template_name,info_dict)



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
            # logout(request)
            Longined_user.objects.filter(UserSession=request.COOKIES.get('sessionid')).delete()
        return render(request,template_name)

    def post(self,request):
        user_name=request.POST.get('empcode')
        user_pswd=request.POST.get('userpassword')
        l_user=authenticate(username=user_name,password=user_pswd)

        # Session.objects.all().delete()
        # print(user.first_name)

        if l_user:
            login(request,l_user)
            cookies_str=uuid.uuid4()
            respone=HttpResponseRedirect('/Tango_app/')
            respone.set_cookie('user_session',cookies_str)

            logined=Longined_user(user=l_user,UserSession=cookies_str)
            logined.save()
            if request.user.is_authenticated():
                # print (request.session['seesionid'])
                return respone
            else:
                return HttpResponseRedirect('/Tango_app/')
        else:
            return HttpResponse ('无此用户!请确认您输入的用户名和密码是否无误.')


@method_decorator([login_required,csrf_protect],name='dispatch')
class GWView(View):

    def get(self,request):
        template_name='Tango_app/GW_table.html'
        user=Longined_user.objects.get(UserSession=request.COOKIES.get('user_session')).user
        gw_list=GW_pre_table.objects.filter(createBy=user.first_name,staticcode='DRAFT')
        form_list=[]
        gw_form=GW_forms()
        for item in gw_list:
            form_list.append(item)
        if request.user.is_anonymous :
            info_dict={'username':'用户未登录','first_name':'用户未登录'}
        else:
            info_dict={'username':request.user.username,'first_name':request.user.first_name}
            info_dict['form_list']=form_list
        info_dict['gw_form']=gw_form
        return render(request,template_name,info_dict)

    def post(self,request):
        template_name='Tango_app/GW_table.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        if request.user.is_authenticated():
            gw_recordInfo={}
            if request.is_ajax:
                gw_work_types=request.POST.get('work_types')
                gw_recordInfo['gw_printnum']=request.POST.get('printnum')
                gw_recordInfo['gw_printname']=request.POST.get('printname')
                gw_recordInfo['pagesize']=request.POST.get('pagesize')
                gw_recordInfo['gw_workdate']=request.POST.get('workdate')
                gw_recordInfo['gw_workdatetype']=request.POST.get('worktimetype')
                gw_recordInfo['gw_remark']=request.POST.get('remark')
                gw_recordInfo['creator']=info_dict['first_name']
                print(gw_recordInfo['creator']+'hh'+gw_recordInfo['gw_remark'])
                if gw_maker(gw_work_types,gw_recordInfo):
                    recoedlist=GW_pre_table.objects.filter(staticcode='DRAFT',createBy=gw_recordInfo['creator']).order_by('-createtime')[:1000]
                    data=serializers.serialize('json',recoedlist)
                    return JsonResponse(data,safe=False)
                else:
                    print('记录生成失败')
                    return HttpResponse(request,'工务记录生成失败')
        else:
            return HttpResponseRedirect('/Tango_app/login')
        info_dict['gw_form']=gw_form
        return render(request,template_name,info_dict)


# 为工务页面的ajax请求查询数据并且返回查询结果
@method_decorator([login_required,csrf_protect],name='dispatch')
class GW_AjaxView(View):
    def get(self,request):
        # print(request.GET.get('static_code'))
        gw_list=GW_pre_table.objects.filter(createBy=request.user.first_name,staticcode=request.GET.get('static_code')).order_by('-createtime')[:1000]
        data=serializers.serialize('json',gw_list)
        return JsonResponse(data,safe=False)



    def post(self,request):
        staict_code=request.POST.get('static_code')
        record=GW_pre_table.objects.filter(pk=int(request.POST.get('gw_id')),PrintNum=request.POST.get('gw_printnum'))
        if staict_code=='POST':
            record.update(staticcode=staict_code,FinishQty=int(request.POST.get('gw_finishqty')),postBy=request.user.username,posttime=datetime.now())
        else:
            record.update(staticcode=staict_code,FinishQty=int(request.POST.get('gw_finishqty')),updateBy=request.user.username,updatetime=datetime.now())
        gw_list=GW_pre_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT').order_by('-createtime')[:1000]
        data=serializers.serialize('json',gw_list)
        return JsonResponse(data,safe=False)

@method_decorator([login_required,csrf_protect],name='dispatch')
class GW_Mdf_View(View):

    # 工务表浏览器正常访问
    #
    def get(self,request):
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        template_name='Tango_app/gw_mdf.html'
        return render(request,template_name,info_dict)

    def post(self,request):
        user=User.objects.get(username=request.user.username)
        if request.is_ajax and isK_Seter(user):
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
            gw_list=GW_pre_table.objects.filter(staticcode='POST').order_by('-posttime')[:1000]
            data=serializers.serialize('json',gw_list)
            return JsonResponse(data,safe=False)
        else:
            data={}
            return JsonResponse(data,safe=False)

@method_decorator([login_required,csrf_protect],name='dispatch')
class GW_MdfView_ajax(View):
    # 返回工务修改页三个按钮的对应状态记录

    def get(self,request):
        user=User.objects.get(username=request.user.username)

        if request.is_ajax and isK_Seter(user):
            staict_code=request.GET.get('static_code')
            gw_list=GW_pre_table.objects.filter(staticcode=staict_code).order_by('-createtime')[:1000]
            data=serializers.serialize('json',gw_list)
            return JsonResponse(data,safe=False)
        else:
            data={}
            return JsonResponse(data,safe=False)




            # 工务修改处理函数
    def post(self,request):
            #是否是设置系数
        user=User.objects.get(username=request.user.username)
        if request.is_ajax and isK_Seter(user) and request.POST.get('k_set')=='true':
            # print(request.POST.get('k_set'))
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            k_val=request.POST.get('k_val')


            record=GW_pre_table.objects.get(id=record_id,PrintNum=printnum)
            record.K_val=k_val
            record.staticcode='CHECKED'
            record.CheckBy=request.user.username
            record.CheckTime=datetime.now()
            record.save()

            gw_list=GW_pre_table.objects.filter(staticcode='POST').order_by('-posttime')[:1000]
            data=serializers.serialize('json',gw_list)

        if request.is_ajax and request.POST.get('k_set')=='k_set':
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            k_val=request.POST.get('k_val')
            record=GW_pre_table.objects.get(id=record_id,PrintNum=printnum)
            record.K_val=k_val
            record.save()
            set_gwFinalQty(record)
            gw_list=GW_pre_table.objects.filter(staticcode='POST').order_by('-posttime')[:1000]
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
        # gw_list=PRO_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT')
        # form_list=[]

        prd_form=PRO_forms()
        user=Longined_user.objects.get(UserSession=request.COOKIES.get('user_session')).user
        if request.user.is_authenticated():
            form=PRO_forms(request.POST)
            if form.is_valid():
                record=form.save(commit=False)
                record.createBy=request.user.first_name
                record.save()
                assign_perm('Tango_app.prd_draft_post',request.user,record)
            prd_list=PRO_table.objects.filter(createBy=user.first_name,staticcode='DRAFT').order_by('-createtime')[:1000]
            # for item in gw_list:
            #     form_list.append(item)
            info_dict['prd_form']=prd_form
            # info_dict['form_list']=form_list
            # return JsonResponse(data,safe=False)

        else:
            return HttpResponseRedirect('/Tango_app/login')
        return render(request,template_name,info_dict)

    def post(self,request):
        template_name='Tango_app/prd.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}

        # prd_form=PRO_forms()
        user=Longined_user.objects.get(UserSession=request.COOKIES.get('user_session')).user
        if request.user.is_authenticated():
            recordInfo={}
            if request.is_ajax:
                work_types=request.POST.get('work_types')
                recordInfo['printnum']=request.POST.get('printnum')
                recordInfo['printname']=request.POST.get('printname')
                # gw_recordInfo['pagesize']=request.POST.get('pagesize')
                recordInfo['workdate']=request.POST.get('workdate')
                recordInfo['workdatetype']=request.POST.get('worktimetype')
                recordInfo['remark']=request.POST.get('remark')
                recordInfo['creator']=info_dict['first_name']
                print(recordInfo['creator']+'hh'+recordInfo['remark'])
                if prdMaker(work_types,recordInfo):
                    recoedlist=PRO_table.objects.filter(staticcode='DRAFT',createBy=recordInfo['creator']).order_by('-createtime')[:1000]
                    data=serializers.serialize('json',recoedlist)
                    return JsonResponse(data,safe=False)
        else:
            return HttpResponseRedirect('/Tango_app/login')
        return render(request,template_name,info_dict)


@method_decorator([login_required,csrf_protect],name='dispatch')
class PRD_ViewAjax(View):
    def get(self,request):

        if request.is_ajax:
            static_code=request.GET.get('staict_code')
            prd_list=PRO_table.objects.filter(staticcode=static_code,createBy=request.user.first_name).order_by('-createtime')[:1000]
            data=serializers.serialize('json',prd_list)
        else:
            data=[]
        return JsonResponse(data,safe=False)

    def post(self,request):
        if request.is_ajax:
            # print(request.POST.get('prd_id')+request.POST.get('prd_printnum'))
            static_code=request.POST.get('static_code')
            record=PRO_table.objects.get(pk=int(request.POST.get('prd_id')),PrintNum=request.POST.get('prd_printnum'))
            if static_code=='DELETED':
                record.staticcode=static_code
                record.save()
                prd_list=PRO_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT').order_by('-createtime')[:1000]

            else:
                record.WorkStartTime=request.POST.get('start_time')
                record.WorkEndTime=request.POST.get('end_time')
                record.staticcode=static_code
                record.postBy=request.user.first_name
                record.posttime=datetime.now()
                record.FinishQty=request.POST.get('finishqty')
                record.save()
                prd_list=PRO_table.objects.filter(createBy=request.user.first_name,staticcode=static_code).order_by('-createtime')[:1000]
        data=serializers.serialize('json',prd_list)
        return JsonResponse(data,safe=False)



# 浏览器正常访问制作修改页
@method_decorator([login_required,csrf_protect],name='dispatch')
class PRD_MdfView(View):
    def get(self,request):
        template_name='Tango_app/prd_mdf.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        return render(request,template_name,info_dict)



    def post(self,request):

        pass


@method_decorator([login_required,csrf_protect],name='dispatch')
class PRD_MdfViewAjax(View):
    def get(self,request):
        user=User.objects.get(username=request.user.username)
        if request.is_ajax and isK_Seter(user):
            staict_code=request.GET.get('static_code')
            gw_list=PRO_table.objects.filter(staticcode=staict_code).order_by('-createtime')[:1000]
            data=serializers.serialize('json',gw_list)
            return JsonResponse(data,safe=False)
        else:
            data={}
            return JsonResponse(data,safe=False)

    def post(self,request):
            #是否是设置系数
        user=User.objects.get(username=request.user.username)
        if request.is_ajax and isK_Seter(user) and request.POST.get('k_set')=='true':
            # print(request.POST.get('k_set'))
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            k_val=request.POST.get('k_val')
            record=PRO_table.objects.get(id=record_id,PrintNum=printnum)
            record.K_val=k_val
            record.staticcode='CHECKED'
            record.CheckBy=request.user.username
            record.CheckTime=datetime.now()
            record.save()
            set_prdFinalQty(record)
            gw_list=PRO_table.objects.filter(staticcode='POST').order_by('posttime')[:1000]
            data=serializers.serialize('json',gw_list)
            # 不是设置工务系数,就是发还操作
        else:
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            record=PRO_table.objects.get(id=record_id,PrintNum=printnum)
            record.staticcode='POST'
            record.save()
            gw_list=PRO_table.objects.filter(staticcode='CHECKED')
            data=serializers.serialize('json',gw_list)
        return JsonResponse(data,safe=False)



@method_decorator([login_required,csrf_protect],name='dispatch')
class DF_View(View):   #浏览器正常访问电分页面
    def get(self,request):
        user=Longined_user.objects.get(UserSession=request.COOKIES.get('user_session')).user
        info_dict={'username':user.username,'first_name':user.first_name}
        template_name='Tango_app/df.html'
        df_form=DF_forms()
        if request.user.is_authenticated():
            form=DF_forms(request.POST)
            if form.is_valid():
                record=form.save(commit=False)
                record.createBy=request.user.first_name
                record.save()
                assign_perm('Tango_app.df_draft_post',request.user,record)
            info_dict['df_form']=df_form
        else:
            return HttpResponseRedirect('/Tango_app/login')
        return render(request,template_name,info_dict)

    def post(self,request):
        template_name='Tango_app/df.html'
        user=Longined_user.objects.get(UserSession=request.COOKIES.get('user_session')).user
        info_dict={'username':user.username,'first_name':user.first_name}

        # df_form=DF_forms()
        if request.user.is_authenticated():
            recordInfo={}
            if request.is_ajax:
                work_types=request.POST.get('work_types')
                recordInfo['printnum']=request.POST.get('printnum')
                recordInfo['printname']=request.POST.get('printname')
                # gw_recordInfo['pagesize']=request.POST.get('pagesize')
                recordInfo['workdate']=request.POST.get('workdate')
                recordInfo['workdatetype']=request.POST.get('worktimetype')
                recordInfo['remark']=request.POST.get('remark')
                recordInfo['creator']=info_dict['first_name']
                print(recordInfo['creator']+'hh'+recordInfo['remark'])
                if dfMaker(work_types,recordInfo):
                    recoedlist=DF_table.objects.filter(staticcode='DRAFT',createBy=recordInfo['creator']).order_by('-createtime')[:1000]
                    data=serializers.serialize('json',recoedlist)
                    return JsonResponse(data,safe=False)
            # form=DF_forms(request.POST)
            #
            #
            # if form.is_valid():
            #
            #     record=form.save(commit=False)
            #     record.createBy=user.first_name
            #     record.save()
            #     print('saved')
            #     assign_perm('Tango_app.df_draft_post',request.user,record)

            # gw_list=PRO_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT')
            # for item in gw_list:
            #     form_list.append(item)

            # info_dict['form_list']=form_list
            # return JsonResponse(data,safe=False)
        else:
            return HttpResponseRedirect('/Tango_app/login')
        info_dict['df_form']=df_form
        return render(request,template_name,info_dict)

@method_decorator([login_required,csrf_protect],name='dispatch')
class DF_AjaxView(View):
    def get(self,request):
        if request.is_ajax:
            static_code=request.GET.get('staict_code')
            prd_list=DF_table.objects.filter(staticcode=static_code,createBy=request.user.first_name).order_by('-createtime')[:1000]
            data=serializers.serialize('json',prd_list)
        else:
            data=[]
        return JsonResponse(data,safe=False)

    def post(self,request):
        if request.is_ajax:
            # print(request.POST.get('prd_id')+request.POST.get('prd_printnum'))
            static_code=request.POST.get('static_code')
            record=DF_table.objects.get(pk=int(request.POST.get('prd_id')),PrintNum=request.POST.get('prd_printnum'))
            if static_code=='DELETED':
                record.staticcode=static_code
                record.save()
                prd_list=DF_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT').order_by('-createtime')[:1000]

            else:
                record.WorkStartTime=request.POST.get('start_time')
                record.WorkEndTime=request.POST.get('end_time')
                record.staticcode=static_code
                record.postBy=request.user.first_name
                record.posttime=datetime.now()
                record.FinishQty=request.POST.get('finishqty')
                record.save()
                prd_list=DF_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT').order_by('-createtime')[:1000]
        data=serializers.serialize('json',prd_list)
        return JsonResponse(data,safe=False)


@method_decorator([login_required,csrf_protect],name='dispatch')
class DF_MdfView(View):
    def get(self,request):
        template_name='Tango_app/df_mdf.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        return render(request,template_name,info_dict)



    def post(self,request):

        pass




@method_decorator([login_required,csrf_protect],name='dispatch')
class DF_MdfViewAjax(View):
    def get(self,request):
        user=User.objects.get(username=request.user.username)
        if request.is_ajax and isK_Seter(user):
            staict_code=request.GET.get('static_code')
            # print(staict_code)
            gw_list=DF_table.objects.filter(staticcode=staict_code).order_by('-createtime')[:1000]
            data=serializers.serialize('json',gw_list)
            return JsonResponse(data,safe=False)
        else:
            data={}
            return JsonResponse(data,safe=False)

    def post(self,request):
            #是否是设置系数
        if request.is_ajax and request.POST.get('k_set')=='true':
            # print(request.POST.get('k_set'))
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            scan_k_val=request.POST.get('scan_k_val')
            week_val=request.POST.get('week_val')
            record=DF_table.objects.get(id=record_id,PrintNum=printnum)
            record.Scan_K_val=scan_k_val
            record.Week_val=week_val
            record.staticcode='CHECKED'
            record.CheckBy=request.user.username
            record.CheckTime=datetime.now()
            record.save()
            set_dfFinalQty(record)
            gw_list=DF_table.objects.filter(staticcode='POST').order_by('-posttime')[:1000]
            data=serializers.serialize('json',gw_list)
            # 不是设置工务系数,就是发还操作
        else:
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            record=DF_table.objects.get(id=record_id,PrintNum=printnum)
            record.staticcode='POST'
            record.save()
            gw_list=DF_table.objects.filter(staticcode='CHECKED').order_by('-CheckTime')[:1000]
            data=serializers.serialize('json',gw_list)
        return JsonResponse(data,safe=False)



@method_decorator([login_required,csrf_protect],name='dispatch')
class ZJ_View(View):   #浏览器正常访问质检页面
    def get(self,request):
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        template_name='Tango_app/zj.html'


        zj_form=ZJ_forms()

        if request.user.is_authenticated():
            form=ZJ_forms(request.POST)
            if form.is_valid():
                record=form.save(commit=False)
                record.createBy=request.user.first_name
                record.save()
                assign_perm('Tango_app.zj_draft_post',request.user,record)

            info_dict['zj_form']=zj_form

        else:
            return HttpResponseRedirect('/Tango_app/login')
        return render(request,template_name,info_dict)

    def post(self,request):
        template_name='Tango_app/zj.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}

        # zj_form=ZJ_forms()
        if request.user.is_authenticated():
            recordInfo={}
            if request.is_ajax:
                work_types=request.POST.get('work_types')
                recordInfo['printnum']=request.POST.get('printnum')
                recordInfo['printname']=request.POST.get('printname')
                # gw_recordInfo['pagesize']=request.POST.get('pagesize')
                recordInfo['workdate']=request.POST.get('workdate')
                recordInfo['workdatetype']=request.POST.get('worktimetype')
                recordInfo['remark']=request.POST.get('remark')
                recordInfo['creator']=info_dict['first_name']
                print(recordInfo['creator']+'hh'+recordInfo['remark'])
                if zjMaker(work_types,recordInfo):
                    recoedlist=ZJ_table.objects.filter(staticcode='DRAFT',createBy=recordInfo['creator']).order_by('-createtime')[:1000]
                    data=serializers.serialize('json',recoedlist)
                    return JsonResponse(data,safe=False)
        else:
            return HttpResponseRedirect('/Tango_app/login')
        info_dict['zj_form']=zj_form
        return render(request,template_name,info_dict)



@method_decorator([login_required,csrf_protect],name='dispatch')
class ZJ_AjaxView(View):
    def get(self,request):
        if request.is_ajax:
            static_code=request.GET.get('staict_code')
            prd_list=ZJ_table.objects.filter(staticcode=static_code,createBy=request.user.first_name).order_by('-createtime')[:1000]
            data=serializers.serialize('json',prd_list)
        else:
            data=[]
        return JsonResponse(data,safe=False)

    def post(self,request):
        if request.is_ajax:
            # print(request.POST.get('prd_id')+request.POST.get('prd_printnum'))
            static_code=request.POST.get('static_code')
            record=ZJ_table.objects.get(pk=int(request.POST.get('prd_id')),PrintNum=request.POST.get('prd_printnum'))
            if static_code=='DELETED':
                record.staticcode=static_code
                record.save()
                prd_list=ZJ_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT').order_by('-createtime')[:1000]

            else:
                record.WorkStartTime=request.POST.get('start_time')
                record.WorkEndTime=request.POST.get('end_time')
                record.staticcode=static_code
                record.postBy=request.user.first_name

                record.posttime=datetime.now()
                record.FinishQty=request.POST.get('finishqty')
                record.save()
                prd_list=ZJ_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT').order_by('-createtime')[:1000]
        data=serializers.serialize('json',prd_list)
        return JsonResponse(data,safe=False)

@method_decorator([login_required,csrf_protect],name='dispatch')
class ZJ_MdfView(View):
    def get(self,request):
        template_name='Tango_app/zj_mdf.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        return render(request,template_name,info_dict)



    def post(self,request):

        pass




@method_decorator([login_required,csrf_protect],name='dispatch')
class ZJ_MdfViewAjax(View):
    def get(self,request):
        user=User.objects.get(username=request.user.username)
        if request.is_ajax and isK_Seter(user):
            staict_code=request.GET.get('static_code')
            print(staict_code)
            gw_list=ZJ_table.objects.filter(staticcode=staict_code).order_by('-createtime')[:1000]
            data=serializers.serialize('json',gw_list)
            return JsonResponse(data,safe=False)
        else:
            data={}
            return JsonResponse(data,safe=False)

    def post(self,request):
            #是否是设置系数
        if request.is_ajax and request.POST.get('k_set')=='true':
            # print(request.POST.get('k_set'))
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            k_val=request.POST.get('k_val')
            record=ZJ_table.objects.get(id=record_id,PrintNum=printnum)
            record.K_val=k_val
            record.staticcode='CHECKED'
            record.CheckBy=request.user.username
            record.CheckTime=datetime.now()
            record.save()
            set_zjFinalQty(record)


            gw_list=ZJ_table.objects.filter(staticcode='POST').order_by('-posttime')[:1000]
            data=serializers.serialize('json',gw_list)
            # 不是设置工务系数,就是发还操作
        else:
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            record=ZJ_table.objects.get(id=record_id,PrintNum=printnum)
            record.staticcode='POST'
            record.save()
            gw_list=ZJ_table.objects.filter(staticcode='CHECKED').order_by('-CheckTime')[:1000]
            data=serializers.serialize('json',gw_list)
        return JsonResponse(data,safe=False)



@method_decorator([login_required,csrf_protect],name='dispatch')
class OUT_View(View):   #浏览器正常访问输出表页面
    def get(self,request):
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        template_name='Tango_app/output.html'


        out_form=OUT_forms()

        info_dict['out_form']=out_form

        return render(request,template_name,info_dict)

    def post(self,request):
        template_name='Tango_app/output.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}

        out_form=OUT_forms()
        if request.user.is_authenticated():

            form=OUT_forms(request.POST)

            print('准备进入数据保存')
            if form.is_valid():
                print('saved')
                record=form.save(commit=False)
                record.createBy=request.user.first_name
                record.save()

                assign_perm('Tango_app.out_draft_post',request.user,record)


        else:
            return HttpResponseRedirect('/Tango_app/login')
        info_dict['out_form']=out_form
        return render(request,template_name,info_dict)


@method_decorator([login_required,csrf_protect],name='dispatch')
class OUT_AjaxView(View):
    def get(self,request):
        if request.is_ajax:

            static_code=request.GET.get('staict_code')
            print(static_code)
            prd_list=OUT_table.objects.filter(staticcode=static_code,createBy=request.user.first_name)
            data=serializers.serialize('json',prd_list)
        else:
            data=[]
        return JsonResponse(data,safe=False)

    def post(self,request):
        if request.is_ajax:
            # print(request.POST.get('prd_id')+request.POST.get('prd_printnum'))
            static_code=request.POST.get('static_code')
            record=OUT_table.objects.get(pk=int(request.POST.get('prd_id')),PrintNum=request.POST.get('prd_printnum'))
            if static_code=='DELETED':
                record.staticcode=static_code
                record.save()
                prd_list=OUT_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT')

            else:
                record.WorkStartTime=request.POST.get('start_time')
                record.WorkEndTime=request.POST.get('end_time')
                record.staticcode=static_code
                record.postBy=request.user.first_name
                record.posttime=datetime.now()
                record.save()
                prd_list=OUT_table.objects.filter(createBy=request.user.first_name,staticcode='DRAFT')
        data=serializers.serialize('json',prd_list)
        return JsonResponse(data,safe=False)



@method_decorator([login_required,csrf_protect],name='dispatch')
class OUT_MdfView(View):
    def get(self,request):
        template_name='Tango_app/output_mdf.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        return render(request,template_name,info_dict)



    def post(self,request):

        pass




@method_decorator([login_required,csrf_protect],name='dispatch')
class OUT_MdfViewAjax(View):

    def get(self,request):
        user=User.objects.get(username=request.user.username)
        if request.is_ajax and isK_Seter(user):
            staict_code=request.GET.get('static_code')
            print(staict_code)
            gw_list=OUT_table.objects.filter(staticcode=staict_code)
            data=serializers.serialize('json',gw_list)
            return JsonResponse(data,safe=False)
        else:
            data={}
            return JsonResponse(data,safe=False)

    def post(self,request):
            #是否是设置系数
        if request.is_ajax and request.POST.get('k_set')=='true':
            # print(request.POST.get('k_set'))
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            # k_val=request.POST.get('k_val')

            # print(k_val)

            record=OUT_table.objects.get(id=record_id,PrintNum=printnum)
            # record.K_val=k_val
            record.staticcode='CHECKED'
            record.CheckBy=request.user.username
            record.CheckTime=datetime.now()
            record.save()
            gw_list=OUT_table.objects.filter(staticcode='POST')
            data=serializers.serialize('json',gw_list)
            # 不是设置工务系数,就是发还操作
        else:
            record_id=request.POST.get('record_id')
            printnum=request.POST.get('printnum')
            record=OUT_table.objects.get(id=record_id,PrintNum=printnum)
            record.staticcode='POST'
            record.save()
            gw_list=OUT_table.objects.filter(staticcode='CHECKED')
            data=serializers.serialize('json',gw_list)
        return JsonResponse(data,safe=False)


@method_decorator([login_required,csrf_protect],name='dispatch')
class PageLogView(View):
    def get(self,request):
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        template_name='Tango_app/pagelog.html'
        page_form=PageLogForms()
        info_dict['page_form']=page_form
        return render(request,template_name,info_dict)






    def post(self,request):
        template_name='Tango_app/pagelog.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        page_form=PageLogForms()
        if request.user.is_authenticated():
            form=PageLogForms(request.POST)
            if form.is_valid():
                record=form.save(commit=False)
                record.CreateBy=request.user.first_name
                record.save()
        else:
            return HttpResponseRedirect('/Tango_app/login')
        info_dict['page_form']=page_form
        return render(request,template_name,info_dict)



@method_decorator([login_required,csrf_protect],name='dispatch')
class PageLog_AjaxView(View):
    def get(self,request):
        if request.is_ajax:
            static_code=request.GET.get('static_code')
            print(static_code)
            if static_code=='DRAFT':
                prd_list=Page_loged.objects.all()

            else:
                prd_list=Page_loged.objects.filter(StaticCode='DELETED')
        else:
            data=[]
        data=serializers.serialize('json',prd_list)
        return JsonResponse(data,safe=False)

    def post(self,request):
        if request.is_ajax:
            # print(request.POST.get('prd_id')+request.POST.get('prd_printnum'))
            static_code=request.POST.get('static_code')

            record=Page_loged.objects.get(pk=int(request.POST.get('record_id')))
            if static_code=='DELETED':
                record.StaticCode=static_code
                record.DeleteBy=request.user.first_name

                record.DeleteTime=datetime.now()
                record.save()
                prd_list=Page_loged.objects.all()

            else:
                prd_list=Page_loged.objects.all()
        data=serializers.serialize('json',prd_list)
        return JsonResponse(data,safe=False)


@method_decorator([login_required,csrf_protect],name='dispatch')
class ReportView(View):
    def get(self,request):
        template_name='Tango_app/reportpage.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}
        return render(request,template_name,info_dict)


    def post(self,request):
        startTime=request.POST.get('start_time')
        endTime=request.POST.get('end_time')
        reportType=request.POST.get('report_type')
        record_list=getReport(startTime,endTime,reportType)

        data=json.dumps(record_list)
        return JsonResponse(data,safe=False)


class DetilReport(View):
    def get(self,request):
        template_name='Tango_app/detilreport.html'
        info_dict={'username':request.user.username,'first_name':request.user.first_name}

        return render(request,template_name,info_dict)
    def post(self,request):
        startTime=request.POST.get('start_time')
        endTime=request.POST.get('end_time')
        reportType=request.POST.get('report_type')
        record_list=getDetilReport(startTime,endTime,reportType)

        data=serializers.serialize('json',record_list)
        return JsonResponse(data,safe=False)


@method_decorator([login_required,csrf_protect],name='dispatch')
class K_SetersView(View):
    def get(self,request):
        if request.user.is_superuser:
            template_name='Tango_app/KSeter.html'
            info_dict={'username':request.user.username,'first_name':request.user.first_name}
            return render(request,template_name,info_dict)
        else:
            return HttpResponseRedirect('/Tango_app/login/')

    def post(self,request):
        emp_code=request.POST.get('emp_code')
        act_type=request.POST.get('act_type')
        group=Group.objects.get(name='K_Seters')
        try:
            user=User.objects.get(username=emp_code)
        except Exception as e:
            pass
        else:

            if act_type=='ADD':
                addK_seter(user)
            if act_type=='RM':
                rmK_Seters(user)
        record_list=User.objects.filter(groups=group)
        data=serializers.serialize('json',record_list)
        return JsonResponse(data,safe=False)
