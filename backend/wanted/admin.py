from django.contrib import admin
from .models import Wanted

class WantedConfig(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'crime', 'reward','created_at',
    )

admin.site.register(Wanted, WantedConfig)