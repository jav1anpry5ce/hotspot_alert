from rest_framework import serializers
from .models import UserAccount

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = (
        'username',
        'profile_image',
        )