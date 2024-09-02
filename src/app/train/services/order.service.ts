import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrderCreateRequest, IOrderCreateResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);

  createOrder(order: IOrderCreateRequest) {
    return this.http.post<IOrderCreateResponse>('/api/order', order);
  }
}
