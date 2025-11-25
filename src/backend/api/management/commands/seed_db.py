import requests
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from api.models import Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')
        
        # Clear existing data
        Cerro.objects.all().delete()
        Project.objects.all().delete()
        Event.objects.all().delete()
        NewsArticle.objects.all().delete()
        TeamMember.objects.all().delete()
        GalleryImage.objects.all().delete()

        self.seed_cerros()
        self.seed_projects()
        self.seed_events()
        self.seed_news()
        self.seed_team()
        self.seed_gallery()

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))

    def download_image(self, url):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return ContentFile(response.content)
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Failed to download image {url}: {e}'))
        return None

    def seed_cerros(self):
        self.stdout.write('Seeding Cerros...')
        cerros_data = [
            {
                'id': 'cerro-grande',
                'name': 'Cerro Grande (Arewákawi)',
                'altitude': 1900,
                'municipality': 'Chihuahua, Chihuahua',
                'latitude': 28.5950,
                'longitude': -106.0950,
                'geology_info': {
                    'rock': 'Toba ignimbrita (ígnea extrusiva)',
                    'age': 'Oligoceno',
                    'notes': 'También hay granodiorita intrusiva en la base.',
                },
                'ecological_info': {
                    'flora': ['Encino chihuahuense (Quercus chihuahuensis)', 'Cactus diversos', 'Arbustos nativos'],
                    'fauna': ['Cánidos (se han encontrado excrementos)', 'Felinos', 'Otras especies silvestres'],
                    'cultural': ['Cuevas con pinturas rupestres (INAH)', '‘Ojo de agua’ como fuente de agua para fauna', 'Importancia simbólica para la identidad de Chihuahua y como cerro sagrado Rarámuri'],
                },
                'materials_info': {
                    'minerals': 'Inventario de recursos minerales documenta presencia de rocas ígneas, pómice, posiblemente material volcánico útil.',
                },
                'legal_status': {
                    'proposed_protection': 'ANP / Zona de valorización ecológica',
                    'status': 'Zona E en el PDU de Chihuahua según plan urbano municipal',
                },
                'threats': ['Urbanización', 'Destrucción del paisaje y cuevas', 'Presión inmobiliaria'],
                'image_url': 'https://static.photos/1200x800?mountains,landscape,nature',
            },
            {
                'id': 'cerro-coronel',
                'name': 'Cerro Coronel (Guaguachic)',
                'altitude': 1655,
                'municipality': 'Chihuahua, Chihuahua',
                'latitude': 28.6250,
                'longitude': -106.0600,
                'geology_info': {
                    'rock': 'Ignimbrita riolítica (volcánica extinta)',
                    'age': 'Oligoceno',
                    'notes': 'Origen volcánico según inventario geológico.',
                },
                'ecological_info': {
                    'flora': ['Vegetación desértica / arbustos escasos'],
                    'fauna': ['Fauna local desértica, posible riesgo de deslizamientos de rocas'],
                    'cultural': ['Símbolo de la ciudad, mirador urbano'],
                },
                'materials_info': {
                    'minerals': 'Se reporta que antiguamente fue mina de oro.',
                },
                'legal_status': {
                    'proposed_protection': 'ANP (Zona E para preservación ecológica según municipio)',
                    'status': 'Protección municipal prevista en Plan Desarrollo Urbano.',
                },
                'threats': ['Deslizamientos por laderas fracturadas', 'Urbanización', 'Presión para desarrollo'],
                'image_url': 'https://static.photos/1200x800?planting,trees,forest',
            },
            # Add other cerros similarly...
        ]

        for data in cerros_data:
            image_url = data.pop('image_url')
            cerro = Cerro(**data)
            image_content = self.download_image(image_url)
            if image_content:
                cerro.image.save(f"{data['id']}.jpg", image_content, save=False)
            cerro.save()

    def seed_projects(self):
        self.stdout.write('Seeding Projects...')
        projects_data = [
            {
                'title': 'Declaratoria de Área Natural Protegida - Cerro Grande',
                'description': 'Iniciativa ciudadana para declarar el Cerro Grande (Arewákawi) como Área Natural Protegida. Incluye amparo legal y audiencias públicas con autoridades estatales.',
                'location': 'Cerro Grande, Chihuahua',
                'status': 'active',
                'progress': 75,
                'start_date': '2020-01-01',
                'image_url': 'https://static.photos/800x600?mountains,landscape,nature',
            },
            {
                'title': 'Huerto Comunitario Cerro Coronel',
                'description': 'Transformación de un antiguo estacionamiento ilegal en huerto comunitario y zona reforestada con plantas nativas en el Cerro Coronel.',
                'location': 'Cerro Coronel, Chihuahua',
                'status': 'completed',
                'progress': 100,
                'start_date': '2025-01-01',
                'image_url': 'https://static.photos/800x600?planting,trees,forest',
            },
             {
                'title': 'Protección de 4 Cerros como Zonas Naturales',
                'description': 'Acuerdo municipal para declarar 4 cerros (Coronel, Grande, Cañón del Marro, Picos de la Luna) como zonas naturales protegidas antes de 2028.',
                'location': 'Chihuahua Capital',
                'status': 'active',
                'progress': 45,
                'start_date': '2023-01-01',
                'image_url': 'https://static.photos/800x600?conservation,wildlife,nature',
            },
        ]

        for data in projects_data:
            image_url = data.pop('image_url')
            project = Project(**data)
            image_content = self.download_image(image_url)
            if image_content:
                project.image.save(f"{data['title']}.jpg", image_content, save=False)
            project.save()

    def seed_events(self):
        self.stdout.write('Seeding Events...')
        events_data = [
            {
                'title': 'Manifestación por Protección de Cerros',
                'description': 'Manifestación frente al Palacio de Gobierno para exigir protección de los cerros y urgencia por incendios forestales.',
                'date': '2024-12-15',
                'time': '10:00:00',
                'location': 'Palacio de Gobierno, Chihuahua',
                'type': 'other',
                'attendees': 150,
                'max_attendees': 200,
                'image_url': 'https://static.photos/800x600?community,people,volunteer',
            },
            {
                'title': 'Jornada de Reforestación Cerro Coronel',
                'description': 'Reforestación comunitaria en el antiguo estacionamiento ilegal del Cerro Coronel. Traeremos plantas nativas y herramientas.',
                'date': '2025-12-20',
                'time': '08:00:00',
                'location': 'Cerro Coronel, Chihuahua',
                'type': 'reforestation',
                'attendees': 45,
                'max_attendees': 80,
                'image_url': 'https://static.photos/800x600?planting,trees,forest',
            },
        ]

        for data in events_data:
            image_url = data.pop('image_url')
            event = Event(**data)
            image_content = self.download_image(image_url)
            if image_content:
                event.image.save(f"{data['title']}.jpg", image_content, save=False)
            event.save()

    def seed_news(self):
        self.stdout.write('Seeding News...')
        news_data = [
            {
                'title': 'Colectivo Transforma Zona Degradada del Cerro Coronel',
                'excerpt': 'Salvemos los Cerros transformó un antiguo estacionamiento ilegal en huerto comunitario y exige declaratoria de área protegida.',
                'content': 'Salvemos los Cerros transformó un antiguo estacionamiento ilegal en huerto comunitario y exige declaratoria de área protegida.',
                'category': 'conservation',
                'date': '2025-06-26',
                'author': 'Soy Chihuahua',
                'featured': True,
                'image_url': 'https://static.photos/800x600?planting,trees,forest',
            },
            {
                'title': 'Más del 95% Apoyan Plan de Prevención Atmosférica',
                'excerpt': 'Consulta ciudadana muestra apoyo masivo al plan impulsado por Salvemos los Cerros para combatir tormentas de arena.',
                'content': 'Consulta ciudadana muestra apoyo masivo al plan impulsado por Salvemos los Cerros para combatir tormentas de arena.',
                'category': 'events',
                'date': '2025-10-16',
                'author': 'Vivir en Juárez',
                'featured': False,
                'image_url': 'https://static.photos/800x600?community,people,volunteer',
            },
        ]

        for data in news_data:
            image_url = data.pop('image_url')
            news = NewsArticle(**data)
            image_content = self.download_image(image_url)
            if image_content:
                news.image.save(f"{data['title']}.jpg", image_content, save=False)
            news.save()

    def seed_team(self):
        self.stdout.write('Seeding Team...')
        team_data = [
            {
                'name': 'Luis Andrés Rivera Lebario',
                'role': 'Vocero del Colectivo',
                'bio': 'Activista ambiental y vocero principal de Salvemos los Cerros. Lidera iniciativas de protección y restauración de áreas naturales en Chihuahua.',
                'email': 'contacto@salvemosloscerros.org',
            },
            {
                'name': 'Santiago de la Peña Grajeda',
                'role': 'Coordinador de Proyectos',
                'bio': 'Especialista en gestión de proyectos ambientales y coordinación de actividades comunitarias del colectivo.',
                'email': 'proyectos@salvemosloscerros.org',
            },
        ]

        for data in team_data:
            team = TeamMember(**data)
            # No image URL in mock data for team, but model has image field. Skipping image for team.
            team.save()

    def seed_gallery(self):
        self.stdout.write('Seeding Gallery...')
        gallery_data = [
            {
                'title': 'Huerto Comunitario Cerro Coronel',
                'description': 'Transformación de estacionamiento ilegal en huerto comunitario con plantas nativas.',
                'category': 'project',
                'photographer': 'Salvemos los Cerros',
                'tags': ['reforestación', 'cerro coronel', 'huerto comunitario'],
                'image_url': 'https://static.photos/1200x800?planting,trees,forest',
            },
            {
                'title': 'Manifestación Palacio de Gobierno',
                'description': 'Activistas exigen protección de cerros frente al Palacio de Gobierno.',
                'category': 'event',
                'photographer': 'Tiempo.com.mx',
                'tags': ['manifestación', 'protesta', 'palacio gobierno'],
                'image_url': 'https://static.photos/1200x800?community,people,volunteer',
            },
        ]

        for data in gallery_data:
            image_url = data.pop('image_url')
            gallery = GalleryImage(**data)
            image_content = self.download_image(image_url)
            if image_content:
                gallery.image.save(f"{data['title']}.jpg", image_content, save=False)
            gallery.save()
