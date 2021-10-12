from django.urls import path
from .consumers import WSConsumer
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator, OriginValidator

ws_urlpatterns = [
    path('ws/post/', WSConsumer.as_asgi()),
]

# application = ProtocolTypeRouter({
#     'websocket': AllowedHostsOriginValidator(
#         AuthMiddlewareStack(
#             URLRouter(
#                 [
#                     path('ws/post/', WSConsumer)
#                 ]
#             )
#         )
#     )
# })