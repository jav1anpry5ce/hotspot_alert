from django.contrib import admin
from .models import UserAccount, ResetAccount
from django.contrib.auth.admin import UserAdmin

class UserAccountConfig(UserAdmin):
    search_fields = ("email", "username", "name")
    list_display = ("username", "email",  "last_login")
    readonly_fields = ('date_joined', 'last_login')
    fieldsets = (
        ('Personal Information', {'fields': ('email', 'username', 'name', 'profile_photo', )}),
    ('Permissions', {'fields': ('is_active', 'is_staff', 'is_admin', 'is_superuser', 'groups',)}),
    ('Staff Information', {'fields': ('date_joined', 'last_login',)}),
    )
    add_fieldsets = (
        (None, {'fields': ('email', 'username', 'name', 'password1', 'password2')}),
    )

admin.site.register(UserAccount, UserAccountConfig)
admin.site.register(ResetAccount)