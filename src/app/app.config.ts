import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { initialAppState } from '@core/services/store/app-state';
import { provideStore } from '@ngrx/store';
import { appReducer } from '@core/services/store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffectService } from '@core/services/store/user-store/effects/user-effect.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    NG_EVENT_PLUGINS,
    provideStore(appReducer, { initialState: initialAppState }),
    provideEffects([UserEffectService]),
  ],
};
