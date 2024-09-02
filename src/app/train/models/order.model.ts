import { ISegment } from '@app/train/models/segment.model';

export interface IOrder {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  status: EOrderStatus;
  path: number[];
  carriages: string[];
  schedule: { segments: IOrderScheduleSegment[] };
  stationStart: number;
  stationEnd: number;
  userId?: number;
}

export type IOrderCreateRequest = {
  rideId: number;
  seat: number;
  stationStart: number;
  stationEnd: number;
};

export interface IOrderCreateResponse {
  id: number;
}

export interface IOrderViewData {
  id: number;
  stationStart: number;
  timeStart: string;
  stationEnd: number;
  timeEnd: string;
  carriageType: string;
  carriageNumber: number;
  seatNumber: number;
  price: number;
  status: EOrderStatus;
  userId?: number;
}

export const enum EOrderStatus {
  active = 'active',
  completed = 'completed',
  rejected = 'rejected',
  canceled = 'canceled',
}

type IOrderScheduleSegment = Pick<ISegment, 'time' | 'price'>;
