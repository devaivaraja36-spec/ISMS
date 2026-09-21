from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def report_list(request):
    return Response({'success': True, 'data': [], 'message': 'No reports generated yet.'})
