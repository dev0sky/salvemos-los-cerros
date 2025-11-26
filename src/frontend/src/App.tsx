import { Route, Switch } from "wouter";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./modules/home/pages/HomePage";
import { ProyectosPage } from "./modules/proyectos/pages/ProyectosPage";
import { NosotrosPage } from "./modules/nosotros/pages/NosotrosPage";
import { EventosPage } from "./modules/eventos/pages/EventosPage";
import { NoticiasPage } from "./modules/noticias/pages/NoticiasPage";
import { CerrosPage } from "./modules/cerros/pages/CerrosPage";
import { MapaPage } from "./modules/mapa/pages/MapaPage";
import { GaleriaPage } from "./modules/galeria/pages/GaleriaPage";
import { FAQPage } from "./modules/faq/pages/FAQPage";
import { VolunteerPage } from "./modules/volunteers/VolunteerPage";
import { ContributionsPage } from "./modules/contributions/pages/ContributionsPage";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <MainLayout>
      <Switch>
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.PROYECTOS} component={ProyectosPage} />
        <Route path={ROUTES.NOSOTROS} component={NosotrosPage} />
        <Route path={ROUTES.EVENTOS} component={EventosPage} />
        <Route path={ROUTES.NOTICIAS} component={NoticiasPage} />
        <Route path={ROUTES.CERROS} component={CerrosPage} />
        <Route path={ROUTES.MAPA} component={MapaPage} />
        <Route path={ROUTES.GALERIA} component={GaleriaPage} />
        <Route path={ROUTES.VOLUNTARIADO} component={VolunteerPage} />
        <Route path={ROUTES.FAQ} component={FAQPage} />
        <Route path={ROUTES.CONTRIBUCIONES} component={ContributionsPage} />

        {/* Fallback route */}
        <Route path="/:rest*" component={HomePage} />
      </Switch>
    </MainLayout>
  );
}

export default App;
