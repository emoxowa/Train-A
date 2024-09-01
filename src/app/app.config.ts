import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { UserEffectService } from '@core/store/user-store/effects/user-effect.service';
import { appReducer } from '@core/store/app.reducer';
import { initialAppState } from '@core/store/app-state';
import { StationEffectService } from '@core/store/admin-store/effects/station-effect.service';
import { authInterceptor } from '@app/auth/services/auth.interceptor';
import { routes } from './app.routes';
import { CarriageEffectService } from './core/store/admin-store/effects/carriage-effect.service';
import { environment } from '../environments/environment';
import { RoutesEffectService } from './core/store/admin-store/effects/routes-effect.service';
import { RiderEffectService } from './core/store/admin-store/effects/rider-effect.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    NG_EVENT_PLUGINS,
    provideStore(appReducer, { initialState: initialAppState }),
    provideEffects([
      StationEffectService,
      UserEffectService,
      CarriageEffectService,
      RoutesEffectService,
      RiderEffectService,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false,
      })
    ),
  ],
};
