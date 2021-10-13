from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import permission_classes
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .models import Wanted
from .serializers import WantedSerializer, CreateWantedSerializer

class WantedList(ListAPIView):
    queryset = Wanted.objects.all()
    serializer_class = WantedSerializer

class WantedView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        if request.user.is_authenticated:
            serializer = CreateWantedSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': True}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Message': 'You are not authorized to make this request'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_wanted_post(request, id):
    try:
        wanted = Wanted.objects.get(id=id)
        serializer = WantedSerializer(wanted)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'Message': 'Post does not exist.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def set_visibility(request):
    try:
        wanted = Wanted.objects.get(id=request.data.get('id'))
        wanted.visible = not(wanted.visible)
        wanted.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except:
        return Response({'Message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
