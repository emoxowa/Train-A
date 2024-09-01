import { ISegment } from './segment.model';

export interface ISchedule {
  rideId: number;
  segments: ISegment[];
}
