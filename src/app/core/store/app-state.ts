import { ICarriageState, initionalCarriageState } from './admin-store/state/carriage-state';
import { initionalRoutesState, IRoutesState } from './admin-store/state/routes-state';
import { initionalStationState, IStationState } from './admin-store/state/station-state';

export interface AppState {
  stationState: IStationState;
  carriageState: ICarriageState;
  routesState: IRoutesState;
}

export const initialAppState: AppState = {
  stationState: initionalStationState,
  carriageState: initionalCarriageState,
  routesState: initionalRoutesState,
};
