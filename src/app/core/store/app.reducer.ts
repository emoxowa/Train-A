import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app-state';
import { stationsReducer } from './admin-store/reducers/stations.reducer';
import { carriageReducer } from './admin-store/reducers/carriage.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  stationState: stationsReducer,
  carriageState: carriageReducer,
};
