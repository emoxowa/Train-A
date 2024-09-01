import { initionalStationState, IStationState } from './admin-store/state/station-state';
import { ICarriageState, initionalCarriageState } from './admin-store/state/carriage-state';
import { initialUserState, IUserState } from '@core/store/user-store/state/user-state';
import { initionalRoutesState, IRoutesState } from './admin-store/state/routes-state';

export interface AppState {
  stationState: IStationState;
  userState: IUserState;
  carriageState: ICarriageState;
  routesState: IRoutesState;
}

export const initialAppState: AppState = {
  stationState: initionalStationState,
  userState: initialUserState,
  carriageState: initionalCarriageState,
  routesState: initionalRoutesState,
};
