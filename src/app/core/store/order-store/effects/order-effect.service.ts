import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { OrderService } from '@app/train/services/order.service';
import { IOrder } from '@app/train/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderEffectService {
  private readonly actions$ = inject(Actions);

  private readonly orderService = inject(OrderService);

  private loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() =>
        this.orderService.getOrders().pipe(
          map((response: IOrder[]) =>
            OrderActions.loadOrdersSuccess({
              orders: response,
            })
          ),
          catchError(() => of(OrderActions.loadOrdersFailure()))
        )
      )
    )
  );
}
