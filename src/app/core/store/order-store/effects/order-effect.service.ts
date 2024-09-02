import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { OrderActions } from '@core/store/order-store/actions/order.actions';
import { OrderService } from '@app/train/services/order.service';
import { IOrder } from '@app/train/models/order.model';
import { Store } from '@ngrx/store';
import { selectUserRole } from '@core/store/user-store/selectors/user.selectors';
import { EUserRole } from '@app/train/models/user.model';

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
            this.orderService.getOrders(role === EUserRole.manager).pipe(
              map((orders: IOrder[]) =>
                OrderActions.loadOrdersSuccess({
                  orders,
                })
              ),
              catchError(() => of(OrderActions.loadOrdersFailure()))
            )
          )
        )
      )
    )
  );

  private cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.cancelOrder),
      switchMap(({ orderId }) =>
        this.orderService.cancelActiveOrder(orderId).pipe(
          map(() => {
            this.orderService.alertMessage$.next({ message: 'Order canceled', type: 'success' });
            return OrderActions.cancelOrderSuccess({ orderId });
          }),
          catchError((error) => {
            this.orderService.alertMessage$.next({
              message: `Failed to cancel the order. Error: ${error.error.message}`,
              type: 'error',
            });
            return of(OrderActions.cancelOrderFailure());
          })
        )
      )
    )
  );
}
