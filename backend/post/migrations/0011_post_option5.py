# Generated by Django 3.2.5 on 2021-10-13 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0010_post_option4'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='option5',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
