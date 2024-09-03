import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '@app/core/store/user-store/actions/user.actions';
import { selectUserRole } from '@app/core/store/user-store/selectors/user.selectors';
import { of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const canActiveAuth = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();

  if (isAuth) {
    return router.createUrlTree(['/']);
  }

  return true;
};

export const canActiveAdmin = () => {
  const router = inject(Router);
  const store = inject(Store);

  store.dispatch(UserActions.loadUser());

  return store.select(selectUserRole).pipe(
    switchMap((role) => {
      if (role === 'manager') {
        return of(true);
      }

      return of(router.createUrlTree(['not-found']));
    })
  );
};
