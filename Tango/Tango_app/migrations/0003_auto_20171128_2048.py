# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-11-28 20:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tango_app', '0002_auto_20171128_1613'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gw_pre_table',
            name='WorkData',
            field=models.CharField(max_length=20, null=True),
        ),
    ]