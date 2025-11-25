from django.contrib import admin
from .models import Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage

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
