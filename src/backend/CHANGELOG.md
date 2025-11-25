# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2025-11-25]

### Added
- Docker support with `Dockerfile` using `python:3.12-alpine`.
- `gunicorn` for production-ready server execution.
- `gunicorn.conf.py` configuration file.
- Environment variable support for sensitive settings (`SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`).

### Changed
- Updated `settings.py` to read configuration from environment variables.
- Configured CORS to allow `localhost` and `127.0.0.1` for Dockerized frontend communication.
- Updated `requirements.txt` to include `gunicorn`.

## [Unreleased]

### Added
- Initialized Django project structure.
- Created `api` application.
- Implemented database models: `Cerro`, `Project`, `Event`, `NewsArticle`, `TeamMember`, `GalleryImage`.
- Configured Django REST Framework with Serializers and ViewSets for all models.
- Configured CORS headers to allow frontend access.
- Added Django Admin configuration for all models.
- Added `seed_db` management command to populate database from frontend mock data.
- Configured media file serving.
