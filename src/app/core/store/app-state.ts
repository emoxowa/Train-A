import { initialUserState, IUserState } from '@core/store/user-store/state/user-state';
import { initialOrderState, IOrderState } from '@core/store/order-store/state/order-state';
import { ICarriageState, initionalCarriageState } from './admin-store/state/carriage-state';
import { initionalStationState, IStationState } from './admin-store/state/station-state';
import { initionalRoutesState, IRoutesState } from './admin-store/state/routes-state';
import { initionalRiderState, IRiderState } from './admin-store/state/riders-state';

export interface AppState {
  stationState: IStationState;
  userState: IUserState;
  carriageState: ICarriageState;
  routesState: IRoutesState;
  riderListState: IRiderState;
  orderState: IOrderState;
}

export const initialAppState: AppState = {
  stationState: initionalStationState,
  userState: initialUserState,
  carriageState: initionalCarriageState,
  routesState: initionalRoutesState,
  riderListState: initionalRiderState,
  orderState: initialOrderState,
};
