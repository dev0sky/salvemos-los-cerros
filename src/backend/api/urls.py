from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CerroViewSet, ProjectViewSet, EventViewSet, 
    NewsArticleViewSet, TeamMemberViewSet, GalleryImageViewSet,
    SubscriberViewSet, VolunteerViewSet, FAQViewSet, ContributionItemViewSet,
    statistics
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'cerros', CerroViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'events', EventViewSet)
router.register(r'news', NewsArticleViewSet)
router.register(r'team', TeamMemberViewSet)
router.register(r'gallery', GalleryImageViewSet)
router.register(r'subscribers', SubscriberViewSet)
router.register(r'volunteers', VolunteerViewSet)
router.register(r'faqs', FAQViewSet)
router.register(r'contributions', ContributionItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('statistics/', statistics, name='statistics'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

