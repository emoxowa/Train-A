import { Segment } from './segment.model';

export interface Schedule {
  rideId: number;
  segments: Segment[];
  time: [string, string];
  price: { [key: string]: number };
  occupiedSeats: number[];
}
