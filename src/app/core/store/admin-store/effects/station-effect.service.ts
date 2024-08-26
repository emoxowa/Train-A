import { inject, Injectable } from '@angular/core';
import { AdminService } from '@app/admin/service/admin.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap } from 'rxjs';
import { IStationList } from '@app/admin/models/station-list.model';
import { ICreateAdmin } from '@app/admin/models/create-admin';
import { Store } from '@ngrx/store';
import { StationsActions } from '../actions/stations.actions';

@Injectable({
  providedIn: 'root',
})
export class StationEffectService {
  private actions$ = inject(Actions);

  private adminService = inject(AdminService);

  private store = inject(Store);

  readonly newAdmin: ICreateAdmin = {
    email: 'admin@admin.com',
    password: 'my-password',
  };

  loadStations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.loadStationList),
      switchMap(() =>
        this.adminService.getStationList().pipe(
          map((stations: IStationList[]) => StationsActions.loadStationsSuccess({ stations })),
          catchError((error) => {
            console.error('Error loading videos:', error);
            return EMPTY;
          })
        )
      )
    )
  );

  createStation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.createNewStation),
      switchMap(({ station }) => {
        this.store.dispatch(StationsActions.createNewStationIndicate());
        return this.adminService.createNewStation(station).pipe(
          switchMap(() => this.adminService.getStationList()),
          map((stations: IStationList[]) => {
            this.store.dispatch(StationsActions.createNewStationIndicateSuccsess());
            return StationsActions.loadStationsSuccess({ stations });
          }),
          catchError((error) => {
            this.store.dispatch(StationsActions.createNewStationIndicateFailed());
            if (error.status === 400) {
              // eslint-disable-next-line no-alert
              alert('Error adding station: Incorrect data!');
            } else {
              console.error('Error adding station:', error);
            }
            return EMPTY;
          })
        );
      })
    )
  );

  deleteStation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.deleteStation),
      switchMap(({ idStation }) => {
        this.store.dispatch(StationsActions.deleteStationIndicate());
        return this.adminService.deleteStation(idStation).pipe(
          switchMap(() => this.adminService.getStationList()),
          map((stations: IStationList[]) => {
            this.store.dispatch(StationsActions.deletStationIndicateSuccsess());
            return StationsActions.loadStationsSuccess({ stations });
          }),
          catchError((error) => {
            // error from https://github.com/rolling-scopes-school/tasks/blob/master/tasks/train-a/admin/stations.md#acceptance-criteria-4-deleting-stations-5
            console.error('Error deleting station:', error);
            return EMPTY;
          })
        );
      })
    )
  );
}
