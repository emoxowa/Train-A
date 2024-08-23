import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./train/train.routes').then((m) => m.TrainRoutes),
  },
];
