import { initialUserState, IUserState } from '@core/store/user-store/state/user-state';
import { ICarriageState, initionalCarriageState } from './admin-store/state/carriage-state';
import { initionalStationState, IStationState } from './admin-store/state/station-state';

export interface AppState {
  stationState: IStationState;
  userState: IUserState;
  carriageState: ICarriageState;
}

export const initialAppState: AppState = {
  stationState: initionalStationState,
  userState: initialUserState,
  carriageState: initionalCarriageState,
};
