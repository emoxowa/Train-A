import { inject, Injectable } from '@angular/core';
import { IStationResponse, ISearchRoutesResponse } from '@app/train/models/search-response.model';
import { IRoute } from '@app/train/models/route.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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

  public searchTrips(
    fromLatitude: number,
    fromLongitude: number,
    toLatitude: number,
    toLongitude: number,
    time?: number
  ): Observable<ISearchRoutesResponse> {
    this.loadingSubject.next(true);

    let params = new HttpParams()
      .set('fromLatitude', fromLatitude)
      .set('fromLongitude', fromLongitude)
      .set('toLatitude', toLatitude)
      .set('toLongitude', toLongitude);

    if (time) {
      params = params.set('time', time);
    }

    return this.http.get<ISearchRoutesResponse>(this.apiUrl, { params }).pipe(
      tap({
        next: (response) => {
          this.searchResponseSubject.next(response);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.loadingSubject.next(false);
        },
      })
    );
  }

  public getCurrentSearchResponse(): ISearchRoutesResponse | null {
    return this.searchResponseSubject.value;
  }

  public getTripById(rideId: number): TripDetails | undefined {
    const searchResponse = this.getCurrentSearchResponse();

    if (!searchResponse) {
      return undefined;
    }

    const foundRoute = searchResponse.routes.find((route: IRoute) =>
      route.schedule.some((schedule) => schedule.rideId === rideId)
    );

    if (foundRoute) {
      return {
        route: foundRoute,
        from: searchResponse.from,
        to: searchResponse.to,
      };
    }

    return undefined;
  }
}
