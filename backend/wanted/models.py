from django.db import models
import uuid

class Wanted(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255)
    crime = models.CharField(max_length=255)
    reward = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/', blank=True, null=True, default='default.png')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return str(self.id)

    def wanted_image(self):
        if self.image:
            return 'http://192.168.0.200:8000' + self.image.url
        ''
