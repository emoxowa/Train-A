import { createAction, props } from '@ngrx/store';
import { IOrder, IOrderCreateRequest } from '@app/train/models/order.model';

export enum EOrderActions {
  LoadOrders = '[Order] Load Orders',
  LoadOrdersSuccess = '[Order] Load Orders Success',
  LoadOrdersFailure = '[Order] Load Orders Failure',
  CancelOrder = '[Order] Cancel Order',
  CancelOrderSuccess = '[Order] Cancel Order Success',
  CancelOrderFailure = '[Order] Cancel Order Failure',
}

export const OrderActions = {
  loadOrders: createAction(EOrderActions.LoadOrders),
  loadOrdersSuccess: createAction(EOrderActions.LoadOrdersSuccess, props<{ orders: IOrder[] }>()),
  loadOrdersFailure: createAction(EOrderActions.LoadOrdersFailure),
  cancelOrder: createAction(EOrderActions.CancelOrder, props<{ orderId: number }>()),
  cancelOrderSuccess: createAction(EOrderActions.CancelOrderSuccess, props<{ orderId: number }>()),
  cancelOrderFailure: createAction(EOrderActions.CancelOrderFailure),
};
