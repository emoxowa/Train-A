import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICreateStationResponse, IStation } from '../models/station-list.model';
import { ICreateStation } from '../models/create-station.model';
import { IAdminToken, ICreateAdmin } from '../models/create-admin';

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

  // it's for developing
  loginAdmin(admin: ICreateAdmin): Observable<IAdminToken> {
    return this.http.post<IAdminToken>(`/api/signin`, admin);
  }
}
