import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { selectOrders } from '@core/store/order-store/selectors/order.selectors';
import { AsyncPipe, DatePipe, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '@app/train/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AsyncPipe, NgForOf, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly http = inject(HttpClient);

  protected readonly orderService = inject(OrderService);

  protected readonly orders$ = this.store.select(selectOrders);

  ngOnInit() {
    this.store.dispatch(OrderActions.loadOrders());
  }

  protected createOrder() {
    this.http
      .post('/api/order', {
        rideId: 2,
        seat: 2,
        stationStart: 90,
        stationEnd: 40,
      })
      .subscribe((orderId) => console.log(orderId));
  }
}
