from rest_framework import viewsets, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Sum, Q
from django.db.models.functions import TruncMonth, TruncYear
from datetime import datetime, timedelta
from collections import defaultdict

from .models import (
    Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage,
    Subscriber, Volunteer, FAQ, ContributionItem, Comment, Donation
)
from .serializers import (
    CerroSerializer, ProjectSerializer, EventSerializer, 
    NewsArticleSerializer, TeamMemberSerializer, GalleryImageSerializer,
    SubscriberSerializer, VolunteerSerializer, FAQSerializer,
    ContributionItemSerializer, CommentSerializer, DonationSerializer
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
            queryset = queryset.filter(start_datetime__gte=start_date)
        if end_date is not None:
            queryset = queryset.filter(start_datetime__lte=end_date)
        return queryset


class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Incrementar vistas
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.filter(active=True)
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


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(approved=True, parent=None)
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        queryset = Comment.objects.filter(approved=True, parent=None)
        project_id = self.request.query_params.get('project', None)
        event_id = self.request.query_params.get('event', None)
        news_id = self.request.query_params.get('news', None)
        
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        elif event_id:
            queryset = queryset.filter(event_id=event_id)
        elif news_id:
            queryset = queryset.filter(news_article_id=news_id)
            
        return queryset


class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    
    def get_queryset(self):
        queryset = Donation.objects.all()
        project_id = self.request.query_params.get('project', None)
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset


@api_view(['GET'])
def statistics(request):
    """
    Endpoint para obtener estadísticas reales del colectivo
    """
    # Estadísticas generales
    total_events = Event.objects.count()
    total_volunteers = Volunteer.objects.count()
    total_projects = Project.objects.count()
    total_cerros = Cerro.objects.count()
    
    # Calcular árboles plantados (estimación basada en eventos de reforestación)
    reforestation_events = Event.objects.filter(category='reforestation').count()
    trees_planted = reforestation_events * 100  # Estimación: 100 árboles por evento
    
    # Si no hay voluntarios en la BD, usar attendees de eventos como proxy
    if total_volunteers == 0:
        total_volunteers = Event.objects.aggregate(total=Sum('attendees'))['total'] or 0
    
    # Actividad mensual (últimos 12 meses)
    today = datetime.now()
    twelve_months_ago = today - timedelta(days=365)
    
    # Obtener eventos por mes
    monthly_events_query = Event.objects.filter(
        start_datetime__gte=twelve_months_ago
    ).annotate(
        month=TruncMonth('start_datetime')
    ).values('month').annotate(
        count=Count('id'),
        total_attendees=Sum('attendees')
    ).order_by('month')
    
    # Crear diccionario para fácil acceso
    events_by_month = {item['month'].month: item for item in monthly_events_query}
    
    # Generar datos para los últimos 12 meses
    months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    monthly_data = []
    
    for i in range(12):
        month_date = today - timedelta(days=30 * (11 - i))
        month_num = month_date.month
        month_name = months[month_num - 1]
        
        # Obtener datos del mes
        month_data = events_by_month.get(month_num, {})
        events_count = month_data.get('count', 0)
        volunteers_count = month_data.get('total_attendees', 0)
        
        monthly_data.append({
            'month': month_name,
            'eventos': events_count,
            'voluntarios': volunteers_count
        })
    
    # Distribución de proyectos por tipo
    project_distribution = []
    
    # Contar eventos por tipo
    event_types = Event.objects.values('category').annotate(count=Count('id'))
    
    type_labels = {
        'cleanup': 'Limpieza',
        'reforestation': 'Reforestación',
        'workshop': 'Educación',
        'conference': 'Conferencias',
        'fundraising': 'Recaudación',
        'other': 'Otros'
    }
    
    type_colors = {
        'cleanup': '#3A6B35',
        'reforestation': '#8BC34A',
        'workshop': '#6F4E37',
        'conference': '#4A90E2',
        'fundraising': '#F5A623',
        'other': '#B8A79B'
    }
    
    total_typed_events = sum(item['count'] for item in event_types)
    
    for item in event_types:
        event_type = item['category']
        count = item['count']
        percentage = (count / total_typed_events * 100) if total_typed_events > 0 else 0
        
        project_distribution.append({
            'id': event_type,
            'label': type_labels.get(event_type, event_type.capitalize()),
            'value': count,
            'color': type_colors.get(event_type, '#B8A79B')
        })
    
    # Si no hay datos, proporcionar datos de ejemplo
    if not project_distribution:
        project_distribution = [
            {'id': 'reforestation', 'label': 'Reforestación', 'value': 5, 'color': '#8BC34A'},
            {'id': 'cleanup', 'label': 'Limpieza', 'value': 3, 'color': '#3A6B35'},
            {'id': 'workshop', 'label': 'Educación', 'value': 4, 'color': '#6F4E37'},
            {'id': 'other', 'label': 'Otros', 'value': 2, 'color': '#B8A79B'}
        ]
    
    return Response({
        'stats': {
            'total_events': total_events,
            'total_volunteers': total_volunteers,
            'trees_planted': trees_planted,
            'protected_cerros': total_cerros
        },
        'monthly_activity': monthly_data,
        'project_distribution': project_distribution
    })
