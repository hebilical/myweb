from django.db import models


# Create your models here.
class Category(models.Model):
    ID=models.CharField(primary_key=True,max_length=128);
    name=models.CharField(max_length=128);
    createtime=models.DateTimeField(auto_now=True);
    createBy=models.CharField(max_length=128,null=True);
    updatetime=models.DateTimeField(null=True);
    updateBy=models.CharField(max_length=128,null=True);
    remark=models.CharField(max_length=500,null=True);
    def __str__(self):
        return self.name

class Article_Author(models.Model):
    name=models.CharField(max_length=128,null=False);
    Email=models.EmailField(null=True);
    tel=models.CharField(max_length=15,null=True);
    def  __str__(self):
        return self.name


class Article(models.Model):
    category=models.ManyToManyField(Category);
    title=models.CharField(max_length=200,null=False);
    context=models.CharField(max_length=5000,null=True);
    author=models.ForeignKey(Article_Author);
    createtime=models.DateTimeField(auto_now=True);
    updatetime=models.DateTimeField(auto_now=True);
    views=models.IntegerField(default=0);
    likes=models.IntegerField(default=0);
    def __str__(self):
        return self.title
