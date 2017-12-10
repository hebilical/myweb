from django.conf.urls import  url
from Tango_app.views import IndexView,AboutView,LoginView ,GWView,RegisterView,GW_Mdf_View ,GW_AjaxView,GW_MdfView_ajax
urlpatterns=[
                url(r'^$',IndexView.as_view()),
                url(r'^about', AboutView.as_view()),
                # url(r'^Article/$',ArticleView.as_view()),
                url(r'^login/$',LoginView.as_view()),
                url(r'^gw/$',GWView.as_view()),
                url(r'^register/$',RegisterView.as_view()),
                url(r'^gw/modify/$',GW_Mdf_View.as_view()),
                url(r'^gwajax',GW_AjaxView.as_view()),
                url(r'^gw/modify_ajax',GW_MdfView_ajax.as_view()),
            ]
