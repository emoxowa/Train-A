import { Routes } from '@angular/router';

export const TrainRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  // {
  //   path: 'video/:id',
  //   loadComponent: () =>
  //     import('./pages/detailed-information-page/detailed-information-page.component').then(
  //       (m) => m.DetailedInformationPageComponent
  //     ),
  // },
];
