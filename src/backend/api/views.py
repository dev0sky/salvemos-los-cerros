from rest_framework import viewsets, filters
from .models import Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage, Subscriber, Volunteer, FAQ, ContributionItem
from .serializers import (
    CerroSerializer, ProjectSerializer, EventSerializer, 
    NewsArticleSerializer, TeamMemberSerializer, GalleryImageSerializer,
    SubscriberSerializer, VolunteerSerializer, FAQSerializer, ContributionItemSerializer
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

    def get_queryset(self):
        queryset = Event.objects.all()
        start_date = self.request.query_params.get('start', None)
        end_date = self.request.query_params.get('end', None)
        if start_date is not None:
            queryset = queryset.filter(date__gte=start_date)
        if end_date is not None:
            queryset = queryset.filter(date__lte=end_date)
        return queryset

class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer

class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class ContributionItemViewSet(viewsets.ModelViewSet):
    queryset = ContributionItem.objects.all()
    serializer_class = ContributionItemSerializer
