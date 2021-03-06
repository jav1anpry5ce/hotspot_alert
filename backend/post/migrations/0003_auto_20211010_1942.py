# Generated by Django 3.2.5 on 2021-10-11 00:42

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_auto_20211010_1934'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='id',
            field=models.UUIDField(default=uuid.UUID('fd1e9939-9256-49db-a63d-7342a55d59e9'), primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='comment',
            name='id',
            field=models.UUIDField(default=uuid.UUID('a19d90ae-1b12-4e06-aaf2-786868c2b63b'), primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.UUIDField(default=uuid.UUID('c9c3f0e7-11f3-4de8-9f24-ca965a1067db'), primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
