import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { selectOrders } from '@core/store/order-store/selectors/order.selectors';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '@app/train/services/order.service';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AsyncPipe, NgForOf, DatePipe, JsonPipe, CurrencyPipe, NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly http = inject(HttpClient);

  protected readonly orderService = inject(OrderService);

  protected readonly orders$ = this.store.select(selectOrders);

  // TODO: implement after carriages
  protected readonly carriagesNumbers$: Observable<number[]> = this.orders$.pipe(
    switchMap((orders) =>
      this.orderService
        .getCarriageList()
        .pipe(map((carriages) => this.orderService.getCarriagesNumbers(orders, carriages)))
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
          seatId: 6,
          stationStart: 83,
          stationEnd: 40,
        },
      })
    );
  }
}
