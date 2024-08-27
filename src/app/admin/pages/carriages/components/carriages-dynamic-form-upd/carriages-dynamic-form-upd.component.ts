import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { AdminService } from '@app/admin/service/admin.service';
import { CarriageActions } from '@app/core/store/admin-store/actions/carriage.actions';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-carriages-dynamic-form',
  standalone: true,
  imports: [TuiButton, ReactiveFormsModule, TuiInputModule],
  template: `
    <form class="carriages__edit-form" [formGroup]="editCarriagesForm" (ngSubmit)="updStation()">
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
      <button size="s" tuiButton>Update carriage</button>
    </form>
  `,
  styleUrl: './carriages-dynamic-form-upd.component.scss',
})
export class CarriagesDynamicFormComponent implements OnInit {
  @Input() carriagesData!: ICarriagesType;

  private formBuilder = inject(FormBuilder);

  private store = inject(Store);

  public editCarriagesForm: FormGroup = this.formBuilder.group({
    name: [''],
    rows: [''],
    leftSeats: [''],
    rightSeats: [''],
  });

  ngOnInit(): void {
    if (this.carriagesData) {
      this.editCarriagesForm.patchValue(this.carriagesData);

      this.editCarriagesForm.valueChanges.subscribe((value) => {
        if (this.carriagesData?.code) {
          this.store.dispatch(
            CarriageActions.updCarriageType({
              code: this.carriagesData.code,
              updatedCarriage: value as ICarriagesType,
            })
          );
        }
      });
    }
  }

  updStation() {
    const updCarriage: ICarriagesType = {
      name: this.editCarriagesForm.get('name')?.value,
      rows: this.editCarriagesForm.get('rows')?.value,
      leftSeats: this.editCarriagesForm.get('leftSeats')?.value,
      rightSeats: this.editCarriagesForm.get('rightSeats')?.value,
    };

    if (this.carriagesData.code) {
      this.store.dispatch(
        CarriageActions.updCarriageTypeSuccsess({ code: this.carriagesData.code, updatedCarriage: updCarriage })
      );
    }
  }
}
