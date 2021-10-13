from rest_framework import serializers
from .models import Author, Post, Comment
from account.serializers import AccountSerializer


class AuthorSerializer(serializers.ModelSerializer):
    account = AccountSerializer()
    class Meta:
        model = Author
        fields = (
            'account',
        )

class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    class Meta:
        model = Comment
        fields = (
            'id',
            'author',
            'created_at',
            'description',
            'user_key',
        )

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    comments = CommentSerializer(many=True)
    class Meta:
        model = Post
        fields = (
            'id',
            'user_key',
            'author',
            'created_at', 
            'author',
            'title',
            'description',
            'option1',
            'option2',
            'option3',
            'option4',
            'option5',
            'option6',
            'comments',
            'post_image',
            'post_video',
            'visible',
        )

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'title',
            'user_key',
            'description',
            'image',
            'option1',
            'option2',
            'option3',
            'option4',
            'option5',
            'option6',
            'video',
        )