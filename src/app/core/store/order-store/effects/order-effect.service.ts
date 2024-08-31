import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { OrderService } from '@app/train/services/order.service';
import { IOrder } from '@app/train/models/order.model';
import { Store } from '@ngrx/store';
import { selectUserRole } from '@core/store/user-store/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class OrderEffectService {
  private readonly actions$ = inject(Actions);

  private readonly orderService = inject(OrderService);

  private readonly store = inject(Store);

  private loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() =>
        this.store.select(selectUserRole).pipe(
          switchMap((role) =>
            this.orderService.getOrders(role === 'manager').pipe(
              map((orders: IOrder[]) =>
                OrderActions.loadOrdersSuccess({
                  orders,
                })
              )
            )
          )
        )
      )
    )
  );
}
