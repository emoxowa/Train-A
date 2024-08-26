import { ICarriageState, initionalCarriageState } from './admin-store/state/carriage-state';
import { initionalStationState, IStationState } from './admin-store/state/station-state';

export interface AppState {
  stationState: IStationState;
  carriageState: ICarriageState;
}

export const initialAppState: AppState = {
  stationState: initionalStationState,
  carriageState: initionalCarriageState,
};
