import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { IPriceInfo, IScheduleInfo } from '@app/admin/models/route-info.module';
import { IStation } from '@app/admin/models/station-list.model';
import { RiderAction } from '@app/core/store/admin-store/actions/riders.actions';
import { selectCarriagesIdAndName } from '@app/core/store/admin-store/selectors/carriage.selectors';
import { selectRiderInfo } from '@app/core/store/admin-store/selectors/rider.selector';
import { selectStationIdAndCity } from '@app/core/store/admin-store/selectors/stations.selectors';
import { Store } from '@ngrx/store';
import { TuiAlertService, TuiButton } from '@taiga-ui/core';
import { map, Observable, Subscription, fromEvent, switchMap, take, EMPTY } from 'rxjs';
import { OrderService } from '@app/train/services/order.service';
import { RideCardComponent } from '../components/ride-card/ride-card.component';

@Component({
  selector: 'app-ride',
  standalone: true,
  imports: [TuiButton, RouterLink, RouterLinkActive, CommonModule, RideCardComponent],
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss'],
})
export class RideComponent implements OnInit, OnInit, AfterViewInit, OnDestroy {
  private readonly defaultCarriagePrice = 1000;

  @ViewChild('addRideButton', { static: true }) addRideButton: ElementRef | undefined;

  private route: ActivatedRoute = inject(ActivatedRoute);

  private readonly orderService = inject(OrderService);

  private readonly alerts = inject(TuiAlertService);

  private readonly alertsSubscription = this.orderService.alertMessage$
    .pipe(switchMap((alert) => (alert ? this.alerts.open(alert.message, { appearance: alert.type }) : EMPTY)))
    .subscribe();

  private store = inject(Store);

  private addRideButtonSubscription: Subscription | undefined;

  public routeId: number = Number(this.route.snapshot.params['id']);

  public stationArr$ = this.store.select(selectStationIdAndCity);

  public carriagesArr$ = this.store.select(selectCarriagesIdAndName);

  public riderInfo$ = this.store.select(selectRiderInfo);

  private readonly defaultRideSchedule$: Observable<IScheduleInfo> = this.riderInfo$.pipe(
    map((rideInfo) => {
      let currentDate = new Date().getTime();
      const pathLength = rideInfo.path.length;
      const uniqueCarriages = Array.from(new Set(rideInfo.carriages));
      const price: IPriceInfo = {};
      const oneHour = 1000 * 60 * 60 * 2;

      uniqueCarriages.forEach((carriage) => {
        price[carriage] = this.defaultCarriagePrice;
      });

      return {
        segments: new Array(pathLength - 1).fill(null).map(() => {
          currentDate += 2 * oneHour;
          const time1 = new Date(currentDate).toISOString();
          const time2 = new Date(currentDate + oneHour).toISOString();
          return { time: [time1, time2], price };
        }),
      };
    })
  );

  ngOnInit(): void {
    this.store.dispatch(RiderAction.loadRiderList({ idRoute: this.routeId }));
  }

  ngAfterViewInit() {
    this.createAddRideSubscription();
  }

  ngOnDestroy(): void {
    this.addRideButtonSubscription?.unsubscribe();
    this.alertsSubscription.unsubscribe();
  }

  createAddRideSubscription() {
    if (!this.addRideButton) return;

    this.addRideButtonSubscription = fromEvent(this.addRideButton.nativeElement, 'click')
      .pipe(
        switchMap(() =>
          this.defaultRideSchedule$.pipe(
            take(1),
            map((scheduleItem) => this.store.dispatch(RiderAction.createRide({ routeId: this.routeId, scheduleItem })))
          )
        )
      )
      .subscribe();
  }

  getCitiesByIds(cityIds: number[]): Observable<Pick<IStation, 'id' | 'city'>[]> {
    return this.stationArr$.pipe(map((stations) => stations.filter((station) => cityIds.includes(station.id))));
  }

  getCarriagesByCode(carriagesCode: string[]): Observable<Pick<ICarriage, 'code' | 'name'>[]> {
    return this.carriagesArr$.pipe(
      map((carriages) =>
        // eslint-disable-next-line array-callback-return
        carriages.filter((carriage) => {
          if (carriage.code) {
            carriagesCode.includes(carriage.code);
          }
        })
      )
    );
  }
}
