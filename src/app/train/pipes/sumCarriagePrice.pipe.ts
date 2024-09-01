import { Pipe, PipeTransform } from '@angular/core';
import { ISchedule } from '../models/schedule.model';

@Pipe({
  name: 'sumCarriagePrice',
  standalone: true,
})
export class SumCarriagePricePipe implements PipeTransform {
  transform(schedule: ISchedule, carriageType: string): number {
    return schedule.segments.reduce((total, segment) => {
      return total + (segment.price[carriageType] || 0);
    }, 0);
  }
}
