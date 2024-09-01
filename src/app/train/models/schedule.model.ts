import { ISegment } from './segment.model';

export interface ISchedule {
  rideId: number;
  segments: ISegment[];
  time: [string, string];
  price: Record<string, number>;
  occupiedSeats: number[];
}
