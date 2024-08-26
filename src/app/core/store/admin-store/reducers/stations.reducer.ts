import { createReducer, on } from '@ngrx/store';
import { initionalStationState, IStationState } from '../state/station-state';
import { StationsActions } from '../actions/stations.actions';

export const stationsReducer = createReducer(
  initionalStationState,
  on(StationsActions.loadStationsSuccess, (state, { stations }): IStationState => {
    return {
      ...state,
      stationList: stations,
    };
  }),
  on(StationsActions.deleteStationIndicate, (state): IStationState => {
    return {
      ...state,
      deletingIndicate: true,
    };
  }),
  on(StationsActions.deletStationIndicateSuccsess, (state): IStationState => {
    return {
      ...state,
      deletingIndicate: false,
    };
  }),
  on(StationsActions.createNewStationIndicate, (state): IStationState => {
    return {
      ...state,
      creatingIndicate: true,
    };
  }),
  on(StationsActions.createNewStationIndicateSuccsess, (state): IStationState => {
    return {
      ...state,
      creatingIndicate: false,
    };
  }),
  on(StationsActions.createNewStationIndicateFailed, (state): IStationState => {
    return {
      ...state,
      creatingIndicate: false,
    };
  })
);
