import { IRoutes } from '@app/admin/models/routes.model';
import { createAction, props } from '@ngrx/store';

export enum ERoutesActions {
  LoadRoutesList = '[Routes] Load Routes List',
  LoadRoutesAndStations = '[Routes] Load Routes And Stations',
  LoadRoutesListSuccsess = '[Routes] Load Routes List Succsess',
  AddNewRoute = '[Routes] Add New Route',
  AddNewRouteSuccsess = '[Routes] Add New Route Succsess',
  DeleteRoute = '[Routes] Delete Route',
  DeleteRouteSuccsess = '[Routes] Delete Route Succsess',
}

export const RoutesActions = {
  loadRoutesList: createAction(ERoutesActions.LoadRoutesList),
  loadRoutesAndStations: createAction(ERoutesActions.LoadRoutesAndStations),
  loadRoutesListSuccsess: createAction(ERoutesActions.LoadRoutesListSuccsess, props<{ routesList: IRoutes[] }>()),
  addNewRoute: createAction(ERoutesActions.AddNewRoute, props<{ newRoute: IRoutes }>()),
  addNewRouteSuccsess: createAction(ERoutesActions.AddNewRouteSuccsess, props<{ newRoute: IRoutes }>()),
  deleteRoute: createAction(ERoutesActions.DeleteRoute, props<{ pickRoute: number }>()),
  deleteRouteSuccsess: createAction(ERoutesActions.DeleteRouteSuccsess, props<{ pickRoute: number }>()),
};
