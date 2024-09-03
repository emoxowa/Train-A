import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateStationResponse, IStation } from '../models/station-list.model';
import { ICreateStation } from '../models/create-station.model';
import { ICarriage } from '../models/create-new-carriage-type.model';
import { IRoutes } from '../models/routes.model';
import { IRideInfo, IScheduleInfo } from '../models/route-info.module';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  getStationList(): Observable<IStation[]> {
    return this.http.get<IStation[]>(`/api/station`);
  }

  createNewStation(stationData: ICreateStation): Observable<ICreateStationResponse> {
    return this.http.post<ICreateStationResponse>(`/api/station`, stationData);
  }

  deleteStation(stationId: number): Observable<void> {
    return this.http.delete<void>(`/api/station/${stationId}`);
  }

  getCarriageList(): Observable<ICarriage[]> {
    return this.http.get<ICarriage[]>('/api/carriage');
  }

  createNewCarriageType(newCarriageType: ICarriage): Observable<Pick<ICarriage, 'code'>> {
    return this.http.post<ICarriage>('/api/carriage', newCarriageType);
  }

  updateCarriageType(carriageType: string, updateCarriageType: ICarriage): Observable<Omit<ICarriage, 'code'>> {
    return this.http.put<Omit<ICarriage, 'code'>>(`/api/carriage/${carriageType}`, updateCarriageType);
  }

  getRoutes(): Observable<IRoutes[]> {
    return this.http.get<IRoutes[]>('/api/route');
  }

  createRoute(newRoute: IRoutes): Observable<IRoutes> {
    return this.http.post<IRoutes>('/api/route', newRoute);
  }

  updRoutes(IdRoute: number, updRoute: IRoutes): Observable<IRoutes> {
    return this.http.put<IRoutes>(`/api/route/${IdRoute}`, updRoute);
  }

  deleteRoute(IdRoute: number): Observable<void> {
    return this.http.delete<void>(`/api/route/${IdRoute}`);
  }

  getRouteInformation(idRoute: number): Observable<IRideInfo> {
    return this.http.get<IRideInfo>(`/api/route/${idRoute}`);
  }

  createNewRide(idRoute: number, newRideInfo: IScheduleInfo): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`/api/route/${idRoute}/ride`, newRideInfo);
  }

  updateRide(idRoute: number, rideId: number, updRideInfo: IScheduleInfo): Observable<void> {
    return this.http.put<void>(`/api/route/${idRoute}/ride/${rideId}`, updRideInfo);
  }

  deleteRide(idRoute: number, rideId: number): Observable<void> {
    return this.http.delete<void>(`/api/route/${idRoute}/ride/${rideId}`);
  }
}
