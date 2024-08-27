import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomErrorComponent } from '@app/auth/components/custom-error/custom-error.component';
import { EmailValidators } from '@app/auth/validators/emailValidators';
import { PasswordValidators } from '@app/auth/validators/passwordValidators';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, TuiButton, FormsModule, NgIf, CustomErrorComponent, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  public registerForm!: FormGroup;
  public submitFirstClicked = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
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

    if (!this.submitFirstClicked) {
      this.submitFirstClicked = true;
    }

    const { email, password } = this.registerForm.value;

    this.http.post('/api/signup', { email, password }).subscribe({
      next: (response) => {
        return this.router.navigate(['/signin']);
      },
      error: (error) => {
        if (error.status === 400 && error.error.reason === 'invalidUniqueKey') {
          this.registerForm.get('email')?.setErrors({ invalidUniqueKey: true });
        }
      },
    });
  }
}
