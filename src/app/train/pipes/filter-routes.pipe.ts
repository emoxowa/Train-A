import { Pipe, PipeTransform } from '@angular/core';
import { ISearchRoutesResponse } from '@app/train/models/search-response.model';
import { TuiDay } from '@taiga-ui/cdk';
import { IRoute } from '../models/route.model';

@Pipe({
  name: 'filterRoutes',
  standalone: true,
})
export class FilterRoutesPipe implements PipeTransform {
  transform(response: ISearchRoutesResponse | null, selectedDate: TuiDay | null): ISearchRoutesResponse | null {
    if (!response || !selectedDate) {
      return response;
    }

    const startOfDay = selectedDate.toUtcNativeDate();
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    const filteredRoutes: IRoute[] = response.routes
      .map((route) => {
        const filteredSchedule = route.schedule.filter((schedule) => {
          const startStationIndex = route.path.findIndex((stationId) => stationId === response.from.stationId);

          if (startStationIndex === -1) {
            return false;
          }

          const startSegment = schedule.segments.find((segment, index) => {
            return route.path[index] === response.from.stationId;
          });

          if (!startSegment) {
            return false;
          }

          const scheduleTime = new Date(startSegment.time[0]);
          return scheduleTime >= startOfDay && scheduleTime <= endOfDay;
        });

        return { ...route, schedule: filteredSchedule };
      })
      .filter((route) => route.schedule.length > 0);

    return { ...response, routes: filteredRoutes };
  }
}
