from rest_framework import serializers
from .models import Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage, Subscriber, Volunteer, FAQ, ContributionItem

class CerroSerializer(serializers.ModelSerializer):
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
    startDate = serializers.DateField(source='start_date')

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'location', 'status', 'progress', 'startDate', 'image']

class EventSerializer(serializers.ModelSerializer):
    maxAttendees = serializers.IntegerField(source='max_attendees', required=False)

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'time', 'location', 'type', 'attendees', 'maxAttendees', 'image']

class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class GalleryImageSerializer(serializers.ModelSerializer):
    imageUrl = serializers.ImageField(source='image')

    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'description', 'imageUrl', 'category', 'date', 'photographer', 'tags']

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

class ContributionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContributionItem
        fields = '__all__'
