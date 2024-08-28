export interface ICreateStation {
  city: string;
  latitude: number;
  longitude: number;
  relations: number[];
}

export interface ICreateStationResponse {
  id: number;
}
