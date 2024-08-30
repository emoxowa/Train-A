import { createSelector } from '@ngrx/store';
import { AppState } from '../../app-state';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';

export const selectAppState = (state: AppState) => state;

export const selectCarriagesArr = createSelector(selectAppState, (state: AppState) => state.carriageState.carriageList);

export const selectCarriagesIdAndName = createSelector(
    selectCarriagesArr,
    (carriagesList: ICarriagesType[]) => 
      carriagesList.map(({ code, name }) => ({ code, name }))
  );