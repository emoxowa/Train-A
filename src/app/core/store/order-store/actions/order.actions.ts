import { createAction, props } from '@ngrx/store';
import { IOrder } from '@app/train/models/order.model';

export enum EOrderActions {
  LoadOrders = '[Order] Load Orders',
  LoadOrdersSuccess = '[Order] Load Orders Success',
  LoadOrdersFailure = '[Order] Load Orders Failure',
}

export const OrderActions = {
  loadOrders: createAction(EOrderActions.LoadOrders),
  loadOrdersSuccess: createAction(EOrderActions.LoadOrdersSuccess, props<{ orders: IOrder[] }>()),
  loadOrdersFailure: createAction(EOrderActions.LoadOrdersFailure),
};
