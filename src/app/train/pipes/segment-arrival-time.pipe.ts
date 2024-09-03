import { Pipe, PipeTransform } from '@angular/core';
import { ISegment } from '@app/train/models/segment.model';

@Pipe({
  name: 'segmentArrivalTime',
  standalone: true,
})
export class SegmentArrivalTimePipe implements PipeTransform {
  transform(index: number, segments: ISegment[]): string {
    if (index > 0) {
      return segments[index - 1].time[1];
    }
    return '';
  }
}
