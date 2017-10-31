from django.db import models


# Create your models here.
class Category(models.Model):
    ID=models.CharField(primary_key=True,max_length=128);
    name=models.CharField(max_length=128);
    createtime=models.DateTimeField(auto_now=True);
    createBy=models.CharField(max_length=128,null=True);
    updatetime=models.DateTimeField();
    updateBy=models.CharField(max_length=128,default=None);
    remark=models.CharField(max_length=500,default=None);


class Article(models.Model):
    category=models.ForeignKey(Category);
    title=models.CharField(max_length=200,null=False);

    context=models.CharField(max_length=5000,null=True);
    author=models.CharField(max_length=128);
    createtime=models.DateTimeField(auto_now=True);
    updatetime=models.DateTimeField(auto_now=True);
    views=models.IntegerField(default=0);
    likes=models.IntegerField(default=0);

class Article_Author(models.Model):

    name=models.CharField(max_length=128,null=False);
