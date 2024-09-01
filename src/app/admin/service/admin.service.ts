import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICreateStationResponse, IStation } from '../models/station-list.model';
import { ICreateStation } from '../models/create-station.model';
import { IAdminToken, ICreateAdmin } from '../models/create-admin';
import { ICarriage } from '../models/create-new-carriage-type.model';
import { IRoutes } from '../models/routes.model';
import { IRideInfo, IScheduleInfo } from '../models/route-info.module';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  public token$ = new BehaviorSubject('');

  getStationList(): Observable<IStation[]> {
    return this.http.get<IStation[]>(`/api/station`);
  }

  createNewStation(stationData: ICreateStation): Observable<ICreateStationResponse> {
    return this.http.post<ICreateStationResponse>(`/api/station`, stationData, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  deleteStation(stationId: number): Observable<void> {
    return this.http.delete<void>(`/api/station/${stationId}`, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  getCarriageList(): Observable<ICarriage[]> {
    return this.http.get<ICarriage[]>('/api/carriage');
  }

  createNewCarriageType(newCarriageType: ICarriage): Observable<Pick<ICarriage, 'code'>> {
    return this.http.post<ICarriage>('/api/carriage', newCarriageType, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  updateCarriageType(carriageType: string, updateCarriageType: ICarriage): Observable<Omit<ICarriage, 'code'>> {
    return this.http.put<Omit<ICarriage, 'code'>>(`/api/carriage/${carriageType}`, updateCarriageType, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  getRoutes(): Observable<IRoutes[]> {
    return this.http.get<IRoutes[]>('/api/route');
  }

  createRoute(newRoute: IRoutes): Observable<IRoutes> {
    return this.http.post<IRoutes>('/api/route', newRoute, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  updRoutes(IdRoute: number, updRoute: IRoutes): Observable<IRoutes> {
    return this.http.put<IRoutes>(`/api/route/${IdRoute}`, updRoute, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  deleteRoute(IdRoute: number): Observable<void> {
    return this.http.delete<void>(`/api/route/${IdRoute}`, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  getRouteInformation(idRoute: number): Observable<IRideInfo> {
    return this.http.get<IRideInfo>(`/api/route/${idRoute}`, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  createNewRide(idRoute: number, newRideInfo: IScheduleInfo): Observable<number> {
    return this.http.post<number>(`/api/route/${idRoute}/ride`, newRideInfo, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  updateRide(idRoute: number, rideId: number, updRideInfo: IScheduleInfo): Observable<void> {
    return this.http.put<void>(`/api/route/${idRoute}/ride/${rideId}`, updRideInfo, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  deleteRide(idRoute: number, rideId: number): Observable<void> {
    return this.http.delete<void>(`/api/route/${idRoute}/ride/${rideId}`, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  // it's for developing
  loginAdmin(admin: ICreateAdmin): Observable<IAdminToken> {
    return this.http.post<IAdminToken>(`/api/signin`, admin);
  }
}
