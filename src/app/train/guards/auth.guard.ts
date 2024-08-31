import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser, selectUserLoading } from '@core/store/user-store/selectors/user.selectors';
import { filter, map, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);

  return store.select(selectUserLoading).pipe(
    filter((isUserLoading) => !isUserLoading),
    switchMap(() =>
      store.select(selectUser).pipe(map((user) => !!user || createUrlTreeFromSnapshot(route, ['/signin'])))
    )
  );
};
