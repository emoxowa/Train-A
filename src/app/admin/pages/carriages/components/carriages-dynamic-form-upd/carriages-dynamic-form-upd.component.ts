import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { AdminService } from '@app/admin/service/admin.service';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-carriages-dynamic-form',
  standalone: true,
  imports: [TuiButton, ReactiveFormsModule, TuiInputModule],
  template: `
    <form class="carriages__edit-form" [formGroup]="editCarriagesForm">
      <tui-input placeholder="enter new name" formControlName="name">
        name
        <input tuiTextfieldLegacy placeholder="enter new name" type="text" />
      </tui-input>
      <tui-input formControlName="rows">
        rows
        <input tuiTextfieldLegacy placeholder="enter new rows" type="number" />
      </tui-input>
      <tui-input formControlName="leftSeats">
        left seats
        <input tuiTextfieldLegacy placeholder="enter new left seats" type="number" />
      </tui-input>
      <tui-input formControlName="rightSeats">
        right seats
        <input tuiTextfieldLegacy placeholder="enter new right seats" type="number" />
      </tui-input>
      <button size="l" tuiButton>Add station</button>
    </form>
  `,
  styleUrl: './carriages-dynamic-form-upd.component.scss',
})
export class CarriagesDynamicFormComponent {
  @Input() carriagesData!: ICarriagesType;

  private formBuilder = inject(FormBuilder);

  private adminService = inject(AdminService);

  private store = inject(Store);

  public editCarriagesForm: FormGroup = this.formBuilder.group({
    name: [''],
    rows: [''],
    leftSeats: [''],
    rightSeats: [''],
  });

  constructor() {
    this.setKeysToForm();

    // this.editCarriagesForm.valueChanges.subscribe(value => {
    //   console.log('Форма изменена:', value);
    // });
  }

  setKeysToForm() {
    this.editCarriagesForm.patchValue(this.carriagesData);
  }
  // public onFieldChange(fieldName: keyof ICarriagesType, event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   const value = input.value;

  //   this.editCarriagesForm.patchValue({
  //     [fieldName]: value
  //   });

  //   if (this.carriagesData?.code) {
  //     this.store.dispatch(CarriageActions.updCarriageType({
  //       code: this.carriagesData.code,
  //       updatedCarriage: this.editCarriagesForm.value as ICarriagesType
  //     }));
  //   }
  // }
}
