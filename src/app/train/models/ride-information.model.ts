import { ISegment } from './segment.model';

export interface IScheduleRideInformation {
  segments: ISegment[];
}

export interface IRideInformation {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: IScheduleRideInformation;
}
