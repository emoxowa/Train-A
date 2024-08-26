import { inject, Injectable } from '@angular/core';
import { AdminService } from '@app/admin/service/admin.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { CarriageActions } from '../actions/carriage.actions';

@Injectable({
  providedIn: 'root',
})
export class CarriageEffectService {
  private actions$ = inject(Actions);

  private adminService = inject(AdminService);

  private store = inject(Store);

  loadCarriages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarriageActions.loadCarriagesList),
      switchMap(() =>
        this.adminService
          .getCarriageList()
          .pipe(
            map((carriages: ICarriagesType[]) => CarriageActions.loadCarriagesListSuccsess({ carriageList: carriages }))
          )
      )
    )
  );
}
