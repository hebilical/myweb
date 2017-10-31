# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-10-31 12:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('url', models.URLField(default='^Tango_app/')),
                ('context', models.CharField(max_length=50000, null=True)),
                ('author', models.CharField(max_length=128)),
                ('createtime', models.DateTimeField(auto_now=True)),
                ('updatetime', models.DateTimeField(auto_now=True)),
                ('views', models.IntegerField(default=0)),
                ('likes', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Article_Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('ID', models.CharField(max_length=128, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=128)),
                ('createtime', models.DateTimeField(auto_now=True)),
                ('createBy', models.CharField(max_length=128, null=True)),
                ('updatetime', models.DateTimeField()),
                ('updateBy', models.CharField(default=None, max_length=128)),
                ('remark', models.CharField(default=None, max_length=500)),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tango_app.Category'),
        ),
    ]
