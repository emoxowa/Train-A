import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICreateStationResponse, IStationList } from '../models/station-list.model';
import { ICreateStation } from '../models/create-station.model';
import { IAdminToken, ICreateAdmin } from '../models/create-admin';
import { ICarriagesType } from '../models/create-new-carriage-type.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  public token$ = new BehaviorSubject('');

  getStationList(): Observable<IStationList[]> {
    return this.http.get<IStationList[]>(`/api/station`);
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

  getCarriageList(): Observable<ICarriagesType[]> {
    return this.http.get<ICarriagesType[]>('/api/carriage');
  }

  createNewCarriageType(newCarriageType: Omit<ICarriagesType, 'code'>) {
    return this.http.post('/api/carriage', newCarriageType, {
      headers: {
        Authorization: `Bearer ${this.token$.value}`,
      },
    });
  }

  updateCarriageType(carriageType: string, updateCarriageType: Omit<ICarriagesType, 'code'>) {
    return this.http.put(`/api/carriage/${carriageType}`, updateCarriageType);
  }

  // it's for developing
  loginAdmin(admin: ICreateAdmin): Observable<IAdminToken> {
    return this.http.post<IAdminToken>(`/api/signin`, admin);
  }
}
