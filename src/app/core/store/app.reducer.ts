import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from '@core/store/user-store/reducers/user.reducer';
import { AppState } from './app-state';
import { stationsReducer } from './admin-store/reducers/stations.reducer';
import { routesReducer } from './admin-store/reducers/routes.reducer';
import { carriageReducer } from './admin-store/reducers/carriage.reducer';
import { rideReducer } from './admin-store/reducers/ride.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  stationState: stationsReducer,
  userState: userReducer,
  carriageState: carriageReducer,
  routesState: routesReducer,
  riderListState: rideReducer,
};
