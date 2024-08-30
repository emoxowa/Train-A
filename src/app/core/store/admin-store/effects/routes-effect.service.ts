import { inject, Injectable } from '@angular/core';
import { AdminService } from '@app/admin/service/admin.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, forkJoin, map, mergeMap } from 'rxjs';
import { RoutesActions } from '../actions/routes.action';
import { StationsActions } from '../actions/stations.actions';

@Injectable({
  providedIn: 'root',
})
export class RoutesEffectService {
  private actions$ = inject(Actions);

  private adminService = inject(AdminService);

  loadRoutes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.loadRoutesList),
      mergeMap(() =>
        forkJoin({
          routes: this.adminService.getRoutes(),
          stations: this.adminService.getStationList(),
        }).pipe(
          map(({ routes, stations }) => {
            return [
              RoutesActions.loadRoutesListSuccsess({ routesList: routes }),
              StationsActions.loadStationsSuccess({ stations }),
            ];
          }),
          catchError((error) => {
            console.error('Error loading data:', error);
            return EMPTY;
          })
        )
      ),
      mergeMap((actions) => actions)
    )
  );
}
