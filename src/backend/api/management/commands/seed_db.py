import json
import os
import requests
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from django.utils import timezone
from datetime import timedelta
from api.models import (
    Cerro, Project, Event, NewsArticle, TeamMember, GalleryImage,
    FAQ, ContributionItem, Subscriber, Volunteer, Comment
)



class Command(BaseCommand):
    help = 'Seeds the database with initial data from JSON files'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')
        
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        Cerro.objects.all().delete()
        Project.objects.all().delete()
        Event.objects.all().delete()
        NewsArticle.objects.all().delete()
        TeamMember.objects.all().delete()
        GalleryImage.objects.all().delete()
        FAQ.objects.all().delete()
        ContributionItem.objects.all().delete()
        Comment.objects.all().delete()

        # Get the seeds directory path
        seeds_dir = os.path.join(os.path.dirname(__file__), '..', 'seeds')

        # Seed each model in order (team first for foreign keys)
        self.seed_team(seeds_dir)
        self.seed_cerros(seeds_dir)
        self.seed_projects(seeds_dir)
        self.seed_events(seeds_dir)
        self.seed_news(seeds_dir)
        self.seed_gallery(seeds_dir)
        self.seed_faqs(seeds_dir)
        self.seed_contributions(seeds_dir)

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
            self.stdout.write(f'  ✓ Created: {cerro.name}')

    def seed_projects(self, seeds_dir):
        """Seed Projects from JSON file"""
        self.stdout.write('Seeding Projects...')
        filepath = os.path.join(seeds_dir, 'projects.json')
        projects_data = self.load_json(filepath)

        for data in projects_data:
            image_url = data.pop('image_url', None)
            team_member_ids = data.pop('team_member_ids', [])
            project_title = data.get('title')
            
            # Convert date strings to datetime objects
            if 'startDate' in data:
                data['start_date'] = data.pop('startDate')
            if 'endDate' in data:
                data['end_date'] = data.pop('endDate')
            if 'budgetRequested' in data:
                data['budget_requested'] = data.pop('budgetRequested')
            if 'budgetRaised' in data:
                data['budget_raised'] = data.pop('budgetRaised')
            
            # Pop comments before creating project
            comments_data = data.pop('comments', [])

            project = Project(**data)
            
            if image_url:
                image_content = self.download_image(image_url)
                if image_content:
                    safe_title = "".join(c for c in project_title if c.isalnum() or c in (' ', '-', '_')).rstrip()
                    project.image.save(f"{safe_title[:50]}.jpg", image_content, save=False)
            
            project.save()
            
            # Add team members
            if team_member_ids:
                team_members = TeamMember.objects.filter(id__in=team_member_ids)
                project.team_members.set(team_members)
            
            # Add comments
            # Add comments
            for comment_data in comments_data:
                Comment.objects.create(
                    project=project,
                    author_name=comment_data.get('author_name'),
                    author_email=comment_data.get('author_email'),
                    content=comment_data.get('content'),
                    approved=comment_data.get('approved', True),
                    created_at=comment_data.get('created_at', timezone.now())
                )

            self.stdout.write(f'  ✓ Created: {project.title}')

    def seed_events(self, seeds_dir):
        """Seed Events from JSON file"""
        self.stdout.write('Seeding Events...')
        filepath = os.path.join(seeds_dir, 'events.json')
        events_data = self.load_json(filepath)

        for data in events_data:
            image_url = data.pop('image_url', None)
            organizer_ids = data.pop('organizer_ids', [])
            related_project_id = data.pop('related_project_id', None)
            event_title = data.get('title')
            
            # Convert field names
            if 'startDatetime' in data:
                data['start_datetime'] = data.pop('startDatetime')
            if 'endDatetime' in data:
                data['end_datetime'] = data.pop('endDatetime')
            if 'maxAttendees' in data:
                data['max_attendees'] = data.pop('maxAttendees')
            if 'locationDetails' in data:
                data['location_details'] = data.pop('locationDetails')
            if 'registrationLink' in data:
                data['registration_link'] = data.pop('registrationLink')
            if 'contactInfo' in data:
                data['contact_info'] = data.pop('contactInfo')
            
            # Handle related project
            if related_project_id:
                try:
                    data['related_project'] = Project.objects.get(id=related_project_id)
                except Project.DoesNotExist:
                    pass
            
            # Pop comments before creating event
            comments_data = data.pop('comments', [])

            event = Event(**data)
            
            if image_url:
                image_content = self.download_image(image_url)
                if image_content:
                    safe_title = "".join(c for c in event_title if c.isalnum() or c in (' ', '-', '_')).rstrip()
                    event.image.save(f"{safe_title[:50]}.jpg", image_content, save=False)
            
            event.save()
            
            # Add organizers
            if organizer_ids:
                organizers = TeamMember.objects.filter(id__in=organizer_ids)
                event.organizers.set(organizers)
            
            # Add comments
            # Add comments
            for comment_data in comments_data:
                Comment.objects.create(
                    event=event,
                    author_name=comment_data.get('author_name'),
                    author_email=comment_data.get('author_email'),
                    content=comment_data.get('content'),
                    approved=comment_data.get('approved', True),
                    created_at=comment_data.get('created_at', timezone.now())
                )

            self.stdout.write(f'  ✓ Created: {event.title}')

    def seed_news(self, seeds_dir):
        """Seed News Articles from JSON file"""
        self.stdout.write('Seeding News...')
        filepath = os.path.join(seeds_dir, 'news.json')
        news_data = self.load_json(filepath)

        for data in news_data:
            image_url = data.pop('image_url', None)
            author_id = data.pop('author_id', None)
            related_project_id = data.pop('related_project_id', None)
            related_event_id = data.pop('related_event_id', None)
            news_title = data.get('title')
            
            # Convert field names
            if 'galleryImages' in data:
                data['gallery_images'] = data.pop('galleryImages')
            if 'externalLinks' in data:
                data['external_links'] = data.pop('externalLinks')
            
            # Handle author
            if author_id:
                try:
                    data['author'] = TeamMember.objects.get(id=author_id)
                except TeamMember.DoesNotExist:
                    pass
            
            # Handle related project
            if related_project_id:
                try:
                    data['related_project'] = Project.objects.get(id=related_project_id)
                except Project.DoesNotExist:
                    pass
            
            # Handle related event
            if related_event_id:
                try:
                    data['related_event'] = Event.objects.get(id=related_event_id)
                except Event.DoesNotExist:
                    pass
            
            # Pop comments before creating news
            comments_data = data.pop('comments', [])

            news = NewsArticle(**data)
            
            if image_url:
                image_content = self.download_image(image_url)
                if image_content:
                    safe_title = "".join(c for c in news_title if c.isalnum() or c in (' ', '-', '_')).rstrip()
                    news.image.save(f"{safe_title[:50]}.jpg", image_content, save=False)
            
            news.save()


            # Add comments
            # Add comments
            for comment_data in comments_data:
                Comment.objects.create(
                    news_article=news,
                    author_name=comment_data.get('author_name'),
                    author_email=comment_data.get('author_email'),
                    content=comment_data.get('content'),
                    approved=comment_data.get('approved', True),
                    created_at=comment_data.get('created_at', timezone.now())
                )

            self.stdout.write(f'  ✓ Created: {news.title}')

    def seed_team(self, seeds_dir):
        """Seed Team Members from JSON file"""
        self.stdout.write('Seeding Team...')
        filepath = os.path.join(seeds_dir, 'team.json')
        team_data = self.load_json(filepath)

        for data in team_data:
            # Convert field names
            if 'joined_date' in data and isinstance(data['joined_date'], str):
                # Keep as string, Django will handle conversion
                pass
            
            team = TeamMember(**data)
            team.save()
            self.stdout.write(f'  ✓ Created: {team.name} - {team.role}')

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
            self.stdout.write(f'  ✓ Created: {gallery.title}')

    def seed_faqs(self, seeds_dir):
        """Seed FAQs from JSON file"""
        self.stdout.write('Seeding FAQs...')
        filepath = os.path.join(seeds_dir, 'faqs.json')
        faqs_data = self.load_json(filepath)

        for data in faqs_data:
            faq = FAQ(**data)
            faq.save()
            self.stdout.write(f'  ✓ Created: {faq.question[:50]}...')

    def seed_contributions(self, seeds_dir):
        """Seed Contribution Items from JSON file"""
        self.stdout.write('Seeding Contribution Items...')
        filepath = os.path.join(seeds_dir, 'contributions.json')
        contributions_data = self.load_json(filepath)

        for data in contributions_data:
            contribution = ContributionItem(**data)
            contribution.save()
            self.stdout.write(f'  ✓ Created: {contribution.title}')
