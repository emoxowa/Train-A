import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { IUser, IUserResponse } from '@app/auth/models/user.model';
import { ProfileService } from '@app/auth/services/profile.service';
import { UserActions } from '../actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffectService {
  private readonly actions$ = inject(Actions);

  private readonly profileService = inject(ProfileService);

  private loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.profileService.getUserInformation().pipe(
          map((user: IUserResponse) =>
            UserActions.loadUserSuccess({
              user: { information: { name: user.name, email: user.email }, role: user.role },
            })
          )
        )
      )
    )
  );

  private updateUserInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserInformation),
      switchMap(({ updates }) =>
        this.profileService
          .updateUserInformation(updates)
          .pipe(map((user: IUser) => UserActions.updateUserInformationSuccess({ userInformation: user.information })))
      )
    )
  );

  private changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updatePassword),
      switchMap(({ password }) =>
        this.profileService.updatePassword(password).pipe(map(() => UserActions.updatePasswordSuccess()))
      )
    )
  );

  private logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() => this.profileService.logout().pipe(map(() => UserActions.logoutSuccess())))
    )
  );
}
