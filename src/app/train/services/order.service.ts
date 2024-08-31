import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '@app/train/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);

  getOrders() {
    return this.http.get<IOrder[]>('/api/order');
  }
}
