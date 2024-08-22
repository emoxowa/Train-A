import { GeoLocation } from './geo-location.model';

export interface StationData {
  stationId: number;
  city: string;
  geolocation: GeoLocation;
}
