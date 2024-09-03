import { IRideInfo, IScheduleInfo } from '@app/admin/models/route-info.module';
import { createAction, props } from '@ngrx/store';

export enum ERiderActions {
  LoadRiderList = '[Rider] Load Rider List',
  LoadRiderListSuccsess = '[Rider] Load Rider List Succsess',
  CreateRide = '[Rider] Create Ride',
  CreateRideSuccess = '[Rider] Create Ride Success',
}

export const RiderAction = {
  loadRiderList: createAction(ERiderActions.LoadRiderList, props<{ idRoute: number }>()),
  loadRiderListSuccsess: createAction(ERiderActions.LoadRiderListSuccsess, props<{ riderList: IRideInfo }>()),
  createRide: createAction(ERiderActions.CreateRide, props<{ routeId: number; scheduleItem: IScheduleInfo }>()),
  createRideSuccess: createAction(ERiderActions.CreateRideSuccess, props<{ scheduleItem: IScheduleInfo }>()),
};
