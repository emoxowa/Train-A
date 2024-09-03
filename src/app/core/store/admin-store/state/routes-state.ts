import { IRoutes } from '@app/admin/models/routes.model';

export interface IRoutesState {
  routesList: IRoutes[];
}

export const initionalRoutesState: IRoutesState = {
  routesList: [],
};
