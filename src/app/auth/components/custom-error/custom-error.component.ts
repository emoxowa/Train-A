import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, distinctUntilChanged, merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-error',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './custom-error.component.html',
  styleUrl: './custom-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomErrorComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private formGroupDirective = inject(FormGroupDirective);
  public message$ = new BehaviorSubject('');

  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) customErrors!: ValidationErrors;

  ngOnInit(): void {
    if (this.formGroupDirective) {
      const control = this.formGroupDirective.control.get(this.controlName);

      if (control) {
        this.subscription = merge(control.valueChanges, this.formGroupDirective.ngSubmit)
          .pipe(distinctUntilChanged())
          .subscribe(() => {
            const controlErrors = control.errors;

            if (controlErrors) {
              const firstKey = Object.keys(controlErrors)[0];
              const text = this.customErrors?.[firstKey];

              this.setError(text);
            } else {
              this.setError('');
            }
          });
      }
    }
  }

  setError(text: string): void {
    this.message$.next(text);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
