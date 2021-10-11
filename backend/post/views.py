from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .models import Post, Author, Comment
from .serializers import PostSerializer, CreatePostSerializer

class PostViewSet(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        print(request.data)
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            if request.user.is_authenticated:
                author = Author.objects.get(account=request.user)
                serializer.save(author=author)
            else:
                serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_post(request, id):
    post = Post.objects.get(id=id)
    serializer = PostSerializer(post)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_comment(request):
    if request.user.is_authenticated:
        author = Author.objects.get(account=request.user)
        comment = Comment.objects.create(description=request.data.get('description'), author=author)
    else:
        comment = Comment.objects.create(description=request.data.get('description'))
    post = Post.objects.get(id=request.data.get('id'))
    post.comments.add(comment)
    serializer = PostSerializer(post)
    return Response(serializer.data, status=status.HTTP_201_CREATED)