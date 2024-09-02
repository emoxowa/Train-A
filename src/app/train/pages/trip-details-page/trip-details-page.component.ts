import { CommonModule, Location } from '@angular/common';
import { Component, inject, INJECTOR, OnInit } from '@angular/core';
import { IRoute } from '@app/train/models/route.model';
import { TuiButton, TuiDialogService } from '@taiga-ui/core';
import { TuiAppBar } from '@taiga-ui/layout';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { combineLatest, map, Observable, take } from 'rxjs';
import { TuiSegmented } from '@taiga-ui/kit';
import { TrainService } from '@app/train/services/train.service';
import { ActivatedRoute } from '@angular/router';
import { IRideInformation } from '@app/train/models/ride-information.model';
import { Store } from '@ngrx/store';
import { selectStationIdAndCity } from '@app/core/store/admin-store/selectors/stations.selectors';
import { UniqueCarriagesPipe } from '@app/train/pipes/unique-carriages.pipe';
import { LegendComponent } from '@app/train/components/legend/legend.component';
import { RouteModalComponent } from '../../components/route-modal/route-modal.component';
import { RouteModalData } from '../../components/search-results/search-results.component';

@Component({
  selector: 'app-trip-details-page',
  standalone: true,
  imports: [CommonModule, TuiAppBar, TuiSegmented, TuiButton, UniqueCarriagesPipe, LegendComponent],
  templateUrl: './trip-details-page.component.html',
  styleUrls: ['./trip-details-page.component.scss'],
})
export class TripDetailsPageComponent implements OnInit {
  private readonly dialogs = inject(TuiDialogService);

  private readonly injector = inject(INJECTOR);

  private readonly location = inject(Location);

  private readonly trainService = inject(TrainService);

  private readonly route = inject(ActivatedRoute);

  private store = inject(Store);

  protected rideInformation$!: Observable<IRideInformation>;

  protected routeDetails$!: Observable<IRoute | null>;

  public stationArr$ = this.store.select(selectStationIdAndCity);

  public selectedCarriage: string | null = null;

  ngOnInit(): void {
    const rideId = Number(this.route.snapshot.paramMap.get('id'));

    if (rideId) {
      this.rideInformation$ = this.trainService.getRideInformation(rideId);
      this.routeDetails$ = this.trainService.routeDetails$;

      this.routeDetails$.pipe(take(1)).subscribe((routeDetails) => {
        if (routeDetails && routeDetails.carriages.length > 0) {
          const [firstCarriage] = routeDetails.carriages.sort();
          this.selectedCarriage = firstCarriage;
        }
      });
    }
  }

  protected showDialog(event: Event): void {
    event.stopPropagation();

    combineLatest([this.rideInformation$, this.routeDetails$]).subscribe(([rideInfo, routeDetails]) => {
      if (rideInfo && routeDetails) {
        this.dialogs
          .open(new PolymorpheusComponent(RouteModalComponent, this.injector), {
            size: 'm',
            closeable: true,
            dismissible: true,
            data: {
              schedule: rideInfo.schedule,
              from: routeDetails.path[0],
              to: routeDetails.path.at(-1),
              path: rideInfo.path,
            } as RouteModalData,
          })
          .subscribe();
      }
    });
  }

  protected getCityName(stationId: number): Observable<string | undefined> {
    return this.stationArr$.pipe(map((stations) => stations.find((station) => station.id === stationId)?.city));
  }

  protected goBack(): void {
    this.location.back();
  }

  onCarriageSelected(carriage: string): void {
    this.selectedCarriage = carriage;
  }
}
