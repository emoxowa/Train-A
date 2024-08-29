import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ICreateAdmin } from '@app/admin/models/create-admin';
import { IRoutes } from '@app/admin/models/routes.model';
import { AdminService } from '@app/admin/service/admin.service';
import { RoutesActions } from '@app/core/store/admin-store/actions/routes.action';
import { selectRoutesArr } from '@app/core/store/admin-store/selectors/routes.selector';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [TuiButton, CommonModule],
  template: `
    <button size="l" tuiButton (click)="getRoutes()">get routes</button>

    <button size="l" tuiButton (click)="createRoute()">create route</button>

    <button size="l" tuiButton (click)="updRoute()">upd route</button>

    <button size="l" tuiButton (click)="deleteRoute()">delete route</button>

    @let routes = routesList$ | async;

    @for (route of routes; track route.id) {
      <div>id: {{ route.id }}</div>
      <div>carriages: {{ route.carriages }}</div>
      <div>path: {{ route.path }}</div>
    }
  `,
  styleUrl: './routes.component.scss',
})
export class RoutesComponent {
  private adminService = inject(AdminService);

  private store = inject(Store);

  routesList$ = this.store.select(selectRoutesArr);

  // for developing
  readonly newAdmin: ICreateAdmin = {
    email: 'admin@admin.com',
    password: 'my-password',
  };

  constructor() {
    this.store.dispatch(RoutesActions.loadRoutesList());
    // for developing
    this.adminService
      .loginAdmin(this.newAdmin)
      .pipe(
        tap((response) => {
          this.adminService.token$.next(response.token);
        })
      )
      .subscribe();
  }

  getRoutes() {
    this.adminService.getRoutes().subscribe({
      next: (data) => {
        // eslint-disable-next-line no-console
        console.log('get routes', data);
      },
    });
  }

  createRoute() {
    const newRoute: IRoutes = {
      path: [1, 2, 3, 4],
      carriages: ['carriage1', 'carriage2', 'carriage3'],
    };
    this.adminService.createRoute(newRoute).subscribe({
      next: (data) => {
        // eslint-disable-next-line no-console
        console.log('new route', data);
      },
    });
  }

  updRoute() {
    const updRouteId = 1;
    const updRouteObj: IRoutes = {
      path: [3, 5, 6],
      carriages: ['carriage3', 'carriage2', 'carriage1'],
    };

    this.adminService.updRoutes(updRouteId, updRouteObj).subscribe({
      next: (data) => {
        // eslint-disable-next-line no-console
        console.log('upd route', data);
      },
    });
  }

  deleteRoute() {
    const deletedRouteId = 596;

    this.adminService.deleteRoute(deletedRouteId).subscribe({
      next: (data) => {
        // eslint-disable-next-line no-console
        console.log('delete route', data);
      },
    });
  }
}
