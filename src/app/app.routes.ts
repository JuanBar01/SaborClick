import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'restaurantes',
  loadComponent: () => import('./restaurantes/restaurantes.page').then(m => m.RestaurantesPage)
  }
];
