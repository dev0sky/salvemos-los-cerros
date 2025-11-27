from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class Cerro(models.Model):
    """Modelo para representar los cerros protegidos"""
    id = models.CharField(
        max_length=100, 
        primary_key=True,
        verbose_name="Identificador"
    )
    name = models.CharField(
        max_length=200,
        verbose_name="Nombre"
    )
    altitude = models.IntegerField(
        verbose_name="Altitud (msnm)",
        help_text="Altitud en metros sobre el nivel del mar"
    )
    municipality = models.CharField(
        max_length=200,
        verbose_name="Municipio"
    )
    latitude = models.FloatField(
        verbose_name="Latitud"
    )
    longitude = models.FloatField(
        verbose_name="Longitud"
    )
    geology_info = models.JSONField(
        default=dict,
        verbose_name="Información geológica",
        blank=True
    )
    ecological_info = models.JSONField(
        default=dict,
        verbose_name="Información ecológica",
        blank=True
    )
    materials_info = models.JSONField(
        default=dict,
        verbose_name="Información de materiales",
        blank=True
    )
    legal_status = models.JSONField(
        default=dict,
        verbose_name="Estado legal",
        blank=True
    )
    threats = models.JSONField(
        default=list,
        verbose_name="Amenazas",
        blank=True
    )
    image = models.ImageField(
        upload_to='cerros/',
        null=True,
        blank=True,
        verbose_name="Imagen principal"
    )

    class Meta:
        verbose_name = "Cerro"
        verbose_name_plural = "Cerros"
        ordering = ['name']

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    """Modelo para representar miembros del equipo"""
    name = models.CharField(
        max_length=100,
        verbose_name="Nombre completo"
    )
    role = models.CharField(
        max_length=100,
        verbose_name="Rol/Cargo"
    )
    bio = models.TextField(
        verbose_name="Biografía"
    )
    email = models.EmailField(
        null=True,
        blank=True,
        verbose_name="Correo electrónico"
    )
    phone = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        verbose_name="Teléfono"
    )
    image = models.ImageField(
        upload_to='team/',
        null=True,
        blank=True,
        verbose_name="Foto"
    )
    
    # Social media links
    linkedin = models.URLField(
        null=True,
        blank=True,
        verbose_name="LinkedIn"
    )
    twitter = models.URLField(
        null=True,
        blank=True,
        verbose_name="Twitter/X"
    )
    facebook = models.URLField(
        null=True,
        blank=True,
        verbose_name="Facebook"
    )
    instagram = models.URLField(
        null=True,
        blank=True,
        verbose_name="Instagram"
    )
    website = models.URLField(
        null=True,
        blank=True,
        verbose_name="Sitio web personal"
    )
    
    # Additional information
    contributions = models.TextField(
        null=True,
        blank=True,
        verbose_name="Contribuciones al proyecto",
        help_text="Descripción de las contribuciones realizadas"
    )
    specialties = models.JSONField(
        default=list,
        verbose_name="Especialidades",
        help_text="Áreas de expertise",
        blank=True
    )
    joined_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Fecha de ingreso"
    )
    active = models.BooleanField(
        default=True,
        verbose_name="Activo"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Orden de visualización"
    )

    class Meta:
        verbose_name = "Miembro del equipo"
        verbose_name_plural = "Miembros del equipo"
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} - {self.role}"


class Project(models.Model):
    """Modelo para representar proyectos de conservación"""
    STATUS_CHOICES = [
        ('active', 'Activo'),
        ('completed', 'Completado'),
        ('planned', 'Planificado'),
        ('paused', 'Pausado'),
    ]
    
    title = models.CharField(
        max_length=200,
        verbose_name="Título"
    )
    description = models.TextField(
        verbose_name="Descripción breve"
    )
    content = models.TextField(
        null=True,
        blank=True,
        verbose_name="Contenido detallado",
        help_text="Contenido en formato Markdown"
    )
    location = models.CharField(
        max_length=200,
        verbose_name="Ubicación"
    )
    latitude = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Latitud"
    )
    longitude = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Longitud"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='planned',
        verbose_name="Estado"
    )
    progress = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Progreso (%)",
        help_text="Porcentaje de completitud del proyecto"
    )
    start_date = models.DateTimeField(
        verbose_name="Fecha de inicio"
    )
    end_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Fecha de finalización"
    )
    image = models.ImageField(
        upload_to='projects/',
        null=True,
        blank=True,
        verbose_name="Imagen principal"
    )
    
    # Financial information
    budget_requested = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Presupuesto solicitado",
        help_text="Monto total solicitado para el proyecto"
    )
    budget_raised = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        verbose_name="Presupuesto recabado",
        help_text="Monto recaudado hasta el momento"
    )
    
    # Additional details
    objectives = models.JSONField(
        default=list,
        verbose_name="Objetivos",
        help_text="Lista de objetivos del proyecto",
        blank=True
    )
    achievements = models.JSONField(
        default=list,
        verbose_name="Logros",
        help_text="Lista de logros alcanzados",
        blank=True
    )
    team_members = models.ManyToManyField(
        TeamMember,
        related_name='projects',
        blank=True,
        verbose_name="Miembros del equipo"
    )
    partners = models.JSONField(
        default=list,
        verbose_name="Socios/Aliados",
        help_text="Organizaciones asociadas",
        blank=True
    )
    gallery_images = models.JSONField(
        default=list,
        verbose_name="Galería de imágenes",
        help_text="URLs de imágenes adicionales",
        blank=True
    )
    tags = models.JSONField(
        default=list,
        verbose_name="Etiquetas",
        blank=True
    )
    
    # Metadata
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de creación"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Última actualización"
    )

    class Meta:
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    @property
    def budget_progress(self):
        """Calcula el porcentaje de presupuesto recaudado"""
        if self.budget_requested and self.budget_requested > 0:
            return (self.budget_raised / self.budget_requested) * 100
        return 0


class Event(models.Model):
    """Modelo para representar eventos"""
    EVENT_CATEGORY_CHOICES = [
        ('cleanup', 'Limpieza'),
        ('reforestation', 'Reforestación'),
        ('workshop', 'Taller'),
        ('conference', 'Conferencia'),
        ('fundraising', 'Recaudación de fondos'),
        ('other', 'Otro'),
    ]

    title = models.CharField(
        max_length=200,
        verbose_name="Título"
    )
    description = models.TextField(
        verbose_name="Descripción breve"
    )
    content = models.TextField(
        null=True,
        blank=True,
        verbose_name="Contenido detallado",
        help_text="Contenido en formato Markdown"
    )
    start_datetime = models.DateTimeField(
        verbose_name="Fecha y hora de inicio"
    )
    end_datetime = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Fecha y hora de finalización"
    )
    timezone = models.CharField(
        max_length=50,
        default='America/Mexico_City',
        verbose_name="Zona horaria",
        help_text="Zona horaria del evento"
    )
    location = models.CharField(
        max_length=200,
        verbose_name="Ubicación"
    )
    location_details = models.TextField(
        null=True,
        blank=True,
        verbose_name="Detalles de ubicación",
        help_text="Punto de encuentro, direcciones, etc."
    )
    latitude = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Latitud"
    )
    longitude = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Longitud"
    )
    category = models.CharField(
        max_length=20,
        choices=EVENT_CATEGORY_CHOICES,
        default='other',
        verbose_name="Categoría"
    )
    attendees = models.IntegerField(
        default=0,
        verbose_name="Asistentes registrados"
    )
    max_attendees = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Capacidad máxima"
    )
    image = models.ImageField(
        upload_to='events/',
        null=True,
        blank=True,
        verbose_name="Imagen principal"
    )
    
    # Additional details
    requirements = models.JSONField(
        default=list,
        verbose_name="Requisitos",
        help_text="Qué traer, preparación necesaria, etc.",
        blank=True
    )
    organizers = models.ManyToManyField(
        TeamMember,
        related_name='organized_events',
        blank=True,
        verbose_name="Organizadores"
    )
    contact_info = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name="Información de contacto"
    )
    registration_link = models.URLField(
        null=True,
        blank=True,
        verbose_name="Enlace de registro"
    )
    gallery_images = models.JSONField(
        default=list,
        verbose_name="Galería de fotos",
        blank=True
    )
    tags = models.JSONField(
        default=list,
        verbose_name="Etiquetas",
        blank=True
    )
    related_project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='events',
        verbose_name="Proyecto relacionado"
    )
    
    # Metadata
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de creación"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Última actualización"
    )

    class Meta:
        verbose_name = "Evento"
        verbose_name_plural = "Eventos"
        ordering = ['-start_datetime']

    def __str__(self):
        return self.title

    @property
    def is_full(self):
        """Verifica si el evento está lleno"""
        if self.max_attendees:
            return self.attendees >= self.max_attendees
        return False


class NewsArticle(models.Model):
    """Modelo para representar artículos de noticias"""
    CATEGORY_CHOICES = [
        ('conservation', 'Conservación'),
        ('events', 'Eventos'),
        ('education', 'Educación'),
        ('community', 'Comunidad'),
        ('achievements', 'Logros'),
    ]

    title = models.CharField(
        max_length=200,
        verbose_name="Título"
    )
    excerpt = models.TextField(
        verbose_name="Extracto",
        help_text="Resumen breve del artículo"
    )
    content = models.TextField(
        verbose_name="Contenido",
        help_text="Contenido completo en formato Markdown"
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='community',
        verbose_name="Categoría"
    )
    date = models.DateTimeField(
        default=timezone.now,
        verbose_name="Fecha de publicación"
    )
    author = models.ForeignKey(
        TeamMember,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='articles',
        verbose_name="Autor"
    )
    image = models.ImageField(
        upload_to='news/',
        null=True,
        blank=True,
        verbose_name="Imagen principal"
    )
    featured = models.BooleanField(
        default=False,
        verbose_name="Destacado"
    )
    
    # Additional details
    tags = models.JSONField(
        default=list,
        verbose_name="Etiquetas",
        blank=True
    )
    related_project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='news_articles',
        verbose_name="Proyecto relacionado"
    )
    related_event = models.ForeignKey(
        Event,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='news_articles',
        verbose_name="Evento relacionado"
    )
    gallery_images = models.JSONField(
        default=list,
        verbose_name="Galería de imágenes",
        blank=True
    )
    external_links = models.JSONField(
        default=list,
        verbose_name="Enlaces externos",
        blank=True
    )
    views = models.IntegerField(
        default=0,
        verbose_name="Visualizaciones"
    )
    
    # Metadata
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de creación"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Última actualización"
    )

    class Meta:
        verbose_name = "Artículo de noticias"
        verbose_name_plural = "Artículos de noticias"
        ordering = ['-date']

    def __str__(self):
        return self.title


class Comment(models.Model):
    """Modelo para comentarios en proyectos, eventos y noticias"""
    # Generic relation fields
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='comments',
        verbose_name="Proyecto"
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='comments',
        verbose_name="Evento"
    )
    news_article = models.ForeignKey(
        NewsArticle,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='comments',
        verbose_name="Artículo"
    )
    
    # Comment data
    author_name = models.CharField(
        max_length=100,
        verbose_name="Nombre del autor"
    )
    author_email = models.EmailField(
        verbose_name="Email del autor"
    )
    content = models.TextField(
        verbose_name="Contenido"
    )
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies',
        verbose_name="Comentario padre"
    )
    approved = models.BooleanField(
        default=False,
        verbose_name="Aprobado"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de creación"
    )

    class Meta:
        verbose_name = "Comentario"
        verbose_name_plural = "Comentarios"
        ordering = ['-created_at']

    def __str__(self):
        return f"Comentario de {self.author_name}"


class Donation(models.Model):
    """Modelo para registrar donaciones a proyectos"""
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='donations',
        verbose_name="Proyecto"
    )
    donor_name = models.CharField(
        max_length=200,
        verbose_name="Nombre del donante"
    )
    donor_email = models.EmailField(
        null=True,
        blank=True,
        verbose_name="Email del donante"
    )
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name="Monto"
    )
    message = models.TextField(
        null=True,
        blank=True,
        verbose_name="Mensaje"
    )
    anonymous = models.BooleanField(
        default=False,
        verbose_name="Donación anónima"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de donación"
    )

    class Meta:
        verbose_name = "Donación"
        verbose_name_plural = "Donaciones"
        ordering = ['-created_at']

    def __str__(self):
        if self.anonymous:
            return f"Donación anónima - ${self.amount}"
        return f"Donación de {self.donor_name} - ${self.amount}"


class GalleryImage(models.Model):
    """Modelo para imágenes de la galería"""
    CATEGORY_CHOICES = [
        ('project', 'Proyecto'),
        ('event', 'Evento'),
        ('nature', 'Naturaleza'),
        ('team', 'Equipo'),
    ]

    title = models.CharField(
        max_length=200,
        verbose_name="Título"
    )
    description = models.TextField(
        null=True,
        blank=True,
        verbose_name="Descripción"
    )
    image = models.ImageField(
        upload_to='gallery/',
        verbose_name="Imagen"
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        verbose_name="Categoría"
    )
    date = models.DateTimeField(
        default=timezone.now,
        verbose_name="Fecha"
    )
    photographer = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Fotógrafo"
    )
    tags = models.JSONField(
        default=list,
        verbose_name="Etiquetas",
        blank=True
    )

    class Meta:
        verbose_name = "Imagen de galería"
        verbose_name_plural = "Imágenes de galería"
        ordering = ['-date']

    def __str__(self):
        return self.title


class Subscriber(models.Model):
    """Modelo para suscriptores del boletín"""
    email = models.EmailField(
        unique=True,
        null=True,
        blank=True,
        verbose_name="Email"
    )
    phone = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        verbose_name="Teléfono"
    )
    receive_news = models.BooleanField(
        default=True,
        verbose_name="Recibir noticias"
    )
    receive_events = models.BooleanField(
        default=True,
        verbose_name="Recibir eventos"
    )
    receive_projects = models.BooleanField(
        default=True,
        verbose_name="Recibir proyectos"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de suscripción"
    )

    class Meta:
        verbose_name = "Suscriptor"
        verbose_name_plural = "Suscriptores"
        ordering = ['-created_at']

    def __str__(self):
        return self.email or self.phone


class Volunteer(models.Model):
    """Modelo para voluntarios"""
    name = models.CharField(
        max_length=200,
        verbose_name="Nombre completo"
    )
    email = models.EmailField(
        verbose_name="Email"
    )
    phone = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        verbose_name="Teléfono"
    )
    interests = models.TextField(
        verbose_name="Intereses",
        help_text="Áreas de interés para voluntariado"
    )
    availability = models.CharField(
        max_length=100,
        verbose_name="Disponibilidad"
    )
    projects = models.ManyToManyField(
        Project,
        related_name='volunteers',
        blank=True,
        verbose_name="Proyectos"
    )
    events = models.ManyToManyField(
        Event,
        related_name='volunteers',
        blank=True,
        verbose_name="Eventos"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de registro"
    )

    class Meta:
        verbose_name = "Voluntario"
        verbose_name_plural = "Voluntarios"
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class FAQ(models.Model):
    """Modelo para preguntas frecuentes"""
    question = models.CharField(
        max_length=500,
        verbose_name="Pregunta"
    )
    answer = models.TextField(
        verbose_name="Respuesta"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Orden"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de creación"
    )

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Pregunta frecuente'
        verbose_name_plural = 'Preguntas frecuentes'

    def __str__(self):
        return self.question


class ContributionItem(models.Model):
    """Modelo para formas de contribuir"""
    title = models.CharField(
        max_length=200,
        verbose_name="Título"
    )
    description = models.TextField(
        verbose_name="Descripción"
    )
    image = models.ImageField(
        upload_to='contributions/',
        null=True,
        blank=True,
        verbose_name="Imagen"
    )
    link = models.URLField(
        null=True,
        blank=True,
        verbose_name="Enlace"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Orden"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de creación"
    )

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Forma de contribuir"
        verbose_name_plural = "Formas de contribuir"

    def __str__(self):
        return self.title
