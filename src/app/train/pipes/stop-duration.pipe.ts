import { Pipe, PipeTransform } from '@angular/core';
import { ISegment } from '@app/train/models/segment.model';

@Pipe({
  name: 'stopDuration',
  standalone: true,
})
export class StopDurationPipe implements PipeTransform {
  transform(segment: ISegment, index: number, segments: ISegment[]): string {
    const arrivalTime = new Date(segment.time[0]).getTime();
    const departureTime = index > 0 ? new Date(segments[index - 1].time[1]).getTime() : arrivalTime;

    const dwellTime = (arrivalTime - departureTime) / (1000 * 60);

    return `${dwellTime} min`;
  }
}
