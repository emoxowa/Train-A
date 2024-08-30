import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UserEffectService } from '@core/store/user-store/effects/user-effect.service';
import { appReducer } from '@core/store/app.reducer';
import { initialAppState } from '@core/store/app-state';
import { StationEffectService } from '@core/store/admin-store/effects/station-effect.service';
import { authInterceptor } from '@app/auth/services/auth.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    NG_EVENT_PLUGINS,
    provideStore(appReducer, { initialState: initialAppState }),
    provideEffects([StationEffectService, UserEffectService]),
  ],
};
