export interface IRouteInfo {
  id: number;
  path: number[];
  carriages: string[];
  schedule: IScheduleInfo[];
}

export interface IScheduleInfo {
  rideId: number;
  segments: ISegmentInfo[];
  time: [string, string];
  price: IPriceInfo;
}

export interface ISegmentInfo {
  distance: number;
}

export interface IPriceInfo {
  [key: string]: number;
}
