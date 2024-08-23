import { Injectable } from '@angular/core';
import { SearchResponse, searchResponse } from '@app/train/models/search-response.model';
import { Route } from '@app/train/models/route.model';
import { StationData } from '../models/station-data.model';

export interface TripDetails {
  route: Route;
  from: StationData;
  to: StationData;
}
@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private searchResponse: SearchResponse = searchResponse;

  public getTripById(rideId: number): TripDetails | undefined {
    const foundRoute = this.searchResponse.routes.find((route: Route) =>
      route.schedule.some((schedule) => schedule.rideId === rideId)
    );

    if (foundRoute) {
      return {
        route: foundRoute,
        from: this.searchResponse.from,
        to: this.searchResponse.to,
      };
    }

    return undefined;
  }
}
