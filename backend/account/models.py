from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, ** extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.is_admin = True
        user.set_password(password)
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True, blank=True, null=True)
    profile_photo = models.ImageField(upload_to='images/', blank=True, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name']


    def __str__(self):
        return self.name

    def profile_image(self):
        if self.profile_photo:
            return 'http://javaughnpryce.live:8000' + self.profile_photo.url
        return ''


import string    
import random
from django.contrib.auth import get_user_model
User = get_user_model()

def tokenGenerator():
    S = 16
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = S))
    return ran

class ResetAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    token = models.CharField(max_length=16, unique=True, default=tokenGenerator)
    created = models.DateTimeField(blank=True, null=True, auto_now_add=True)

    def __str__(self):
        return self.user.username

class ActivateAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    activate = models.CharField(max_length=16, unique=True, default=tokenGenerator)
    token = models.CharField(max_length=16, unique=True, default=tokenGenerator)
    created = models.DateTimeField(blank=True, null=True, auto_now_add=True)

    def __str__(self):
        return self.user.username

    