import { createAction, props } from '@ngrx/store';
import { IOrder, IOrderCreateRequest } from '@app/train/models/order.model';

export enum EOrderActions {
  LoadOrders = '[Order] Load Orders',
  LoadOrdersSuccess = '[Order] Load Orders Success',
  LoadOrdersFailure = '[Order] Load Orders Failure',
  CreateOrder = '[Order] Create Order',
  CreateOrderSuccess = '[Order] Create Order Success',
  CreateOrderFailure = '[Order] Create Order Failure',
  CancelOrder = '[Order] Cancel Order',
  CancelOrderSuccess = '[Order] Cancel Order Success',
  CancelOrderFailure = '[Order] Cancel Order Failure',
}

export const OrderActions = {
  loadOrders: createAction(EOrderActions.LoadOrders),
  loadOrdersSuccess: createAction(EOrderActions.LoadOrdersSuccess, props<{ orders: IOrder[] }>()),
  loadOrdersFailure: createAction(EOrderActions.LoadOrdersFailure),
  createOrder: createAction(EOrderActions.CreateOrder, props<{ orderRequest: IOrderCreateRequest }>()),
  createOrderSuccess: createAction(EOrderActions.CreateOrderSuccess, props<{ order: IOrder }>()),
  createOrderFailure: createAction(EOrderActions.CreateOrderFailure),
  cancelOrder: createAction(EOrderActions.CancelOrder, props<{ orderId: number }>()),
  cancelOrderSuccess: createAction(EOrderActions.CancelOrderSuccess, props<{ orderId: number }>()),
  cancelOrderFailure: createAction(EOrderActions.CancelOrderFailure),
};
