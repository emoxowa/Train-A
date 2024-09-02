import { createReducer, on } from '@ngrx/store';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { initialOrderState, IOrderState } from '@core/store/order-store/state/order-state';
import { EOrderStatus } from '@app/train/models/order.model';

export const orderReducer = createReducer(
  initialOrderState,
  on(OrderActions.loadOrdersSuccess, (state, { orders }): IOrderState => {
    return {
      ...state,
      orders,
    };
  }),
  on(OrderActions.cancelOrderSuccess, (state, { orderId }): IOrderState => {
    return {
      ...state,
      orders: state.orders.map((order) => (order.id === orderId ? { ...order, status: EOrderStatus.canceled } : order)),
    };
  })
);
