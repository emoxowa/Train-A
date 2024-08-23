import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Segment } from '@app/train/models/segment.model';
import { TuiButton, TuiDialog, TuiDialogContext, TuiScrollbar } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { RouteModalData } from '../search-results/search-results.component';

@Component({
  selector: 'app-route-modal',
  standalone: true,
  imports: [CommonModule, TuiDialog, TuiButton, TuiScrollbar],
  templateUrl: './route-modal.component.html',
  styleUrl: './route-modal.component.scss',
})
export class RouteModalComponent {
  private readonly context = inject<TuiDialogContext<void, RouteModalData>>(POLYMORPHEUS_CONTEXT);

  protected get data(): RouteModalData {
    return this.context.data;
  }

  calculateStopDuration(segment: Segment): string {
    const departureTime = new Date(segment.time[1]).getTime();
    const arrivalTime = new Date(segment.time[0]).getTime();
    const dwellTime = (departureTime - arrivalTime) / (1000 * 60);

    return `${dwellTime} min`;
  }
}
