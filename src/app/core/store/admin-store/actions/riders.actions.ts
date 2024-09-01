import { IRideInfo } from '@app/admin/models/route-info.module';
import { createAction, props } from '@ngrx/store';

export enum ERiderActions {
  LoadRiderList = '[Rider] Load Rider List',
  LoadRiderListSuccsess = '[Rider] Load Rider List Succsess',
}

export const RiderAction = {
  loadRiderList: createAction(ERiderActions.LoadRiderList, props<{ idRoute: number }>()),
  loadRiderListSuccsess: createAction(ERiderActions.LoadRiderListSuccsess, props<{ riderList: IRideInfo[] }>()),
};
