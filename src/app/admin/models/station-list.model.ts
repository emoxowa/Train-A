export interface IStationList {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ICity[];
}

export interface ICity {
  id: number;
  connectedTo: IDistance;
  latitude: number;
  longitude: number;
}

export interface IDistance {
  distance: number;
  id: number;
}

export interface ICreateStationResponse {
  id: number;
}
