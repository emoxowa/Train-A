import { Component, inject, Input, OnChanges } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { TuiButton, TuiGroup, TuiIcon, TuiTitle, TuiTextfield } from '@taiga-ui/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '@core/store/user-store/actions/user.actions';

@Component({
  selector: 'app-profile-field',
  standalone: true,
  imports: [AsyncPipe, TuiButton, TuiTitle, NgIf, TuiIcon, TuiGroup, ReactiveFormsModule, TuiTextfield],
  templateUrl: './profile-field.component.html',
  styleUrl: './profile-field.component.scss',
})
export class ProfileFieldComponent implements OnChanges {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly store = inject(Store);

  @Input({ required: true }) public type!: 'name' | 'email';

  @Input({ required: true }) public value!: string;

  protected readonly fieldForm = this.formBuilder.group({
    value: ['', Validators.required],
  });

  protected isEdit: boolean = false;

  ngOnChanges() {
    this.fieldForm.patchValue({ value: this.value });
  }

  protected onEdit(): void {
    this.isEdit = true;
  }

  protected onSave(): void {
    const formValue = this.fieldForm.get('value')?.value;
    if (!formValue) return;

    this.store.dispatch(
      UserActions.updateUserInformation({
        updates: { [this.type]: formValue },
      })
    );
    this.isEdit = false;
  }
}
