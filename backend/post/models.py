from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class Author(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    account = models.ForeignKey(User, on_delete=models.CASCADE)
    date_joined = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.account.name

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user_key = models.CharField(max_length=255, blank=True, null=True)
    author = models.ForeignKey(Author, blank=True, null=True, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=5000)
    option1 = models.CharField(max_length=255, blank=True, null=True)
    option2 = models.CharField(max_length=255, blank=True, null=True)
    option3 = models.CharField(max_length=255, blank=True, null=True)
    option4 = models.CharField(max_length=255, blank=True, null=True)
    option5 = models.CharField(max_length=255, blank=True, null=True)
    option6 = models.CharField(max_length=255, blank=True, null=True)
    comments = models.ManyToManyField('Comment', blank=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)
    visible = models.BooleanField(default=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return str(self.id)

    def post_image(self):
        if self.image:
            return 'http://javaughnpryce.live:8000' + self.image.url
        return ''
        
    def post_video(self):
        if self.video:
            return 'http://javaughnpryce.live:8000' + self.video.url
        return ''


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    author = models.ForeignKey(Author, blank=True, null=True, on_delete=models.DO_NOTHING)
    user_key = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=2500)

    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return str(self.id)