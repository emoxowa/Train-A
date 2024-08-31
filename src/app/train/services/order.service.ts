import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IOrder } from '@app/train/models/order.model';
import { ISegment } from '@app/train/models/segment.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);

  getOrders(isManager: boolean = false) {
    let params: HttpParams | undefined;

    if (isManager) {
      params = new HttpParams().set('all', true);
    }

    return this.http.get<IOrder[]>('/api/order', { params });
  }

  // eslint-disable-next-line class-methods-use-this
  getTime(order: IOrder, type: 'start' | 'end') {
    const stationId = type === 'start' ? order.stationStart : order.stationEnd;
    const stationIndex = order.path.findIndex((value) => value === stationId);
    const segmentIndex = type === 'start' ? stationIndex : stationIndex - 1;
    const timeIndex = type === 'start' ? 0 : 1;

    return order.schedule.segments[segmentIndex].time[timeIndex];
  }

  getTripDuration(order: IOrder) {
    const time = new Date(this.getTime(order, 'end')).getTime() - new Date(this.getTime(order, 'start')).getTime();
    const hours = Math.floor(time / 1000 / 60 / 60);
    const minutes = Math.ceil((time - hours * 60 * 60 * 1000) / 1000 / 60);

    return `${hours}h ${minutes}m`;
  }
}
