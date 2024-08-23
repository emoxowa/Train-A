import { Routes } from '@angular/router';

export const TrainRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'trip/:id',
    loadComponent: () => import('./components/trip-details/trip-details.component').then((m) => m.TripDetailsComponent),
  },
];
