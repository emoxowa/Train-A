import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/core/components/layout/layout.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { canActiveAdmin, canActiveAuth } from './auth/guards/access.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./train/train.routes').then((m) => m.TrainRoutes),
      },
      { path: 'signup', component: SignUpComponent, canActivate: [canActiveAuth] },
      { path: 'signin', component: SignInComponent, canActivate: [canActiveAuth] },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then((m) => m.AdminRoutes),
        canActivateChild: [canActiveAdmin],
      },
      {
        path: '**',
        redirectTo: 'not-found',
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
    ],
  },
];
