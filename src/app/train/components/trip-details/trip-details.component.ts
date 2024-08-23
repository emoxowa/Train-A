import { CommonModule, Location } from '@angular/common';
import { Component, inject, INJECTOR } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@app/train/models/route.model';
import { TrainService, TripDetails } from '@app/train/services/train.service';
import { TuiButton, TuiDialogService } from '@taiga-ui/core';
import { TuiAppBar } from '@taiga-ui/layout';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { map, Observable } from 'rxjs';
import { TuiSegmented } from '@taiga-ui/kit';
import { RouteModalComponent } from '../route-modal/route-modal.component';
import { RouteModalData } from '../search-results/search-results.component';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, TuiAppBar, TuiSegmented, TuiButton],
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent {
  protected trip$: Observable<TripDetails | undefined>;

  private readonly dialogs = inject(TuiDialogService);

  private readonly injector = inject(INJECTOR);

  private readonly location = inject(Location);

  constructor(
    private route: ActivatedRoute,
    private trainService: TrainService
  ) {
    this.trip$ = this.route.params.pipe(
      map((params) => {
        const rideId = parseInt(params['id'], 10);
        return this.trainService.getTripById(rideId);
      })
    );
  }

  protected showDialog(route: Route, event: Event): void {
    event.stopPropagation();

    this.trip$.subscribe((trip) => {
      if (trip) {
        this.dialogs
          .open(new PolymorpheusComponent(RouteModalComponent, this.injector), {
            size: 'm',
            closeable: true,
            dismissible: true,
            data: {
              route,
              fromStation: trip.from,
              toStation: trip.to,
            } as RouteModalData,
          })
          .subscribe();
      }
    });
  }

  protected goBack(): void {
    this.location.back();
  }
}
