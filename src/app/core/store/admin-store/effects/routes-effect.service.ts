import { inject, Injectable } from '@angular/core';
import { AdminService } from '@app/admin/service/admin.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { IRoutes } from '@app/admin/models/routes.model';
import { RoutesActions } from '../actions/routes.action';

@Injectable({
  providedIn: 'root',
})
export class RoutesEffectService {
  private actions$ = inject(Actions);

  private adminService = inject(AdminService);

  loadRoutes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.loadRoutesList),
      switchMap(() =>
        this.adminService
          .getRoutes()
          .pipe(map((routes: IRoutes[]) => RoutesActions.loadRoutesListSuccsess({ routesList: routes })))
      )
    )
  );
}
