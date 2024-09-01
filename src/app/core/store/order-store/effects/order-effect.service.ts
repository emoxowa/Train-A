import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
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

  private createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      switchMap(({ orderRequest }) =>
        this.orderService.createOrder(orderRequest).pipe(
          // TODO: implement after rides
          map((response) => {
            return OrderActions.createOrderSuccess({
              order: {
                id: response.id,
                seatId: orderRequest.seat,
                rideId: orderRequest.rideId,
                stationStart: orderRequest.stationStart,
                stationEnd: orderRequest.stationEnd,
                status: 'active',
                routeId: 1,
                userId: 1,
                path: [35, 83, 103, 84, 69, 76, 8, 90, 60, 40],
                carriages: [
                  'carriage4',
                  'carriage1',
                  'carriage3',
                  'carriage3',
                  'carriage1',
                  'carriage3',
                  'carriage2',
                  'carriage2',
                  'carriage3',
                  'carriage1',
                  'carriage3',
                  'carriage3',
                ],
                schedule: {
                  segments: [
                    {
                      time: ['2024-09-03T08:39:15.511Z', '2024-09-06T23:20:15.511Z'],
                      price: {
                        carriage4: 2122,
                        carriage1: 444,
                        carriage3: 156,
                        carriage2: 1350,
                      },
                    },
                    {
                      time: ['2024-09-06T23:25:15.511Z', '2024-09-07T21:49:15.511Z'],
                      price: {
                        carriage4: 2368,
                        carriage1: 1198,
                        carriage3: 2051,
                        carriage2: 1124,
                      },
                    },
                    {
                      time: ['2024-09-07T22:25:15.511Z', '2024-09-11T05:27:15.511Z'],
                      price: {
                        carriage4: 800,
                        carriage1: 2207,
                        carriage3: 1469,
                        carriage2: 1363,
                      },
                    },
                    {
                      time: ['2024-09-11T06:14:15.511Z', '2024-09-13T00:01:15.511Z'],
                      price: {
                        carriage4: 1762,
                        carriage1: 1696,
                        carriage3: 2307,
                        carriage2: 399,
                      },
                    },
                    {
                      time: ['2024-09-13T00:11:15.511Z', '2024-09-16T18:04:15.511Z'],
                      price: {
                        carriage4: 885,
                        carriage1: 2141,
                        carriage3: 1964,
                        carriage2: 847,
                      },
                    },
                    {
                      time: ['2024-09-16T18:51:15.511Z', '2024-09-19T21:52:15.511Z'],
                      price: {
                        carriage4: 2449,
                        carriage1: 2030,
                        carriage3: 268,
                        carriage2: 2020,
                      },
                    },
                    {
                      time: ['2024-09-19T22:01:15.511Z', '2024-09-22T09:49:15.511Z'],
                      price: {
                        carriage4: 1885,
                        carriage1: 101,
                        carriage3: 2354,
                        carriage2: 1791,
                      },
                    },
                    {
                      time: ['2024-09-22T10:15:15.511Z', '2024-09-25T16:32:15.511Z'],
                      price: {
                        carriage4: 1641,
                        carriage1: 610,
                        carriage3: 1953,
                        carriage2: 2252,
                      },
                    },
                    {
                      time: ['2024-09-25T16:40:15.511Z', '2024-09-28T19:11:15.511Z'],
                      price: {
                        carriage4: 983,
                        carriage1: 482,
                        carriage3: 661,
                        carriage2: 562,
                      },
                    },
                  ],
                },
              },
            });
          }),
          catchError(() => of(OrderActions.createOrderFailure()))
        )
      )
    )
  );

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
          map(() => OrderActions.cancelOrderSuccess({ orderId })),
          catchError(() => of(OrderActions.cancelOrderFailure()))
        )
      )
    )
  );
}
