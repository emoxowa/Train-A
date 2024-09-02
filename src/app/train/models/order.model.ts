export type IOrderCreateRequest = {
  rideId: number;
  seat: number;
  stationStart: number;
  stationEnd: number;
};

export interface IOrderCreateResponse {
  id: number;
}
