import { inject, Injectable } from '@angular/core';
import { AdminService } from '@app/admin/service/admin.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, forkJoin, map, mergeMap, switchMap } from 'rxjs';
import { OrderService } from '@app/train/services/order.service';
import { RiderAction } from '../actions/riders.actions';
import { StationsActions } from '../actions/stations.actions';
import { CarriageActions } from '../actions/carriage.actions';

@Injectable({
  providedIn: 'root',
})
export class RiderEffectService {
  private actions$ = inject(Actions);

  private adminService = inject(AdminService);

  private orderService = inject(OrderService);

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

  createRide$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RiderAction.createRide),
      switchMap(({ routeId, scheduleItem }) => {
        return this.adminService.createNewRide(routeId, scheduleItem).pipe(
          map((rideResponse) => {
            this.orderService.alertMessage$.next({ message: `Ride ${rideResponse.id} created`, type: 'success' });
            return RiderAction.createRideSuccess({ scheduleItem: { rideId: rideResponse.id, ...scheduleItem } });
          }),
          catchError((error) => {
            this.orderService.alertMessage$.next({
              message: `Failed to create the ride ${scheduleItem.rideId}. Error: ${error.error.message}`,
              type: 'error',
            });
            return EMPTY;
          })
        );
      })
    )
  );

  updateRide$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RiderAction.updateRide),
      switchMap(({ scheduleItem, routeId }) =>
        this.adminService.updateRide(routeId, scheduleItem.rideId, scheduleItem).pipe(
          map(() => {
            this.orderService.alertMessage$.next({ message: `Ride ${scheduleItem.rideId} updated`, type: 'success' });
            return RiderAction.updateRideSuccess({ scheduleItem });
          }),
          catchError((error) => {
            this.orderService.alertMessage$.next({
              message: `Failed to update the ride ${scheduleItem.rideId}. Error: ${error.error.message}`,
              type: 'error',
            });
            return EMPTY;
          })
        )
      )
    )
  );

  deleteRide$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RiderAction.deleteRide),
      switchMap(({ rideId, routeId }) =>
        this.adminService.deleteRide(routeId, rideId).pipe(
          map(() => {
            this.orderService.alertMessage$.next({ message: `Ride ${rideId} deleted`, type: 'success' });
            return RiderAction.deleteRideSuccess({ rideId });
          }),
          catchError((error) => {
            this.orderService.alertMessage$.next({
              message: `Failed to delete the ride ${rideId}. Error: ${error.error.message}`,
              type: 'error',
            });
            return EMPTY;
          })
        )
      )
    )
  );
}
