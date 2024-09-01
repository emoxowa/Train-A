import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { CarriageActions } from '@app/core/store/admin-store/actions/carriage.actions';
import { selectCarriagesArr } from '@app/core/store/admin-store/selectors/carriage.selectors';
import { CarriageComponent } from '@app/shared/components/carriage/carriage.component';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-carriages-dynamic-from-create',
  standalone: true,
  imports: [TuiButton, ReactiveFormsModule, TuiInputModule, CarriageComponent],
  template: `
    <div>
      <app-carriage [carriagesData]="carriagesData"></app-carriage>
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
    </div>
  `,
  styleUrl: './carriages-dynamic-from-create.component.scss',
})
export class CarriagesDynamicFromCreateComponent {
  @Output() formClosed = new EventEmitter<void>();

  private formBuilder = inject(FormBuilder);

  private store = inject(Store);

  public createCarriagesForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    rows: ['', Validators.required],
    leftSeats: ['', Validators.required],
    rightSeats: ['', Validators.required],
  });

  private carriagesList: ICarriage[] = [];

  get carriagesData(): ICarriage {
    return {
      code: this.createCarriagesForm.get('name')?.value,
      name: this.createCarriagesForm.get('name')?.value,
      rows: this.createCarriagesForm.get('rows')?.value,
      leftSeats: this.createCarriagesForm.get('leftSeats')?.value,
      rightSeats: this.createCarriagesForm.get('rightSeats')?.value,
    };
  }

  ngOnInit() {
    this.store.select(selectCarriagesArr).subscribe((carriages) => {
      this.carriagesList = carriages;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createStation() {
    if (this.createCarriagesForm.invalid) {
      // eslint-disable-next-line no-alert
      alert('Please fill in all fields before updating.');
      return;
    }

    const createNewCarriage: ICarriage = this.carriagesData;

    const isInStorage = this.carriagesList.some(
      (carriage) => carriage.name === createNewCarriage.name
    );

    if (isInStorage) {
      alert('Carriage with this name already exists.');
      return;
    }


    this.store.dispatch(CarriageActions.createNewCarriageType({ newCarriages: createNewCarriage }));
    this.closeForm();
  }

  closeForm() {
    this.formClosed.emit();
  }
}
