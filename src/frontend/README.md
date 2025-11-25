# Salvemos los Cerros de Chihuahua

**Salvemos los Cerros de Chihuahua** es una asociación de activismo social dedicada a la protección de áreas naturales en Chihuahua, incluyendo cerros, ríos, lagos, lagunas, presas, montañas y cañones, así como la flora y fauna que habitan en ellos.

Actualmente, nuestra labor se concentra en Chihuahua capital, pero buscamos expandirnos a todo el estado en el futuro. Somos una organización apolítica que, a través de manifestaciones y acciones concretas, busca inspirar y realizar cambios para la sostenibilidad común de los habitantes.

Nuestros objetivos principales son:
*   Crear conciencia sobre los peligros de la gentrificación.
*   Educar sobre el uso adecuado de los recursos naturales.
*   Promover un mejor aprovechamiento de nuestro entorno natural.

## Tecnologías

Este proyecto utiliza las siguientes tecnologías:

*   **Frontend**: React, Vite, TailwindCSS, TanStack Query, Zustand, Wouter.
*   **Backend**: Django, Django REST Framework.
*   **Infraestructura**: Docker, Docker Compose.

## Configuración del Proyecto

### Requisitos Previos

*   Docker y Docker Compose
*   Node.js (para desarrollo local)
*   Python (para desarrollo local)

### Ejecución con Docker

1.  Clona el repositorio.
2.  Crea un archivo `.env` basado en `.env.template`.
3.  Ejecuta:
    ```bash
    docker-compose up --build
    ```

### Desarrollo Local

#### Frontend

```bash
cd src/frontend
npm install
npm run dev
```

#### Backend

```bash
cd src/backend
python -m venv venv
source venv/bin/activate  # o venv\Scripts\activate en Windows
pip install -r requirements.txt
python manage.py runserver
```
