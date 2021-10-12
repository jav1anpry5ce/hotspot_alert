from rest_framework import serializers
from .models import Wanted

class WantedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wanted
        fields = ('id', 'name', 'crime', 'reward', 'wanted_image',)

class CreateWantedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wanted
        fields = ('name', 'crime', 'reward', 'image')