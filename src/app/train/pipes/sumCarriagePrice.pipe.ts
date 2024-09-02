import { Pipe, PipeTransform } from '@angular/core';
import { ISchedule } from '../models/schedule.model';
import { IScheduleRideInformation } from '../models/ride-information.model';

@Pipe({
  name: 'sumCarriagePrice',
  standalone: true,
})
export class SumCarriagePricePipe implements PipeTransform {
  transform(schedule: ISchedule | IScheduleRideInformation, carriageType: string): number {
    return schedule.segments.reduce((total, segment) => {
      return total + (segment.price[carriageType] || 0);
    }, 0);
  }
}
