import json
import os
import requests
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from api.models import Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage


class Command(BaseCommand):
    help = 'Seeds the database with initial data from JSON files'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')
        
        # Clear existing data
        Cerro.objects.all().delete()
        Project.objects.all().delete()
        Event.objects.all().delete()
        NewsArticle.objects.all().delete()
        TeamMember.objects.all().delete()
        GalleryImage.objects.all().delete()

        # Get the seeds directory path
        seeds_dir = os.path.join(os.path.dirname(__file__), '..', 'seeds')

        # Seed each model
        self.seed_cerros(seeds_dir)
        self.seed_projects(seeds_dir)
        self.seed_events(seeds_dir)
        self.seed_news(seeds_dir)
        self.seed_team(seeds_dir)
        self.seed_gallery(seeds_dir)

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))

    def load_json(self, filepath):
        """Load JSON data from file"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            self.stdout.write(self.style.WARNING(f'File not found: {filepath}'))
            return []
        except json.JSONDecodeError as e:
            self.stdout.write(self.style.ERROR(f'JSON decode error in {filepath}: {e}'))
            return []

    def download_image(self, url):
        """Download image from URL"""
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                return ContentFile(response.content)
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Failed to download image {url}: {e}'))
        return None

    def seed_cerros(self, seeds_dir):
        """Seed Cerros from JSON file"""
        self.stdout.write('Seeding Cerros...')
        filepath = os.path.join(seeds_dir, 'cerros.json')
        cerros_data = self.load_json(filepath)

        for data in cerros_data:
            image_url = data.pop('image_url', None)
            cerro_id = data.get('id')
            
            cerro = Cerro(**data)
            
            if image_url:
                image_content = self.download_image(image_url)
                if image_content:
                    cerro.image.save(f"{cerro_id}.jpg", image_content, save=False)
            
            cerro.save()
            self.stdout.write(f'  Created: {cerro.name}')

    def seed_projects(self, seeds_dir):
        """Seed Projects from JSON file"""
        self.stdout.write('Seeding Projects...')
        filepath = os.path.join(seeds_dir, 'projects.json')
        projects_data = self.load_json(filepath)

        for data in projects_data:
            image_url = data.pop('image_url', None)
            project_title = data.get('title')
            
            project = Project(**data)
            
            if image_url:
                image_content = self.download_image(image_url)
                if image_content:
                    # Create safe filename
                    safe_title = "".join(c for c in project_title if c.isalnum() or c in (' ', '-', '_')).rstrip()
                    project.image.save(f"{safe_title[:50]}.jpg", image_content, save=False)
            
            project.save()
            self.stdout.write(f'  Created: {project.title}')

    def seed_events(self, seeds_dir):
        """Seed Events from JSON file"""
        self.stdout.write('Seeding Events...')
        filepath = os.path.join(seeds_dir, 'events.json')
        events_data = self.load_json(filepath)

        for data in events_data:
            image_url = data.pop('image_url', None)
            event_title = data.get('title')
            
            event = Event(**data)
            
            if image_url:
                image_content = self.download_image(image_url)
                if image_content:
                    safe_title = "".join(c for c in event_title if c.isalnum() or c in (' ', '-', '_')).rstrip()
                    event.image.save(f"{safe_title[:50]}.jpg", image_content, save=False)
            
            event.save()
            self.stdout.write(f'  Created: {event.title}')

    def seed_news(self, seeds_dir):
        """Seed News Articles from JSON file"""
        self.stdout.write('Seeding News...')
        filepath = os.path.join(seeds_dir, 'news.json')
        news_data = self.load_json(filepath)

        for data in news_data:
            image_url = data.pop('image_url', None)
            news_title = data.get('title')
            
            news = NewsArticle(**data)
            
            if image_url:
                image_content = self.download_image(image_url)
                if image_content:
                    safe_title = "".join(c for c in news_title if c.isalnum() or c in (' ', '-', '_')).rstrip()
                    news.image.save(f"{safe_title[:50]}.jpg", image_content, save=False)
            
            news.save()
            self.stdout.write(f'  Created: {news.title}')

    def seed_team(self, seeds_dir):
        """Seed Team Members from JSON file"""
        self.stdout.write('Seeding Team...')
        filepath = os.path.join(seeds_dir, 'team.json')
        team_data = self.load_json(filepath)

        for data in team_data:
            team = TeamMember(**data)
            team.save()
            self.stdout.write(f'  Created: {team.name} - {team.role}')

    def seed_gallery(self, seeds_dir):
        """Seed Gallery Images from JSON file"""
        self.stdout.write('Seeding Gallery...')
        filepath = os.path.join(seeds_dir, 'gallery.json')
        gallery_data = self.load_json(filepath)

        for data in gallery_data:
            image_url = data.pop('image_url', None)
            gallery_title = data.get('title')
            
            gallery = GalleryImage(**data)
            
            if image_url:
                image_content = self.download_image(image_url)
                if image_content:
                    safe_title = "".join(c for c in gallery_title if c.isalnum() or c in (' ', '-', '_')).rstrip()
                    gallery.image.save(f"{safe_title[:50]}.jpg", image_content, save=False)
            
            gallery.save()
            self.stdout.write(f'  Created: {gallery.title}')
