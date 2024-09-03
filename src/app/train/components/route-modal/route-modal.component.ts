import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TuiButton, TuiDialog, TuiDialogContext, TuiScrollbar } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { CityNamePipe } from '@app/train/pipes/city-name.pipe';
import { StopDurationPipe } from '@app/train/pipes/stop-duration.pipe';
import { SegmentArrivalTimePipe } from '@app/train/pipes/segment-arrival-time.pipe';
import { RouteModalData } from '../search-results/search-results.component';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [CommonModule, TuiDialog, TuiButton, TuiScrollbar, CityNamePipe, StopDurationPipe, SegmentArrivalTimePipe],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss',
})
export class RouteModalComponent {
  private readonly context = inject<TuiDialogContext<void, RouteModalData>>(POLYMORPHEUS_CONTEXT);

  protected get data(): RouteModalData {
    return this.context.data;
  }

  protected getSegmentArrivalTime(index: number): string {
    if (index > 0) {
      return this.data.schedule.segments[index - 1].time[1];
    }
    return '';
  }
}
