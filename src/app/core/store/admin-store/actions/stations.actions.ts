import { ICreateStation } from '@app/admin/models/create-station.model';
import { IStationList } from '@app/admin/models/station-list.model';
import { createAction, props } from '@ngrx/store';

export enum EStationActions {
  LoadStationList = '[Station] Load Station List',
  LoadStationSuccess = '[Station] Load Station Succsess',
  CreateNewStation = '[Station] Create New Station',
  DeleteStation = '[Station] Delete Station',
  DeleteStationIndicate = '[Station] Delete Station Indicate',
  DeleteStationIndicateSuccsess = '[Station] Delete Station Indicate Succsess',
  CreateNewStationIndicate = '[Station] Create Station Indicate',
  CreateNewStationIndicateSuccsess = '[Station] Create Station Indicate Succsess',
  CreateNewStationIndicateFailed = '[Station] Create Station Indicate Failed',
}

export const StationsActions = {
  loadStationList: createAction(EStationActions.LoadStationList),
  loadStationsSuccess: createAction(EStationActions.LoadStationSuccess, props<{ stations: IStationList[] }>()),
  createNewStation: createAction(EStationActions.CreateNewStation, props<{ station: ICreateStation }>()),
  deleteStation: createAction(EStationActions.DeleteStation, props<{ idStation: number }>()),
  deleteStationIndicate: createAction(EStationActions.DeleteStationIndicate),
  deletStationIndicateSuccsess: createAction(EStationActions.DeleteStationIndicateSuccsess),
  createNewStationIndicate: createAction(EStationActions.CreateNewStationIndicate),
  createNewStationIndicateSuccsess: createAction(EStationActions.CreateNewStationIndicateSuccsess),
  createNewStationIndicateFailed: createAction(EStationActions.CreateNewStationIndicateFailed),
};
