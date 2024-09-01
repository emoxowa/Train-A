import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICreateStationResponse, IStation } from '../models/station-list.model';
import { ICreateStation } from '../models/create-station.model';
import { IAdminToken, ICreateAdmin } from '../models/create-admin';
import { ICarriage } from '../models/create-new-carriage-type.model';

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

  // it's for developing
  loginAdmin(admin: ICreateAdmin): Observable<IAdminToken> {
    return this.http.post<IAdminToken>(`/api/signin`, admin);
  }
}
