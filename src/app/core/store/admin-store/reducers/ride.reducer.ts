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
  }),
  on(RiderAction.createRideSuccess, (state, { scheduleItem }): IRiderState => {
    return {
      ...state,
      riderList: {
        ...state.riderList,
        schedule: [...state.riderList.schedule, scheduleItem],
      },
    };
  }),
  on(RiderAction.updateRideSuccess, (state, { scheduleItem }): IRiderState => {
    return {
      ...state,
      riderList: {
        ...state.riderList,
        schedule: state.riderList.schedule.map((oldScheduleItem) => {
          if (oldScheduleItem.rideId === scheduleItem.rideId) {
            return scheduleItem;
          }
          return oldScheduleItem;
        }),
      },
    };
  })
);
