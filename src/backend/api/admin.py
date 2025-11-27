from django.contrib import admin
from .models import (
    Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage,
    Subscriber, Volunteer, FAQ, ContributionItem, Comment, Donation
)


@admin.register(Cerro)
class CerroAdmin(admin.ModelAdmin):
    list_display = ['name', 'altitude', 'municipality']
    search_fields = ['name', 'municipality']
    list_filter = ['municipality']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'active', 'order']
    search_fields = ['name', 'role']
    list_filter = ['active']
    list_editable = ['order', 'active']
    ordering = ['order', 'name']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'progress', 'start_date', 'budget_raised']
    search_fields = ['title', 'description']
    list_filter = ['status', 'start_date']
    filter_horizontal = ['team_members']
    date_hierarchy = 'start_date'
    readonly_fields = ['created_at', 'updated_at', 'budget_progress']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'start_datetime', 'location', 'attendees', 'max_attendees']
    search_fields = ['title', 'description', 'location']
    list_filter = ['category', 'start_datetime']
    filter_horizontal = ['organizers']
    date_hierarchy = 'start_datetime'
    readonly_fields = ['created_at', 'updated_at', 'is_full']


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'author', 'date', 'featured', 'views']
    search_fields = ['title', 'excerpt', 'content']
    list_filter = ['category', 'featured', 'date']
    list_editable = ['featured']
    date_hierarchy = 'date'
    readonly_fields = ['views', 'created_at', 'updated_at']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'content_preview', 'approved', 'created_at']
    search_fields = ['author_name', 'author_email', 'content']
    list_filter = ['approved', 'created_at']
    list_editable = ['approved']
    date_hierarchy = 'created_at'
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Contenido'


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ['donor_name', 'project', 'amount', 'anonymous', 'created_at']
    search_fields = ['donor_name', 'donor_email']
    list_filter = ['anonymous', 'created_at', 'project']
    date_hierarchy = 'created_at'
    readonly_fields = ['created_at']


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'photographer', 'date']
    search_fields = ['title', 'description', 'photographer']
    list_filter = ['category', 'date']
    date_hierarchy = 'date'


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'phone', 'receive_news', 'receive_events', 'receive_projects', 'created_at']
    search_fields = ['email', 'phone']
    list_filter = ['receive_news', 'receive_events', 'receive_projects', 'created_at']
    date_hierarchy = 'created_at'


@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'created_at']
    search_fields = ['name', 'email', 'interests']
    filter_horizontal = ['projects', 'events']
    date_hierarchy = 'created_at'


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'order', 'created_at']
    search_fields = ['question', 'answer']
    list_editable = ['order']
    ordering = ['order', '-created_at']


@admin.register(ContributionItem)
class ContributionItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['order']
    ordering = ['order', '-created_at']
