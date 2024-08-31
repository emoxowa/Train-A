import { ISchedule } from '@app/train/models/schedule.model';

export interface IOrder {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  userId: number;
  status: 'active' | 'completed' | 'rejected' | 'canceled';
  path: number[];
  carriages: string[];
  schedule: ISchedule;
}
