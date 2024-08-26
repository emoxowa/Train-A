import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { createAction, props } from '@ngrx/store';

export enum ECarriageActions {
  LoadCarriagesList = '[Carriage] Load Carriage List',
  LoadCarriagesListSuccsess = '[Carriage] Load Carriage List Succsess',
  UpdCarriageType = '[Carriage] Upd Carriage Type',
  UpdCarriageTypeSuccsess = '[Carriage] Upd Carriage Type Succsess',
  CreateNewCarriageType = '[Carriage] Create New Carriage Type',
}

export const CarriageActions = {
  loadCarriagesList: createAction(ECarriageActions.LoadCarriagesList),
  loadCarriagesListSuccsess: createAction(
    ECarriageActions.LoadCarriagesListSuccsess,
    props<{ carriageList: ICarriagesType[] }>()
  ),
  updCarriageType: createAction(ECarriageActions.UpdCarriageType),
  updCarriageTypeSuccsess: createAction(ECarriageActions.UpdCarriageTypeSuccsess),
  createNewCarriageType: createAction(
    ECarriageActions.CreateNewCarriageType,
    props<{ newCarriages: ICarriagesType }>()
  ),
};
