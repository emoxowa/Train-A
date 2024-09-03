import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, createUrlTreeFromSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser, selectUserLoading, selectUserRole } from '@app/core/store/user-store/selectors/user.selectors';
import { filter, map, of, switchMap } from 'rxjs';
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

  return store.select(selectUserRole).pipe(
    switchMap((role) => {
      if (role === 'manager') {
        return of(true);
      }

      return of(router.createUrlTree(['not-found']));
    })
  );
};

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);

  return store.select(selectUserLoading).pipe(
    filter((isUserLoading) => !isUserLoading),
    switchMap(() =>
      store.select(selectUser).pipe(map((user) => !!user || createUrlTreeFromSnapshot(route, ['/signin'])))
    )
  );
};
