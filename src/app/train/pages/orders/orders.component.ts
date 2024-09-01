import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { selectOrders } from '@core/store/order-store/selectors/order.selectors';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { OrderService } from '@app/train/services/order.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AsyncPipe, NgForOf, DatePipe, JsonPipe, CurrencyPipe, NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private readonly store = inject(Store);

  protected readonly orderService = inject(OrderService);

  protected readonly orders$ = this.store.select(selectOrders).pipe(
    switchMap((orders) =>
      this.orderService.getCarriageList().pipe(
        map((carriages) => {
          return orders.map((order) => {
            const startStationIndex = this.orderService.getStartStationIndex(order);
            const endStationIndex = this.orderService.getEndStationIndex(order);
            const duration = this.orderService.getTripDuration(order);
            const carriageIndex = this.orderService.getCarriageIndex(order.seatId, order.carriages, carriages);
            const carriageType = order.carriages[carriageIndex];
            const price = this.orderService.getOrderPrice(order, carriageType);

            return {
              id: order.id,
              stationStart: order.stationStart,
              timeStart: order.schedule.segments[startStationIndex].time[0],
              stationEnd: order.stationEnd,
              timeEnd: order.schedule.segments[endStationIndex].time[1],
              duration,
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
  }

  onCancel(orderId: number) {
    this.store.dispatch(OrderActions.cancelOrder({ orderId }));
  }

  // TODO: remove it later
  protected createOrder() {
    this.store.dispatch(
      OrderActions.createOrder({
        orderRequest: {
          rideId: 1,
          seat: 21,
          stationStart: 83,
          stationEnd: 40,
        },
      })
    );
  }
}
