import { createReducer, on } from '@ngrx/store';
import { initionalRoutesState, IRoutesState } from '../state/routes-state';
import { RoutesActions } from '../actions/routes.action';

export const routesReducer = createReducer(
  initionalRoutesState,
  on(RoutesActions.loadRoutesListSuccsess, (state, { routesList }): IRoutesState => {
    return {
      ...state,
      routesList,
    };
  }),
  on(RoutesActions.addNewRouteSuccsess, (state, { newRoute }): IRoutesState => {
    return {
      ...state,
      routesList: [newRoute, ...state.routesList],
    };
  })
);
