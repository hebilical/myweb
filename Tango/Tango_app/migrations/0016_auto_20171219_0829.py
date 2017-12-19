# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-12-19 08:29
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tango_app', '0015_auto_20171218_1027'),
    ]

    operations = [
        migrations.AddField(
            model_name='gw_pre_table',
            name='WorkTimeType',
            field=models.CharField(choices=[('A', '白班'), ('B', '夜班')], default='A', max_length=10),
        ),
        migrations.AlterField(
            model_name='gw_pre_table',
            name='WorkData',
            field=models.DateField(default=datetime.date(2017, 12, 19)),
        ),
    ]
