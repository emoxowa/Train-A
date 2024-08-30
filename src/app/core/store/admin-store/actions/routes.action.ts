import { IRoutes } from '@app/admin/models/routes.model';
import { createAction, props } from '@ngrx/store';

export enum ERoutesActions {
  LoadRoutesList = '[Routes] Load Routes List',
  LoadRoutesAndStations = '[Routes] Load Routes And Stations',
  LoadRoutesListSuccsess = '[Routes] Load Routes List Succsess',
}

export const RoutesActions = {
  loadRoutesList: createAction(ERoutesActions.LoadRoutesList),
  loadRoutesAndStations: createAction(ERoutesActions.LoadRoutesAndStations),
  loadRoutesListSuccsess: createAction(ERoutesActions.LoadRoutesListSuccsess, props<{ routesList: IRoutes[] }>()),
};
