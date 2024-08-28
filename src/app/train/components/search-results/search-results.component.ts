import { CommonModule } from '@angular/common';
import { Component, inject, INJECTOR } from '@angular/core';
import { IStationResponse, ISearchRoutesResponse } from '@app/train/models/search-response.model';
import { TuiButton, TuiDialogService, TuiIcon, TuiLoader } from '@taiga-ui/core';
import { FormatDurationPipe } from '@app/train/pipes/format-duration.pipe';
import { IRoute } from '@app/train/models/route.model';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { RouteModalComponent } from '@app/train/components/route-modal/route-modal.component';
import { Router } from '@angular/router';
import { TrainService } from '@app/train/services/train.service';
import { map, Observable } from 'rxjs';
import { NoRidesAvailableComponent } from '../no-rides-available/no-rides-available.component';

export interface RouteModalData {
  route: IRoute;
  from: IStationResponse;
  to: IStationResponse;
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    TuiButton,
    TuiIcon,
    NoRidesAvailableComponent,
    FormatDurationPipe,
    RouteModalComponent,
    TuiLoader,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  private readonly trainService = inject(TrainService);

  private readonly injector = inject(INJECTOR);

  searchResponse$: Observable<ISearchRoutesResponse | null> = this.trainService.searchResponse$;

  loading$: Observable<boolean> = this.trainService.loading$;

  constructor(
    private router: Router,
    private dialogs: TuiDialogService
  ) {}

  protected showDialog(route: IRoute, event: Event): void {
    event.stopPropagation();

    this.searchResponse$
      .pipe(
        map((searchResponse) => {
          if (!searchResponse) {
            return;
          }

          this.dialogs
            .open(new PolymorpheusComponent(RouteModalComponent, this.injector), {
              size: 'm',
              closeable: true,
              dismissible: true,
              data: {
                route,
                from: searchResponse.from,
                to: searchResponse.to,
              } as RouteModalData,
            })
            .subscribe();
        })
      )
      .subscribe();
  }

  protected onCardClick(route: IRoute): void {
    this.searchResponse$
      .pipe(
        map((searchResponse) => {
          if (!searchResponse) {
            return;
          }

          const fromStationId = searchResponse.from.stationId;
          const toStationId = searchResponse.to.stationId;

          this.router.navigate(['/trip', route.schedule[0].rideId], {
            queryParams: {
              from: fromStationId,
              to: toStationId,
            },
          });
        })
      )
      .subscribe();
  }
}
