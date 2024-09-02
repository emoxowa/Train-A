import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';

export const selectAppState = (state: AppState) => state;

export const selectCarriagesArr = createSelector(selectAppState, (state: AppState) => state.carriageState.carriageList);
