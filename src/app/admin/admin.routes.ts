import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'station',
    pathMatch: 'full',
  },
  {
    path: 'station',
    loadComponent: () => import('./pages/stations/stations.component').then((m) => m.StationComponent),
  },
];
