import { Pipe, PipeTransform } from '@angular/core';
import { IRideInformation } from '@app/train/models/ride-information.model';

@Pipe({
  name: 'trimRideInformation',
  standalone: true,
})
export class TrimRideInformationPipe implements PipeTransform {
  transform(rideInfo: IRideInformation, stationStart: number, stationEnd: number): IRideInformation {
    const startIndex = rideInfo.path.indexOf(stationStart);
    const endIndex = rideInfo.path.indexOf(stationEnd);

    const trimmedPath = rideInfo.path.slice(startIndex, endIndex);
    const trimmedSegments = rideInfo.schedule.segments.slice(startIndex, endIndex);

    return {
      ...rideInfo,
      path: trimmedPath,
      schedule: { segments: trimmedSegments },
    };
  }
}
