import { Pipe, PipeTransform } from '@angular/core';
import { IRoute } from '@app/train/models/route.model';
import { ISearchRoutesResponse } from '@app/train/models/search-response.model';

@Pipe({
  name: 'trimRoute',
  standalone: true,
})
export class TrimRoutePipe implements PipeTransform {
  transform(route: IRoute, searchResponse: ISearchRoutesResponse): IRoute {
    const fromStationId = searchResponse.from.stationId;
    const toStationId = searchResponse.to.stationId;

    const startIndex = route.path.indexOf(fromStationId);
    const endIndex = route.path.indexOf(toStationId);

    const trimmedPath = route.path.slice(startIndex, endIndex);
    const trimmedSchedule = route.schedule.map((schedule) => ({
      ...schedule,
      segments: schedule.segments.slice(startIndex, endIndex),
    }));

    return {
      ...route,
      path: trimmedPath,
      schedule: trimmedSchedule,
    };
  }
}
