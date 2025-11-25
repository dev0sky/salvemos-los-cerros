import React from 'react';
import { Route, Switch } from 'wouter';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './modules/home/pages/HomePage';
import { ProyectosPage } from './modules/proyectos/pages/ProyectosPage';
import { NosotrosPage } from './modules/nosotros/pages/NosotrosPage';
import { EventosPage } from './modules/eventos/pages/EventosPage';
import { NoticiasPage } from './modules/noticias/pages/NoticiasPage';
import { GaleriaPage } from '@/modules/galeria/pages/GaleriaPage';
import { MapaPage } from '@/modules/mapa/pages/MapaPage';
import { CerrosPage } from '@/modules/cerros/pages/CerrosPage';
import { CerroDetallePage } from '@/modules/cerros/pages/CerroDetallePage';
import { ROUTES } from './constants/routes';

const App: React.FC = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.PROYECTOS} component={ProyectosPage} />
        <Route path={ROUTES.NOSOTROS} component={NosotrosPage} />
        <Route path={ROUTES.EVENTOS} component={EventosPage} />
        <Route path={ROUTES.NOTICIAS} component={NoticiasPage} />
        <Route path={ROUTES.GALERIA} component={GaleriaPage} />
        <Route path={ROUTES.MAPA} component={MapaPage} />
        <Route path={ROUTES.CERROS} component={CerrosPage} />
        <Route path={ROUTES.CERRO_DETALLE} component={CerroDetallePage} />
        
        {/* Fallback route */}
        <Route>404: No encontrado</Route>
      </Switch>
    </MainLayout>
  );
};

export default App;
