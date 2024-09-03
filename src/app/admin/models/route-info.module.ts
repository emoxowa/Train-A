export interface IRideInfo {
  id: number;
  path: number[];
  carriages: string[];
  schedule: IScheduleInfo[];
}

export interface IScheduleInfo {
  rideId?: number;
  segments: ISegmentInfo[];
}

export interface ISegmentInfo {
  time: [string, string];
  price: IPriceInfo;
}

export interface IPriceInfo {
  [key: string]: number;
}
