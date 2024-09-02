import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IOrder, IOrderCreateResponse, IOrderCreateRequest } from '@app/train/models/order.model';
import { Subject } from 'rxjs';
import { IAlert } from '@app/train/models/alert.model';

// TODO: remove later
interface ICarriage {
  code?: string;
  name: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}

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
  getTime(order: IOrder, type: 'start' | 'end') {
    const stationId = type === 'start' ? order.stationStart : order.stationEnd;
    const stationIndex = order.path.findIndex((value) => value === stationId);
    const segmentIndex = type === 'start' ? stationIndex : stationIndex - 1;
    const timeIndex = type === 'start' ? 0 : 1;

    return order.schedule.segments[segmentIndex].time[timeIndex];
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
      carriagesSeats[carriage.name] = carriage.leftSeats + carriage.rightSeats;
    });

    let currentTotalSeats = 0;
    let carriageNumber: number = -1;

    for (let index = 0; index < currentRideCarriages.length; index += 1) {
      const carriageType = currentRideCarriages[index];
      currentTotalSeats += carriagesSeats[carriageType];
      if (currentTotalSeats > seatId) {
        carriageNumber = index;
        break;
      }
    }

    return carriageNumber;
  }

  // TODO: delete later
  getCarriageList() {
    return this.http.get<ICarriage[]>('/api/carriage');
  }
}
