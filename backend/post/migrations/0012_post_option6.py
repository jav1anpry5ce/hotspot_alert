# Generated by Django 3.2.5 on 2021-10-13 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0011_post_option5'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='option6',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
