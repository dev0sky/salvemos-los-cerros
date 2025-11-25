from django.db import models

class Cerro(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=200)
    altitude = models.IntegerField()
    municipality = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    geology_info = models.JSONField(default=dict)
    ecological_info = models.JSONField(default=dict)
    materials_info = models.JSONField(default=dict)
    legal_status = models.JSONField(default=dict)
    threats = models.JSONField(default=list)
    image = models.ImageField(upload_to='cerros/', null=True, blank=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('planned', 'Planned'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    progress = models.IntegerField(default=0)
    start_date = models.DateField()
    image = models.ImageField(upload_to='projects/', null=True, blank=True)

    def __str__(self):
        return self.title

class Event(models.Model):
    TYPE_CHOICES = [
        ('cleanup', 'Cleanup'),
        ('reforestation', 'Reforestation'),
        ('workshop', 'Workshop'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    attendees = models.IntegerField(default=0)
    max_attendees = models.IntegerField(null=True, blank=True)
    image = models.ImageField(upload_to='events/', null=True, blank=True)

    def __str__(self):
        return self.title

class NewsArticle(models.Model):
    CATEGORY_CHOICES = [
        ('conservation', 'Conservation'),
        ('events', 'Events'),
        ('education', 'Education'),
    ]

    title = models.CharField(max_length=200)
    excerpt = models.TextField()
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    date = models.DateField(auto_now_add=True)
    author = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='news/', null=True, blank=True)
    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField()
    email = models.EmailField(null=True, blank=True)
    image = models.ImageField(upload_to='team/', null=True, blank=True)

    def __str__(self):
        return self.name

class GalleryImage(models.Model):
    CATEGORY_CHOICES = [
        ('project', 'Project'),
        ('event', 'Event'),
        ('nature', 'Nature'),
        ('team', 'Team'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    date = models.DateField(auto_now_add=True)
    photographer = models.CharField(max_length=100, null=True, blank=True)
    tags = models.JSONField(default=list)

    def __str__(self):
        return self.title
