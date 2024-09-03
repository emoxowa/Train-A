import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IOrder, IOrderCreateResponse, IOrderCreateRequest } from '@app/train/models/order.model';
import { Subject } from 'rxjs';
import { IAlert } from '@app/train/models/alert.model';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);

  public readonly alertMessage$ = new Subject<IAlert>();

  getOrders(isManager: boolean = false) {
    let params: HttpParams | undefined;

    if (isManager) {
      params = new HttpParams().set('all', true);
    }

    return this.http.get<IOrder[]>('/api/order', { params });
  }

  createOrder(order: IOrderCreateRequest) {
    return this.http.post<IOrderCreateResponse>('/api/order', order);
  }

  cancelActiveOrder(orderId: number) {
    return this.http.delete<object>(`/api/order/${orderId}`);
  }

  // eslint-disable-next-line class-methods-use-this
  getStartStationIndex(order: IOrder) {
    return order.path.findIndex((value) => value === order.stationStart);
  }

  // eslint-disable-next-line class-methods-use-this
  getEndStationIndex(order: IOrder) {
    return order.path.findIndex((value) => value === order.stationEnd) - 1;
  }

  getOrderPrice(order: IOrder, carriageType: string) {
    return order.schedule.segments
      .slice(this.getStartStationIndex(order), this.getEndStationIndex(order) + 1)
      .reduce((acc, value) => acc + value.price[carriageType], 0);
  }

  // eslint-disable-next-line class-methods-use-this
  getCarriageIndex(seatId: number, currentRideCarriages: string[], carriages: ICarriage[]) {
    const carriagesSeats: Record<string, number> = {};
    carriages.forEach((carriage) => {
      carriagesSeats[carriage.name] = (carriage.leftSeats + carriage.rightSeats) * carriage.rows;
    });

    let currentTotalSeats = 0;
    let carriageNumber: number = -1;
    let seatNumber = seatId;

    for (let index = 0; index < currentRideCarriages.length; index += 1) {
      const carriageType = currentRideCarriages[index];
      currentTotalSeats += carriagesSeats[carriageType];
      if (currentTotalSeats >= seatId) {
        carriageNumber = index;
        break;
      }
      seatNumber -= carriagesSeats[carriageType];
    }

    return [carriageNumber, seatNumber];
  }
}
