import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { selectOrders } from '@core/store/order-store/selectors/order.selectors';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { OrderService } from '@app/train/services/order.service';
import { EMPTY, map, Observable, switchMap, filter, skip, tap } from 'rxjs';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiAlertService, TuiButton, TuiDialog, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { FormatDurationPipe } from '@app/train/pipes/format-duration.pipe';
import { SortByStartTime } from '@app/train/pipes/sortByStartTime.pipe';
import { IOrderViewData } from '@app/train/models/order.model';
import { selectUserRole } from '@core/store/user-store/selectors/user.selectors';
import { EUserRole } from '@app/train/models/user.model';
import { ProfileService } from '@app/train/services/profile.service';
import { AdminService } from '@app/admin/service/admin.service';
import { selectCarriagesArr } from '@core/store/admin-store/selectors/carriage.selectors';
import { selectStationArr } from '@core/store/admin-store/selectors/stations.selectors';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    DatePipe,
    JsonPipe,
    CurrencyPipe,
    NgIf,
    TuiCardLarge,
    TuiSurface,
    TuiButton,
    TuiTitle,
    FormatDurationPipe,
    SortByStartTime,
    TuiDialog,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);

  protected readonly orderService = inject(OrderService);

  private readonly profileService = inject(ProfileService);

  protected readonly adminService = inject(AdminService);

  private readonly alerts = inject(TuiAlertService);

  protected currentOrderId: number = -1;

  protected currentUserId: number | undefined;

  protected isCancelDialogOpen = false;

  protected readonly currentUserName$ = this.profileService
    .getUsers()
    .pipe(map((users) => users.find((user) => user.id === (this.currentUserId || 1))?.name));

  protected readonly isManager$ = this.store
    .select(selectUserRole)
    .pipe(map((userRole) => userRole === EUserRole.manager));

  private readonly alertsSubscription = this.orderService.alertMessage$
    .pipe(switchMap((alert) => (alert ? this.alerts.open(alert.message, { appearance: alert.type }) : EMPTY)))
    .subscribe();

  protected readonly orders$: Observable<IOrderViewData[]> = this.store.select(selectOrders).pipe(
    skip(1),
    filter((orders) => orders.length > 0),
    switchMap((orders) =>
      this.store.select(selectCarriagesArr).pipe(
        switchMap((carriages) =>
          this.store.select(selectStationArr).pipe(
            map((stations) => {
              return orders.map((order) => {
                const startStationIndex = this.orderService.getStartStationIndex(order);
                const endStationIndex = this.orderService.getEndStationIndex(order);
                const carriageAndSeatNumbers = this.orderService.getCarriageIndex(
                  order.seatId,
                  order.carriages,
                  carriages
                );
                const carriageType = order.carriages[carriageAndSeatNumbers[0]];
                const price = this.orderService.getOrderPrice(order, carriageType);

                return {
                  id: order.id,
                  stationStart: stations.find((station) => order.stationStart === station.id)?.city || '',
                  timeStart: order.schedule.segments[startStationIndex].time[0],
                  stationEnd: stations.find((station) => order.stationEnd === station.id)?.city || '',
                  timeEnd: order.schedule.segments[endStationIndex].time[1],
                  carriageType,
                  carriageNumber: carriageAndSeatNumbers[0] + 1,
                  seatNumber: carriageAndSeatNumbers[1],
                  price,
                  status: order.status,
                  userId: order.userId,
                };
              });
            })
          )
        )
      )
    )
  );

  ngOnInit() {
    this.store.dispatch(OrderActions.loadOrders());
  }

  ngOnDestroy() {
    this.alertsSubscription.unsubscribe();
  }

  showCancelDialog(orderId: number, userId: number | undefined) {
    this.currentOrderId = orderId;
    this.currentUserId = userId;
    this.isCancelDialogOpen = true;
  }

  onCancelConfirm() {
    this.store.dispatch(OrderActions.cancelOrder({ orderId: this.currentOrderId }));
    this.isCancelDialogOpen = false;
  }
}
