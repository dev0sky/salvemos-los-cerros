import { Route, Switch } from 'wouter';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './modules/home/pages/HomePage';
import { ProyectosPage } from './modules/proyectos/pages/ProyectosPage';
import { NosotrosPage } from './modules/nosotros/pages/NosotrosPage';
import { EventosPage } from './modules/eventos/pages/EventosPage';
import { NoticiasPage } from './modules/noticias/pages/NoticiasPage';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <MainLayout>
      <Switch>
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.PROYECTOS} component={ProyectosPage} />
        <Route path={ROUTES.NOSOTROS} component={NosotrosPage} />
        <Route path={ROUTES.EVENTOS} component={EventosPage} />
        <Route path={ROUTES.NOTICIAS} component={NoticiasPage} />
        <Route>404 - Página no encontrada</Route>
      </Switch>
    </MainLayout>
  );
}

export default App;
