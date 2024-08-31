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
  }),
  on(RoutesActions.deleteRouteSuccsess, (state, { pickRoute }): IRoutesState => {
    return {
      ...state,
      routesList: state.routesList.filter((route) => route.id !== pickRoute),
    };
  }),
  on(RoutesActions.updateRoute, (state, { idRoute, updRoute }): IRoutesState => {
    return {
      ...state,
      routesList: state.routesList.map((route) => {
        if (route.id) {
          return route.id === idRoute ? { ...route, ...updRoute } : route;
        }
        return route;
      }),
    };
  })
);
