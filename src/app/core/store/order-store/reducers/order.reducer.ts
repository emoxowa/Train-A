import { createReducer, on } from '@ngrx/store';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { initialOrderState, IOrderState } from '@core/store/order-store/state/order-state';

export const orderReducer = createReducer(
  initialOrderState,
  on(OrderActions.loadOrdersSuccess, (state, { orders }): IOrderState => {
    return {
      ...state,
      orders,
    };
  })
);
