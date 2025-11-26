# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **Authentication**:
  - `useAuthStore` (Zustand) for state management.
  - Axios interceptors for automatic token injection and refresh.
  - `LoginPage` and `RegisterPage` components.
  - Authentication-aware Navbar (Login/Register vs User Menu).
- **Navigation**:
  - Enhanced `MainLayout` with multi-level dropdown support.
  - Responsive mobile menu.
- **Footer**:
  - Comprehensive footer with quick links, contact info, and social media.
  - Integrated Subscription Form with API connection.
- **Events**:
  - `Calendar` component with monthly view and CSV export.
  - `EventosPage` with filtering by upcoming/past events.
- **News**:
  - `NoticiasPage` with category filtering and featured article display.
- **Cerros**:
  - `CerrosPage` displaying all protected hills with details.
- **Map**:
  - `MapaPage` for interactive map display.
- **Gallery**:
  - `GaleriaPage` for image gallery display.
- **Volunteering**:
  - `VolunteerPage` with `VolunteerForm` using `react-hook-form`.
- **FAQ**:
  - `FAQPage` with accordion-style questions.
- **Contributions**:
  - `ContributionsPage` displaying contribution cards.
- **Routing**:
  - Added routes for all pages: Login, Register, Eventos, Noticias, Cerros, Mapa, Galeria, Volunteering, FAQ, and Contributions.

### Fixed

- **Routing Issues**:
  - Fixed missing route registrations in `App.tsx` for Eventos, Noticias, Cerros, Mapa, and Galeria pages.
  - All 11 main routes now properly registered and functioning.
- **Syntax Errors**:
  - Removed markdown code block markers (` ``` `) from `App.tsx` and `MainLayout.tsx`.
  - Fixed template literal syntax errors in `className` attributes.
  - Corrected JSX structure in `Footer.tsx` with proper opening/closing tags.
- **DOM Nesting Warnings**:
  - Removed nested `<a>` tags within `<Link>` components in `Footer.tsx` and `MainLayout.tsx`.
  - Applied TailwindCSS classes directly to `Link` components instead of wrapping with `<a>` tags.
- **Component Structure**:
  - Removed duplicate `MainLayout` wrappers from individual page components.
  - Fixed `HomePage.tsx` by removing duplicate sections (Events and News were rendered twice).
  - Ensured all pages render within the single `MainLayout` wrapper in `App.tsx`.
- **Import Cleanup**:
  - Removed unused `React` import from `App.tsx`.
  - Removed unused `useState` import from `RegisterPage.tsx`.
  - Removed unused `MainLayout` imports from `VolunteerPage.tsx`, `FAQPage.tsx`, and `ContributionsPage.tsx`.
- **Backend Connection**:
  - Verified and fixed API connection between frontend and backend.
  - Resolved `ERR_CONNECTION_REFUSED` errors after backend fixes.

### Changed

- **Dependencies**: Added `date-fns`, `react-hook-form`, `sonner`, `@tabler/icons-react`.
- **Layout Structure**: Centralized `MainLayout` wrapper in `App.tsx` instead of individual pages.
