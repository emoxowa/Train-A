import { ISegment } from '@app/train/models/segment.model';

export interface IOrder {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  userId: number;
  status: 'active' | 'completed' | 'rejected' | 'canceled';
  path: number[];
  carriages: string[];
  schedule: { segments: IOrderScheduleSegment[] };
  stationStart: number;
  stationEnd: number;
}

export type IOrderCreateRequest = Pick<IOrder, 'rideId' | 'seatId' | 'stationStart' | 'stationEnd'>;

export interface IOrderCreateResponse {
  id: number;
}

type IOrderScheduleSegment = Pick<ISegment, 'time' | 'price'>;
