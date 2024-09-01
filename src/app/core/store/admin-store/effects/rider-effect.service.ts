import { inject, Injectable } from '@angular/core';
import { AdminService } from '@app/admin/service/admin.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { IRideInfo } from '@app/admin/models/route-info.module';
import { RiderAction } from '../actions/riders.actions';

@Injectable({
  providedIn: 'root',
})
export class RiderEffectService {
  private action$ = inject(Actions);

  private adminService = inject(AdminService);

  loadRiders$ = createEffect(() =>
    this.action$.pipe(
      ofType(RiderAction.loadRiderList),
      switchMap((action) =>
        this.adminService
          .getRouteInformation(action.idRoute)
          .pipe(map((riders: IRideInfo[]) => RiderAction.loadRiderListSuccsess({ riderList: riders })))
      )
    )
  );
}
