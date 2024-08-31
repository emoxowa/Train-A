import { TuiRoot } from '@taiga-ui/core';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from '@app/train/pages/home-page/home-page.component';
import { UserActions } from '@core/store/user-store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, HomePageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly authService = inject(AuthService);

  ngOnInit() {
    if (this.authService.getToken()) this.store.dispatch(UserActions.loadUser());
  }
}
