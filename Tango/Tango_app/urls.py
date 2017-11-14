from django.conf.urls import  url
from Tango_app.views import IndexView,AboutView,ArticleView
urlpatterns=[
                url(r'^$',IndexView.as_view()),
                url(r'^about', AboutView.as_view()),
                url(r'^Article/$',ArticleView.as_view()),

            ]
