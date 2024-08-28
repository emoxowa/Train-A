import { initialUserState, IUserState } from '@core/store/user-store/state/user-state';
import { initionalStationState, IStationState } from './admin-store/state/station-state';

export interface AppState {
  stationState: IStationState;
  userState: IUserState;
}

export const initialAppState: AppState = {
  stationState: initionalStationState,
  userState: initialUserState,
};
