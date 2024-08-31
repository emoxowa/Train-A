import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { selectUserRole } from '@app/core/store/user-store/selectors/user.selectors';
import { TuiIcon, TuiLink } from '@taiga-ui/core';
import { TuiAvatar, TuiTabs } from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TuiHeader, TuiIcon, TuiAvatar, TuiTabs, TuiLink, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);

  protected readonly store = inject(Store);

  authService = inject(AuthService);

  protected userRole$ = this.store.select(selectUserRole);
}
