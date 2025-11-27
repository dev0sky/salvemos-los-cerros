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

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Sum, Q
from django.db.models.functions import TruncMonth, TruncYear
from datetime import datetime, timedelta
from collections import defaultdict

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
    reforestation_events = Event.objects.filter(type='reforestation').count()
    trees_planted = reforestation_events * 100  # Estimación: 100 árboles por evento
    
    # Si no hay voluntarios en la BD, usar attendees de eventos como proxy
    if total_volunteers == 0:
        total_volunteers = Event.objects.aggregate(total=Sum('attendees'))['total'] or 0
    
    # Actividad mensual (últimos 12 meses)
    today = datetime.now()
    twelve_months_ago = today - timedelta(days=365)
    
    # Obtener eventos por mes
    monthly_events_query = Event.objects.filter(
        date__gte=twelve_months_ago
    ).annotate(
        month=TruncMonth('date')
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
    event_types = Event.objects.values('type').annotate(count=Count('id'))
    
    type_labels = {
        'cleanup': 'Limpieza',
        'reforestation': 'Reforestación',
        'workshop': 'Educación',
        'other': 'Defensa Legal'
    }
    
    type_colors = {
        'cleanup': '#3A6B35',
        'reforestation': '#8BC34A',
        'workshop': '#6F4E37',
        'other': '#B8A79B'
    }
    
    total_typed_events = sum(item['count'] for item in event_types)
    
    if total_typed_events > 0:
        for event_type in event_types:
            type_key = event_type['type']
            count = event_type['count']
            percentage = (count / total_typed_events * 100)
            
            project_distribution.append({
                'id': type_labels.get(type_key, 'Otros'),
                'label': type_labels.get(type_key, 'Otros'),
                'value': round(percentage, 1),
                'color': type_colors.get(type_key, '#E0D8D0')
            })
        
        # Ordenar por valor descendente
        project_distribution.sort(key=lambda x: x['value'], reverse=True)
        
        # Asegurar que sume 100%
        total_percentage = sum(item['value'] for item in project_distribution)
        if total_percentage < 100:
            if project_distribution:
                project_distribution[0]['value'] += round(100 - total_percentage, 1)
    else:
        # Datos por defecto si no hay eventos
        project_distribution = [
            {'id': 'Reforestación', 'label': 'Reforestación', 'value': 35, 'color': '#8BC34A'},
            {'id': 'Educación', 'label': 'Educación', 'value': 25, 'color': '#6F4E37'},
            {'id': 'Limpieza', 'label': 'Limpieza', 'value': 20, 'color': '#3A6B35'},
            {'id': 'Defensa Legal', 'label': 'Defensa Legal', 'value': 15, 'color': '#B8A79B'},
            {'id': 'Otros', 'label': 'Otros', 'value': 5, 'color': '#E0D8D0'},
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
