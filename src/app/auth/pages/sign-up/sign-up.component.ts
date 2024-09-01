import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomErrorComponent } from '@app/auth/components/custom-error/custom-error.component';
import { AuthService } from '@app/auth/services/auth.service';
import { EmailValidators } from '@app/auth/validators/emailValidators';
import { PasswordValidators } from '@app/auth/validators/passwordValidators';
import { TuiButton } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, TuiButton, NgIf, CustomErrorComponent, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnDestroy {
  public registerForm!: FormGroup;

  public submitFirstClicked = false;

  public isSubmitting = false;

  public subscriber$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, EmailValidators()]],
        password: ['', [Validators.required, PasswordValidators()]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: this.repeatPasswordMatch.bind(this) }
    );
  }

  // eslint-disable-next-line class-methods-use-this
  repeatPasswordMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;

    if (repeatPassword) {
      return password === repeatPassword ? null : { validRepeatPassword: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;

    if (!this.submitFirstClicked) {
      this.submitFirstClicked = true;
    }

    const { email, password } = this.registerForm.value;

    this.authService
      .signUp(email, password)
      .pipe(takeUntil(this.subscriber$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          if (error.status === 400 && error.error.reason === 'invalidUniqueKey') {
            this.isSubmitting = false;
            this.registerForm.get('email')?.setErrors({ invalidUniqueKey: true });
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.subscriber$.next();
    this.subscriber$.complete();
  }
}
