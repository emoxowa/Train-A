import { initialUserState, IUserState } from '@core/store/user-store/state/user-state';
import { initialOrderState, IOrderState } from '@core/store/order-store/state/order-state';
import { initionalStationState, IStationState } from './admin-store/state/station-state';

export interface AppState {
  stationState: IStationState;
  userState: IUserState;
  orderState: IOrderState;
}

export const initialAppState: AppState = {
  stationState: initionalStationState,
  userState: initialUserState,
  orderState: initialOrderState,
};
