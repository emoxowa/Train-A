import { Routes } from '@angular/router';
import { authGuard } from '@app/auth/guards/auth.guard';

export const AuthRoutes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
];
