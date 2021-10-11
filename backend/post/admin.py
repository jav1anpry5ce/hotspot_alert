from django.contrib import admin
from .models import Post, Author, Comment

class PostConfig(admin.ModelAdmin):
    list_display = (
        'id',
        'author',
        'title', 
        'created_at'
    )

class AuthorConfig(admin.ModelAdmin):
    list_display = (
        'id',
        'account',
        'date_joined', 
    )

class CommentConfig(admin.ModelAdmin):
    list_display = (
        'id',
        'author',
        'created_at'
    )

admin.site.register(Post, PostConfig)
admin.site.register(Author, AuthorConfig)
admin.site.register(Comment, CommentConfig)
