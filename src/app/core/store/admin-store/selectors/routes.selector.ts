import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';

export const selectAppState = (state: AppState) => state;

export const selectRoutesArr = createSelector(selectAppState, (state: AppState) => state.routesState.routesList);
