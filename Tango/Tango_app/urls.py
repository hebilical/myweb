from django.conf.urls import  url
from Tango_app.views import IndexView,AboutView,LoginView ,GWView,RegisterView,GW_Mdf_View,GW_AjaxView,GW_MdfView_ajax,PRD_View,PRD_ViewAjax,PRD_MdfView,PRD_MdfViewAjax,DF_View,DF_AjaxView,DF_MdfView,DF_MdfViewAjax,ZJ_View,ZJ_AjaxView,ZJ_MdfView,ZJ_MdfViewAjax,OUT_View,OUT_AjaxView,OUT_MdfView,OUT_MdfViewAjax,PageLogView,PageLog_AjaxView,select2_test
urlpatterns=[
                url(r'^$',IndexView.as_view()),#主页
                url(r'^about', AboutView.as_view()),
                # url(r'^Article/$',ArticleView.as_view()),
                url(r'^login/$',LoginView.as_view()),
                url(r'^gw/$',GWView.as_view()),#工务页
                url(r'^register/$',RegisterView.as_view()),#用户注册
                url(r'^gw/modify/$',GW_Mdf_View.as_view()),#工务系数设置页
                url(r'^gwajax',GW_AjaxView.as_view()),#工务页Ajax请求接收
                url(r'^gw/modify_ajax',GW_MdfView_ajax.as_view()),#工务系数设置页Ajax请求接收
                url(r'^prd/$',PRD_View.as_view()),#制作页
                url(r'^prdAjax/$',PRD_ViewAjax.as_view()),#制作页Ajax请求接收
                url(r'^prd/modify/$',PRD_MdfView.as_view()),#制作系数修改页
                url(r'^prd/modify_ajax/$',PRD_MdfViewAjax.as_view()),#制作系数修改Ajax接收
                url(r'^df/$',DF_View.as_view()),#电分页
                url(r'^dfAjax/$',DF_AjaxView.as_view()),#电分页Ajax接收
                url(r'^df/modify/$',DF_MdfView.as_view()),#电分修改页
                url(r'^df/modify_ajax/$',DF_MdfViewAjax.as_view()),#电分修改页Ajax接收
                url(r'^zj/$',ZJ_View.as_view()),
                url(r'^zjAjax/$',ZJ_AjaxView.as_view()),
                url(r'^zj/modify/$',ZJ_MdfView.as_view()),
                url(r'^zj/modify_ajax/$',ZJ_MdfViewAjax.as_view()),
                url(r'^out/$',OUT_View.as_view()),
                url(r'^outputAjax/$',OUT_AjaxView.as_view()),
                url(r'^out/modify/$',OUT_MdfView.as_view()),
                url(r'^out/modify_ajax/$',OUT_MdfViewAjax.as_view()),
                url(r'^pagelog/$',PageLogView.as_view()),
                url(r'^pagelogajax/$',PageLog_AjaxView.as_view()),
                url(r'^select/$',select2_test.as_view()),
            ]
