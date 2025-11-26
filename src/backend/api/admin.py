from django.contrib import admin
from .models import Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage, Subscriber, Volunteer, FAQ, ContributionItem

@admin.register(Cerro)
class CerroAdmin(admin.ModelAdmin):
    list_display = ('name', 'altitude', 'municipality')
    search_fields = ('name', 'municipality')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'progress', 'start_date')
    list_filter = ('status',)
    search_fields = ('title', 'location')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'type', 'attendees')
    list_filter = ('type', 'date')
    search_fields = ('title', 'location')

@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'author', 'featured')
    list_filter = ('category', 'featured', 'date')
    search_fields = ('title', 'content')

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'email')
    search_fields = ('name', 'role')

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'photographer')
    list_filter = ('category', 'date')
    search_fields = ('title', 'description')

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone', 'receive_news', 'receive_events', 'receive_projects', 'created_at')
    list_filter = ('receive_news', 'receive_events', 'receive_projects', 'created_at')
    search_fields = ('email', 'phone')

@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'project', 'event', 'created_at')
    list_filter = ('project', 'event', 'created_at')
    search_fields = ('name', 'email', 'interests')

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'order', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('question', 'answer')
    ordering = ('order', '-created_at')

@admin.register(ContributionItem)
class ContributionItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'link', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    ordering = ('order', '-created_at')
