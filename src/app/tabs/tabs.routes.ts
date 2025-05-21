import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'restaurantes',
        loadComponent: () =>
          import('../restaurantes/restaurantes.page').then((m) => m.RestaurantesPage),
      },
      {
        path: 'reservas',
        loadComponent: () =>
          import('../reservas/reservas.page').then((m) => m.ReservasPage),
      },
      {
        path: 'mapa',
        loadComponent: () =>
          import('../mapa/mapa.page').then((m) => m.MapaPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../perfil/perfil.page').then((m) => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: '/tabs/restaurantes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/restaurantes',
    pathMatch: 'full',
  },
];
