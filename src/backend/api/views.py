from rest_framework import viewsets
from .models import Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage
from .serializers import (
    CerroSerializer, ProjectSerializer, EventSerializer, 
    NewsArticleSerializer, TeamMemberSerializer, GalleryImageSerializer
)

class CerroViewSet(viewsets.ModelViewSet):
    queryset = Cerro.objects.all()
    serializer_class = CerroSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
