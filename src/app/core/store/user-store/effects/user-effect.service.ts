import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { IUser, IUserResponse } from '@app/auth/models/user.model';
import { ProfileService } from '@app/auth/services/profile.service';
import { AuthService } from '@app/auth/services/auth.service';
import { UserActions } from '../actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffectService {
  private readonly actions$ = inject(Actions);

  private readonly profileService = inject(ProfileService);

  private readonly authService = inject(AuthService);

  private loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.profileService.getUserInformation().pipe(
          map((response: IUserResponse) =>
            UserActions.loadUserSuccess({
              user: { information: { name: response.name, email: response.email }, role: response.role },
            })
          ),
          catchError(() => of(UserActions.loadUserFailure()))
        )
      )
    )
  );

  private updateUserInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserInformation),
      switchMap(({ updates }) =>
        this.profileService.updateUserInformation(updates).pipe(
          map((user: IUser) => UserActions.updateUserInformationSuccess({ userInformation: user.information })),
          catchError(() => of(UserActions.updateUserInformationFailure()))
        )
      )
    )
  );

  private changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updatePassword),
      switchMap(({ password }) =>
        this.profileService.updatePassword(password).pipe(
          map(() => UserActions.updatePasswordSuccess()),
          catchError(() => of(UserActions.updatePasswordFailure()))
        )
      )
    )
  );

  private logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => UserActions.logoutSuccess()),
          catchError(() => of(UserActions.logoutFailure()))
        )
      )
    )
  );
}
