from rest_framework import serializers
from .models import Wanted
from post.serializers import CommentSerializer

class WantedSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    class Meta:
        model = Wanted
        fields = ('id', 'name', 'crime', 'reward', 'wanted_image', 'comments', 'visible',)

class CreateWantedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wanted
        fields = ('name', 'crime', 'reward', 'image')