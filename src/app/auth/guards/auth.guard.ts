import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser, selectUserLoading } from '@core/services/store/user-store/selectors/user.selectors';
import { filter, map, switchMap } from 'rxjs';
import { UserActions } from '@core/services/store/user-store/actions/user.actions';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);

  store.dispatch(UserActions.loadUser());

  return store.select(selectUserLoading).pipe(
    filter((isUserLoading) => !isUserLoading),
    switchMap(() =>
      store.select(selectUser).pipe(
        map((user) => {
          return !!user || createUrlTreeFromSnapshot(route, ['/']);
        })
      )
    )
  );
};
