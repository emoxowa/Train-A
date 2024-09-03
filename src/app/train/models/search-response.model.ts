import { IRoute } from './route.model';

export interface IGeolocation {
  latitude: number;
  longitude: number;
}

export interface IStationResponse {
  stationId: number;
  city: string;
  geolocation: IGeolocation;
}

export interface ISearchRoutesResponse {
  from: IStationResponse;
  to: IStationResponse;
  routes: IRoute[];
}
