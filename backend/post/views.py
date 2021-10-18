from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import filters

from .models import Post, Author, Comment
from .serializers import PostSerializer, CreatePostSerializer

from wanted.models import Wanted
from wanted.serializers import WantedSerializer


class UserFiltering(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if request.user.is_authenticated:
            return queryset.all()
        return queryset.filter(visible=True)

class PostViewSet(ListAPIView):
    queryset = Post.objects.all().exclude(title='Missing Person')
    serializer_class = PostSerializer  
    filter_backends = [UserFiltering]


class MissingPersonViewSet(ListAPIView):
    queryset = Post.objects.filter(title='Missing Person')
    serializer_class = PostSerializer
    filter_backends = [UserFiltering]


class PostView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        try:
            print(request.data)
            if request.data.get('title') == 'Missing Person':
                if request.user.is_authenticated:
                    serializer = CreatePostSerializer(data=request.data)
                    if serializer.is_valid():
                        author = Author.objects.get(account=request.user)
                        serializer.save(author=author)
                        return Response(status=status.HTTP_201_CREATED)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                return Response({'Message': 'You are not authorized to create a missing person.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer = CreatePostSerializer(data=request.data)
                if serializer.is_valid():
                    if request.user.is_authenticated:
                        author = Author.objects.get(account=request.user)
                        serializer.save(author=author)
                    else:
                        serializer.save()
                    return Response(status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'Message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_post(request, id):
    try:
        post = Post.objects.get(id=id)
        serializer = PostSerializer(post)
        if post.visible:
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.user.is_authenticated and post.visible == False:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'Message': 'This post is no longer available or has been removed.'}, status=status.HTTP_404_NOT_FOUND)
    except:
        return Response({'Message': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_comment(request):
    try:
        if request.user.is_authenticated:
            author = Author.objects.get(account=request.user)
            comment = Comment.objects.create(description=request.data.get('description'), author=author)
        else:
            comment = Comment.objects.create(description=request.data.get('description'), user_key=request.data.get('user_key'))
        post = Post.objects.get(id=request.data.get('id'))
        post.comments.add(comment)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        return Response({'Message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_wanted_comment(request):
    try:
        if request.user.is_authenticated:
            author = Author.objects.get(account=request.user)
            comment = Comment.objects.create(description=request.data.get('description'), author=author)
        else:
            comment = Comment.objects.create(description=request.data.get('description'), user_key=request.data.get('user_key'))
        wanted = Wanted.objects.get(id=request.data.get('id'))
        wanted.comments.add(comment)
        serializer = WantedSerializer(wanted)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        return Response({'Message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def set_visibility(request):
    try:
        post = Post.objects.get(id=request.data.get('id'))
        post.visible = not(post.visible)
        post.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except:
        return Response({'Message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
