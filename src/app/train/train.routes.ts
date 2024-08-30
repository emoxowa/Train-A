import { Routes } from '@angular/router';
import { authGuard } from '@app/train/guards/auth.guard';

export const TrainRoutes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('@app/train/pages/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
];
