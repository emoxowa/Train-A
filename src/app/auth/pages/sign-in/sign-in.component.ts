import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomErrorComponent } from '@app/auth/components/custom-error/custom-error.component';
import { AuthService } from '@app/auth/services/auth.service';
import { EmailValidators } from '@app/auth/validators/emailValidators';
import { PasswordValidators } from '@app/auth/validators/passwordValidators';
import { TuiButton } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, TuiButton, CommonModule, RouterLink, CustomErrorComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnDestroy {
  public loginForm!: FormGroup;

  public submitFirstClicked = false;

  public isSubmitting = false;

  public subscriber$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@admin.com', [Validators.required, EmailValidators()]],
      password: ['my-password', [Validators.required, PasswordValidators()]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;

    if (!this.submitFirstClicked) {
      this.submitFirstClicked = true;
    }

    const { email, password } = this.loginForm.value;

    this.authService
      .signIn(email, password)
      .pipe(takeUntil(this.subscriber$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error.status === 400) {
            this.isSubmitting = false;
            this.loginForm.setErrors({ invalidEmailPassword: true });
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.subscriber$.next();
    this.subscriber$.complete();
  }
}
