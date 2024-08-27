import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-carriages-dynamic-from-create',
  standalone: true,
  imports: [TuiButton, ReactiveFormsModule, TuiInputModule],
  template: `
    <div>
      <p>Name: {{ createCarriagesForm.get('name')?.value }}</p>
      <p>Rows: {{ createCarriagesForm.get('rows')?.value }}</p>
      <p>Left Seats: {{ createCarriagesForm.get('leftSeats')?.value }}</p>
      <p>Right Seats: {{ createCarriagesForm.get('rightSeats')?.value }}</p>
    </div>
    <form class="carriages__edit-form" [formGroup]="createCarriagesForm" (ngSubmit)="createStation()">
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
      <button size="s" tuiButton>Create carriage</button>
    </form>
  `,
  styleUrl: './carriages-dynamic-from-create.component.scss',
})
export class CarriagesDynamicFromCreateComponent {
  private formBuilder = inject(FormBuilder);

  private store = inject(Store);

  public createCarriagesForm: FormGroup = this.formBuilder.group({
    name: [''],
    rows: [''],
    leftSeats: [''],
    rightSeats: [''],
  });

  // eslint-disable-next-line class-methods-use-this
  createStation() {
    // const createCarriage: ICarriagesType = {
    //   name: this.createCarriagesForm.get('name')?.value,
    //   rows: this.createCarriagesForm.get('rows')?.value,
    //   leftSeats: this.createCarriagesForm.get('leftSeats')?.value,
    //   rightSeats: this.createCarriagesForm.get('rightSeats')?.value,
    // };
  }
}
