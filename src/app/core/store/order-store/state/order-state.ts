import { IOrder } from '@app/train/models/order.model';

export interface IOrderState {
  orders: IOrder[];
}

export const initialOrderState: IOrderState = {
  orders: [],
};
