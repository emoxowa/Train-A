import { IRoutes } from '@app/admin/models/routes.model';
import { createAction, props } from '@ngrx/store';

export enum ERoutesActions {
  LoadRoutesList = '[Routes] Load Routes List',
  LoadRoutesListSuccsess = '[Routes] Load Routes List Succsess',
}

export const RoutesActions = {
  loadRoutesList: createAction(ERoutesActions.LoadRoutesList),
  loadRoutesListSuccsess: createAction(ERoutesActions.LoadRoutesListSuccsess, props<{ routesList: IRoutes[] }>()),
};
