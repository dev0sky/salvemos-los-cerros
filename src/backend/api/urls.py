from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CerroViewSet, ProjectViewSet, EventViewSet, 
    NewsArticleViewSet, TeamMemberViewSet, GalleryImageViewSet
)

router = DefaultRouter()
router.register(r'cerros', CerroViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'events', EventViewSet)
router.register(r'news', NewsArticleViewSet)
router.register(r'team', TeamMemberViewSet)
router.register(r'gallery', GalleryImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
