import { inject, Injectable } from '@angular/core';
import { AdminService } from '@app/admin/service/admin.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, forkJoin, map, mergeMap, switchMap } from 'rxjs';
import { RoutesActions } from '../actions/routes.action';
import { StationsActions } from '../actions/stations.actions';
import { CarriageActions } from '../actions/carriage.actions';

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
          carriages: this.adminService.getCarriageList(),
        }).pipe(
          map(({ routes, stations, carriages }) => {
            return [
              RoutesActions.loadRoutesListSuccsess({ routesList: routes }),
              StationsActions.loadStationsSuccess({ stations }),
              CarriageActions.loadCarriagesListSuccsess({ carriageList: carriages }),
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

  createRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.addNewRoute),
      switchMap(({ newRoute }) =>
        this.adminService.createRoute(newRoute).pipe(
          map((route) => {
            const updateRoute = { ...newRoute, id: route.id };
            return RoutesActions.addNewRouteSuccsess({ newRoute: updateRoute });
          }),
          catchError((error) => {
            console.error('Error loading data', error);
            return EMPTY;
          })
        )
      )
    )
  );
}
