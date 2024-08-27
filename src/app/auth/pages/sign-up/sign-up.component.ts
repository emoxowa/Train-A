import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, TuiButton, NgIf, CustomErrorComponent, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  public registerForm!: FormGroup;
  public submitFirstClicked = false;
  public isSubmitting = false;
  public subscriber!: Subscription;

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

    this.subscriber = this.authService.signUp(email, password).subscribe({
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
    this.subscriber.unsubscribe();
  }
}
