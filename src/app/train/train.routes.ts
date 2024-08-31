import { Routes } from '@angular/router';
import { authGuard } from '@app/train/guards/auth.guard';

export const TrainRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'trip/:id',
    loadComponent: () =>
      import('./pages/trip-details-page/trip-details-page.component').then((m) => m.TripDetailsPageComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('@app/train/pages/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadComponent: () => import('@app/train/pages/orders/orders.component').then((m) => m.OrdersComponent),
    canActivate: [authGuard],
  },
];
