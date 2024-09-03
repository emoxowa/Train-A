import { createSelector } from '@ngrx/store';
import { IOrderState } from '@core/store/order-store/state/order-state';
import { AppState } from '../../app-state';

export const selectOrderState = (state: AppState) => state.orderState;

export const selectOrders = createSelector(selectOrderState, (orderState: IOrderState) => orderState.orders);
