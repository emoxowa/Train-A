import { createReducer, on } from '@ngrx/store';
import { ICarriageState, initionalCarriageState } from '../state/carriage-state';
import { CarriageActions } from '../actions/carriage.actions';

export const carriageReducer = createReducer(
  initionalCarriageState,
  on(CarriageActions.loadCarriagesListSuccsess, (state, { carriageList }): ICarriageState => {
    return {
      ...state,
      carriageList,
    };
  }),
  on(CarriageActions.createNewCarriageType, (state, { newCarriages }): ICarriageState => {
    return {
      ...state,
      carriageList: [newCarriages, ...state.carriageList],
    };
  }),
  on(CarriageActions.updCarriageType, (state, { code, updatedCarriage }): ICarriageState => {
    return {
      ...state,
      carriageList: state.carriageList.map((carriage) =>
        carriage.code === code ? { ...carriage, updatedCarriage } : carriage
      ),
    };
  })
);
