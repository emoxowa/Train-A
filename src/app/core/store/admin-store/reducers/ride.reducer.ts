import { createReducer, on } from '@ngrx/store';
import { initionalRiderState, IRiderState } from '../state/riders-state';
import { RiderAction } from '../actions/riders.actions';

export const rideReducer = createReducer(
  initionalRiderState,
  on(RiderAction.loadRiderListSuccsess, (state, { riderList }): IRiderState => {
    return {
      ...state,
      riderList,
    };
  })
);
