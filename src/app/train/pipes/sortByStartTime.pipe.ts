import { Pipe, PipeTransform } from '@angular/core';
import { IOrderViewData } from '@app/train/models/order.model';

@Pipe({
  name: 'sortByStartTime',
  standalone: true,
})
export class SortByStartTime implements PipeTransform {
  transform(value: IOrderViewData[]): IOrderViewData[] {
    return value.sort((orderA: IOrderViewData, orderB: IOrderViewData) =>
      this.compare(orderA.timeStart, orderB.timeStart)
    );
  }

  private compare(a: string, b: string) {
    return new Date(a).getTime() - new Date(b).getTime();
  }
}
