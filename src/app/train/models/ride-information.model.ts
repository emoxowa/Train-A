import { ISegment } from './segment.model';

export interface IRideInformation {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: {
    segments: ISegment[];
  };
}
