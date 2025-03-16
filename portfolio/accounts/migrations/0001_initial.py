# Generated by Django 5.1.7 on 2025-03-16 03:59

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone_number', models.CharField(max_length=15)),
                ('address', models.TextField()),
                ('wallet', models.IntegerField(default=0)),
                ('bank_account', models.CharField(max_length=50)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, related_name='customuser_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='customuser_permissions_set', to='auth.permission')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='StockPurchase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(default='None', max_length=10)),
                ('company_name', models.CharField(max_length=255)),
                ('price', models.FloatField()),
                ('quantity', models.IntegerField()),
                ('purchased_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
