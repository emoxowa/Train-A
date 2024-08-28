import { CommonModule, Location } from '@angular/common';
import { Component, inject, INJECTOR } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { IRoute } from '@app/train/models/route.model';
// import { TrainService, TripDetails } from '@app/train/services/train.service';
import { TuiButton, TuiDialogService } from '@taiga-ui/core';
import { TuiAppBar } from '@taiga-ui/layout';
// import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
// import { map, Observable } from 'rxjs';
import { TuiSegmented } from '@taiga-ui/kit';
// import { RouteModalComponent } from '../../components/route-modal/route-modal.component';
// import { RouteModalData } from '../../components/search-results/search-results.component';

@Component({
  selector: 'app-trip-details-page',
  standalone: true,
  imports: [CommonModule, TuiAppBar, TuiSegmented, TuiButton],
  templateUrl: './trip-details-page.component.html',
  styleUrls: ['./trip-details-page.component.scss'],
})
export class TripDetailsPageComponent {
  // protected trip$: Observable<TripDetails | undefined>;

  private readonly dialogs = inject(TuiDialogService);

  private readonly injector = inject(INJECTOR);

  private readonly location = inject(Location);

  // protected showDialog(route: IRoute, event: Event): void {
  //   event.stopPropagation();

  //   this.trip$.subscribe((trip) => {
  //     if (trip) {
  //       this.dialogs
  //         .open(new PolymorpheusComponent(RouteModalComponent, this.injector), {
  //           size: 'm',
  //           closeable: true,
  //           dismissible: true,
  //           data: {
  //             route,
  //             from: trip.from,
  //             to: trip.to,
  //           } as RouteModalData,
  //         })
  //         .subscribe();
  //     }
  //   });
  // }

  protected goBack(): void {
    this.location.back();
  }
}
