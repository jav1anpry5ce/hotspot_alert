# Generated by Django 3.2.5 on 2021-10-11 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0005_auto_20211010_2206'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ('created_at',)},
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='images/'),
        ),
    ]
