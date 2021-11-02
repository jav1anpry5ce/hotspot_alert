# Generated by Django 3.2.5 on 2021-10-26 19:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('station', '0001_initial'),
        ('account', '0003_useraccount_is_admin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='name',
            new_name='first_name',
        ),
        migrations.AddField(
            model_name='useraccount',
            name='last_name',
            field=models.CharField(default='name', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='useraccount',
            name='station',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='station.station'),
        ),
    ]
