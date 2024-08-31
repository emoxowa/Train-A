import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
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
    props<{ carriageList: ICarriage[] }>()
  ),
  updCarriageType: createAction(
    ECarriageActions.UpdCarriageType,
    props<{ code: string; updatedCarriage: Omit<ICarriage, 'code'> }>()
  ),
  updCarriageTypeSuccsess: createAction(
    ECarriageActions.UpdCarriageTypeSuccsess,
    props<{ code: string; updatedCarriage: Omit<ICarriage, 'code'> }>()
  ),
  createNewCarriageType: createAction(
    ECarriageActions.CreateNewCarriageType,
    props<{ newCarriages: ICarriage }>()
  ),
};
