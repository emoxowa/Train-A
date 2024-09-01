import { inject, Injectable } from '@angular/core';
import { AdminService } from '@app/admin/service/admin.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, forkJoin, mergeMap, switchMap } from 'rxjs';
import { RiderAction } from '../actions/riders.actions';
import { StationsActions } from '../actions/stations.actions';
import { CarriageActions } from '../actions/carriage.actions';

@Injectable({
  providedIn: 'root',
})
export class RiderEffectService {
  private actions$ = inject(Actions);

  private adminService = inject(AdminService);

  // loadRidersTest$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RiderAction.loadRiderList),
  //     switchMap((action) =>
  //       this.adminService
  //         .getRouteInformation(action.idRoute)
  //         .pipe(map((riders: IRideInfo) => RiderAction.loadRiderListSuccsess({ riderList: riders })))
  //     )
  //   )
  // );

  loadRiders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RiderAction.loadRiderList),
      mergeMap((action) =>
        forkJoin({
          stations: this.adminService.getStationList(),
          carriages: this.adminService.getCarriageList(),
          riders: this.adminService.getRouteInformation(action.idRoute),
        }).pipe(
          switchMap(({ stations, carriages, riders }) => {
            return [
              StationsActions.loadStationsSuccess({ stations }),
              CarriageActions.loadCarriagesListSuccsess({ carriageList: carriages }),
              RiderAction.loadRiderListSuccsess({ riderList: riders }),
            ];
          }),
          catchError((error) => {
            console.error('Error loading data:', error);
            return EMPTY;
          })
        )
      )
    )
  );
}
