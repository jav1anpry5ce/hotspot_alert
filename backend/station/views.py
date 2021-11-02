from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from .models import Station
from .serializers import StationSerializer

# @permission_classes(permissions.IsAuthenticated)
@api_view(['GET'])
def get_stations(request):
    try:
        station = Station.objects.all()
        serializer = StationSerializer(station, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)