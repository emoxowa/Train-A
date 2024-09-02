import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { selectOrders } from '@core/store/order-store/selectors/order.selectors';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { OrderService } from '@app/train/services/order.service';
import { EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiAlertService, TuiButton, TuiDialog, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { FormatDurationPipe } from '@app/train/pipes/format-duration.pipe';
import { SortByStartTime } from '@app/train/pipes/sortByStartTime.pipe';
import { IOrderViewData } from '@app/train/models/order.model';
import { HttpClient } from '@angular/common/http';
import { selectUserRole } from '@core/store/user-store/selectors/user.selectors';
import { EUserRole } from '@app/train/models/user.model';

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

  private readonly http = inject(HttpClient);

  protected readonly orderService = inject(OrderService);

  private readonly alerts = inject(TuiAlertService);

  protected currentOrderId: number = -1;

  protected isCancelDialogOpen = false;

  protected readonly isManager$ = this.store
    .select(selectUserRole)
    .pipe(map((userRole) => userRole === EUserRole.manager));

  private readonly alertsSubscription = this.orderService.alertMessage$
    .pipe(switchMap((alert) => (alert ? this.alerts.open(alert.message, { appearance: alert.type }) : EMPTY)))
    .subscribe();

  protected readonly orders$: Observable<IOrderViewData[]> = this.store.select(selectOrders).pipe(
    switchMap((orders) =>
      this.orderService.getCarriageList().pipe(
        map((carriages) => {
          return orders.map((order) => {
            const startStationIndex = this.orderService.getStartStationIndex(order);
            const endStationIndex = this.orderService.getEndStationIndex(order);
            const carriageIndex = this.orderService.getCarriageIndex(order.seatId, order.carriages, carriages);
            const carriageType = order.carriages[carriageIndex];
            const price = this.orderService.getOrderPrice(order, carriageType);

            return {
              id: order.id,
              stationStart: order.stationStart,
              timeStart: order.schedule.segments[startStationIndex].time[0],
              stationEnd: order.stationEnd,
              timeEnd: order.schedule.segments[endStationIndex].time[1],
              carriageType,
              carriageNumber: carriageIndex + 1,
              seatNumber: order.seatId + 1,
              price,
              status: order.status,
            };
          });
        })
      )
    )
  );

  ngOnInit() {
    this.store.dispatch(OrderActions.loadOrders());

    // TODO: remove
    this.http.get('/api/route/1').subscribe((route) => console.log(route));
  }

  ngOnDestroy() {
    this.alertsSubscription.unsubscribe();
  }

  showCancelDialog(orderId: number) {
    this.currentOrderId = orderId;
    this.isCancelDialogOpen = true;
  }

  onCancelConfirm() {
    this.store.dispatch(OrderActions.cancelOrder({ orderId: this.currentOrderId as number }));
    this.isCancelDialogOpen = false;
  }

  // TODO: remove it later
  protected createOrder() {
    this.store.dispatch(
      OrderActions.createOrder({
        orderRequest: {
          rideId: 1,
          seat: 1,
          stationStart: 83,
          stationEnd: 40,
        },
      })
    );
  }
}
