from django.contrib import admin
from .models import UserAccount, ResetAccount
from django.contrib.auth.admin import UserAdmin

class UserAccountConfig(UserAdmin):
    search_fields = ("email", "username", "first_name", "last_name")
    list_display = ("username", "email",  "last_login")
    readonly_fields = ('date_joined', 'last_login')
    fieldsets = (
        ('Personal Information', {'fields': ('email', 'username', 'first_name', 'last_name', 'profile_photo', )}),
    ('Permissions', {'fields': ('is_active', 'is_staff', 'is_admin', 'is_superuser')}),
    ('Staff Information', {'fields': ('station', 'account_type', 'date_joined', 'last_login',)}),
    )
    add_fieldsets = (
        (None, {'fields': ('email', 'username', 'first_name', 'last_name', 'account_type', 'password1', 'password2')}),
    )

admin.site.register(UserAccount, UserAccountConfig)
admin.site.register(ResetAccount)