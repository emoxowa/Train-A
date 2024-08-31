import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { selectOrders } from '@core/store/order-store/selectors/order.selectors';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '@app/train/services/order.service';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AsyncPipe, NgForOf, DatePipe, JsonPipe, CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly http = inject(HttpClient);

  protected readonly orderService = inject(OrderService);

  protected readonly orders$ = this.store.select(selectOrders);

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

  protected createOrder() {
    this.http
      .post('/api/order', {
        rideId: 1,
        seat: 6,
        stationStart: 83,
        stationEnd: 40,
      })
      .subscribe((orderId) => console.log(orderId));
  }
}
