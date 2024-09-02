import { initialUserState, IUserState } from '@core/store/user-store/state/user-state';
import { initialOrderState, IOrderState } from '@core/store/order-store/state/order-state';
import { ICarriageState, initionalCarriageState } from './admin-store/state/carriage-state';
import { initionalStationState, IStationState } from './admin-store/state/station-state';

export interface AppState {
  stationState: IStationState;
  userState: IUserState;
  carriageState: ICarriageState;
  orderState: IOrderState;
}

export const initialAppState: AppState = {
  stationState: initionalStationState,
  userState: initialUserState,
  carriageState: initionalCarriageState,
  orderState: initialOrderState,
};
