import { initionalStationState, IStationState } from './admin-store/state/station-state';

export interface AppState {
  stationState: IStationState;
}

export const initialAppState: AppState = {
  stationState: initionalStationState,
};
