from rest_framework import serializers
from .models import (
    Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage,
    Subscriber, Volunteer, FAQ, ContributionItem, Comment, Donation
)


class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer para miembros del equipo"""
    class Meta:
        model = TeamMember
        fields = '__all__'


class CerroSerializer(serializers.ModelSerializer):
    """Serializer para cerros"""
    location = serializers.SerializerMethodField()
    geology = serializers.DictField(source='geology_info')
    ecological_value = serializers.DictField(source='ecological_info')
    materials = serializers.DictField(source='materials_info')
    
    class Meta:
        model = Cerro
        fields = [
            'id', 'name', 'altitude', 'location', 'geology', 
            'ecological_value', 'materials', 'legal_status', 
            'threats', 'image'
        ]

    def get_location(self, obj):
        return {
            'municipality': obj.municipality,
            'lat': obj.latitude,
            'lng': obj.longitude
        }


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer para proyectos"""
    startDate = serializers.DateTimeField(source='start_date')
    endDate = serializers.DateTimeField(source='end_date', required=False, allow_null=True)
    budgetRequested = serializers.DecimalField(
        source='budget_requested',
        max_digits=12,
        decimal_places=2,
        required=False,
        allow_null=True
    )
    budgetRaised = serializers.DecimalField(
        source='budget_raised',
        max_digits=12,
        decimal_places=2
    )
    budgetProgress = serializers.ReadOnlyField()
    teamMembers = serializers.PrimaryKeyRelatedField(
        source='team_members',
        many=True,
        queryset=TeamMember.objects.all(),
        required=False
    )

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'content', 'location',
            'latitude', 'longitude', 'status', 'progress',
            'startDate', 'endDate', 'image', 'budgetRequested',
            'budgetRaised', 'budgetProgress', 'objectives',
            'achievements', 'teamMembers', 'partners',
            'gallery_images', 'tags', 'created_at', 'updated_at'
        ]


class EventSerializer(serializers.ModelSerializer):
    """Serializer para eventos"""
    startDatetime = serializers.DateTimeField(source='start_datetime')
    endDatetime = serializers.DateTimeField(source='end_datetime', required=False, allow_null=True)
    maxAttendees = serializers.IntegerField(source='max_attendees', required=False, allow_null=True)
    locationDetails = serializers.CharField(source='location_details', required=False, allow_null=True)
    registrationLink = serializers.URLField(source='registration_link', required=False, allow_null=True)
    contactInfo = serializers.CharField(source='contact_info', required=False, allow_null=True)
    relatedProject = serializers.PrimaryKeyRelatedField(
        source='related_project',
        queryset=Project.objects.all(),
        required=False,
        allow_null=True
    )
    organizers = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=TeamMember.objects.all(),
        required=False
    )
    isFull = serializers.ReadOnlyField(source='is_full')

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'content', 'startDatetime',
            'endDatetime', 'timezone', 'location', 'locationDetails',
            'latitude', 'longitude', 'category', 'attendees',
            'maxAttendees', 'image', 'requirements', 'organizers',
            'contactInfo', 'registrationLink', 'gallery_images',
            'tags', 'relatedProject', 'isFull', 'created_at', 'updated_at'
        ]


class NewsArticleSerializer(serializers.ModelSerializer):
    """Serializer para artículos de noticias"""
    author = TeamMemberSerializer(read_only=True)
    authorId = serializers.PrimaryKeyRelatedField(
        source='author',
        queryset=TeamMember.objects.all(),
        required=False,
        allow_null=True,
        write_only=True
    )
    relatedProject = serializers.PrimaryKeyRelatedField(
        source='related_project',
        queryset=Project.objects.all(),
        required=False,
        allow_null=True
    )
    relatedEvent = serializers.PrimaryKeyRelatedField(
        source='related_event',
        queryset=Event.objects.all(),
        required=False,
        allow_null=True
    )
    galleryImages = serializers.JSONField(source='gallery_images', required=False)
    externalLinks = serializers.JSONField(source='external_links', required=False)

    class Meta:
        model = NewsArticle
        fields = [
            'id', 'title', 'excerpt', 'content', 'category',
            'date', 'author', 'authorId', 'image', 'featured',
            'tags', 'relatedProject', 'relatedEvent', 'galleryImages',
            'externalLinks', 'views', 'created_at', 'updated_at'
        ]


class CommentSerializer(serializers.ModelSerializer):
    """Serializer para comentarios"""
    replies = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = [
            'id', 'project', 'event', 'news_article', 'author_name',
            'author_email', 'content', 'parent', 'approved',
            'created_at', 'replies'
        ]
        read_only_fields = ['approved']

    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentSerializer(obj.replies.filter(approved=True), many=True).data
        return []


class DonationSerializer(serializers.ModelSerializer):
    """Serializer para donaciones"""
    donorName = serializers.CharField(source='donor_name')
    donorEmail = serializers.EmailField(source='donor_email', required=False, allow_null=True)
    
    class Meta:
        model = Donation
        fields = [
            'id', 'project', 'donorName', 'donorEmail',
            'amount', 'message', 'anonymous', 'created_at'
        ]


class GalleryImageSerializer(serializers.ModelSerializer):
    """Serializer para imágenes de galería"""
    imageUrl = serializers.ImageField(source='image')

    class Meta:
        model = GalleryImage
        fields = [
            'id', 'title', 'description', 'imageUrl', 'category',
            'date', 'photographer', 'tags'
        ]


class SubscriberSerializer(serializers.ModelSerializer):
    """Serializer para suscriptores"""
    receiveNews = serializers.BooleanField(source='receive_news')
    receiveEvents = serializers.BooleanField(source='receive_events')
    receiveProjects = serializers.BooleanField(source='receive_projects')
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    
    class Meta:
        model = Subscriber
        fields = [
            'id', 'email', 'phone', 'receiveNews',
            'receiveEvents', 'receiveProjects', 'createdAt'
        ]


class VolunteerSerializer(serializers.ModelSerializer):
    """Serializer para voluntarios"""
    projects = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Project.objects.all(),
        required=False
    )
    events = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Event.objects.all(),
        required=False
    )
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    
    class Meta:
        model = Volunteer
        fields = [
            'id', 'name', 'email', 'phone', 'interests',
            'availability', 'projects', 'events', 'createdAt'
        ]


class FAQSerializer(serializers.ModelSerializer):
    """Serializer para preguntas frecuentes"""
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'order', 'createdAt']


class ContributionItemSerializer(serializers.ModelSerializer):
    """Serializer para formas de contribuir"""
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    
    class Meta:
        model = ContributionItem
        fields = ['id', 'title', 'description', 'image', 'link', 'order', 'createdAt']
