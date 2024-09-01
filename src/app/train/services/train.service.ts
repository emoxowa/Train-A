import { inject, Injectable } from '@angular/core';
import { IStationResponse, ISearchRoutesResponse } from '@app/train/models/search-response.model';
import { ISearchRoutesRequest } from '@app/train/models/search-request.model';
import { IRoute } from '@app/train/models/route.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TuiDay } from '@taiga-ui/cdk';

export interface TripDetails {
  route: IRoute;
  from: IStationResponse;
  to: IStationResponse;
}

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private http = inject(HttpClient);

  private apiUrl = '/api/search';

  private searchResponseSubject = new BehaviorSubject<ISearchRoutesResponse | null>(null);

  public searchResponse$ = this.searchResponseSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  private selectedDateSubject = new BehaviorSubject<TuiDay | null>(null);

  public selectedDate$ = this.selectedDateSubject.asObservable();

  public setSelectedDate(date: TuiDay | null): void {
    this.selectedDateSubject.next(date);
  }

  public searchTrips(searchRequest: ISearchRoutesRequest): Observable<ISearchRoutesResponse> {
    this.loadingSubject.next(true);

    let params = new HttpParams()
      .set('fromLatitude', searchRequest.fromLatitude)
      .set('fromLongitude', searchRequest.fromLongitude)
      .set('toLatitude', searchRequest.toLatitude)
      .set('toLongitude', searchRequest.toLongitude);

    if (searchRequest.time) {
      params = params.set('time', searchRequest.time);
    }

    return this.http.get<ISearchRoutesResponse>(this.apiUrl, { params }).pipe(
      tap((response) => {
        this.searchResponseSubject.next(response);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        this.loadingSubject.next(false);
        return throwError(() => error);
      })
    );
  }
}
