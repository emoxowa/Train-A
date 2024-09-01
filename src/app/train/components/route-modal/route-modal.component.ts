import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ISegment } from '@app/train/models/segment.model';
import { TuiButton, TuiDialog, TuiDialogContext, TuiScrollbar } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { selectStationIdAndCity } from '@app/core/store/admin-store/selectors/stations.selectors';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RouteModalData } from '../search-results/search-results.component';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [CommonModule, TuiDialog, TuiButton, TuiScrollbar],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss',
})
export class RouteModalComponent {
  private store = inject(Store);

  private readonly context = inject<TuiDialogContext<void, RouteModalData>>(POLYMORPHEUS_CONTEXT);

  public stationArr$ = this.store.select(selectStationIdAndCity);

  protected getCityName(stationId: number): Observable<string | undefined> {
    return this.stationArr$.pipe(map((stations) => stations.find((station) => station.id === stationId)?.city));
  }

  protected get data(): RouteModalData {
    return this.context.data;
  }

  protected getSegmentArrivalTime(index: number): string {
    if (index > 0) {
      return this.data.schedule.segments[index - 1].time[1];
    }
    return '';
  }

  protected calculateStopDuration(segment: ISegment, index: number): string {
    const arrivalTime = new Date(segment.time[0]).getTime();
    const departureTime = index > 0 ? new Date(this.data.schedule.segments[index - 1].time[1]).getTime() : arrivalTime;

    const dwellTime = (arrivalTime - departureTime) / (1000 * 60);

    return `${dwellTime} min`;
  }
}
