import { createSelector } from '@ngrx/store';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { AppState } from '../../app-state';

export const selectAppState = (state: AppState) => state;

export const selectCarriagesArr = createSelector(selectAppState, (state: AppState) => state.carriageState.carriageList);

export const selectCarriagesIdAndName = createSelector(selectCarriagesArr, (carriagesList: ICarriagesType[]) =>
  carriagesList.map(({ code, name }) => ({ code, name }))
);
