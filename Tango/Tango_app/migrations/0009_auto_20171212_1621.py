# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-12-12 16:21
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tango_app', '0008_auto_20171211_1628'),
    ]

    operations = [
        migrations.CreateModel(
            name='DF_table',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PrintNum', models.CharField(max_length=20)),
                ('PrintName', models.CharField(max_length=200)),
                ('SubCode', models.CharField(default='A', max_length=10)),
                ('WorkType', models.CharField(choices=[('SCAN_FS', '扫描反射稿'), ('SCAN_TS', '扫描透射稿'), ('SCAN_COPYDOT', 'COPYDOT'), ('COR_NEW', '调色新作'), ('COR_GB', '调色改版'), ('COR_ZCTY', '追传统样')], max_length=20)),
                ('WorkData', models.DateField(null=True)),
                ('WorkTimeType', models.CharField(choices=[('A', '白班'), ('B', '夜班')], default='A', max_length=10)),
                ('FinishQty', models.IntegerField(default=0)),
                ('Scan_K_val', models.FloatField(default=0.0)),
                ('Week_val', models.FloatField(default=0.0)),
                ('LeaderCode', models.CharField(max_length=20)),
                ('LeaderName', models.CharField(max_length=50)),
                ('WorkStartTime', models.DateTimeField(null=True)),
                ('WorkEndTime', models.DateTimeField(null=True)),
                ('createtime', models.DateTimeField(auto_now_add=True)),
                ('createBy', models.CharField(max_length=20, null=True)),
                ('updatetime', models.DateTimeField(null=True)),
                ('updateBy', models.CharField(max_length=20, null=True)),
                ('posttime', models.DateTimeField(null=True)),
                ('postBy', models.CharField(max_length=20, null=True)),
                ('CheckTime', models.DateTimeField(null=True)),
                ('CheckBy', models.CharField(max_length=20, null=True)),
                ('staticcode', models.CharField(choices=[('DRAFT', '初稿'), ('POST', '已过帐'), ('CHECKED', '已审核'), ('DELETED', '已删除')], default='DRAFT', max_length=20)),
                ('remark', models.TextField(max_length=200)),
            ],
        ),
        migrations.AlterField(
            model_name='gw_pre_table',
            name='WorkData',
            field=models.DateField(default=datetime.date(2017, 12, 12)),
        ),
    ]