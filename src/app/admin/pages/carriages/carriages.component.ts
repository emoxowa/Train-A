import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CarriageActions } from '@app/core/store/admin-store/actions/carriage.actions';
import { selectCarriagesArr } from '@app/core/store/admin-store/selectors/carriage.selectors';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { CarriageComponent } from '@app/shared/components/carriage/carriage.component';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { CarriagesDynamicFormComponent } from './components/carriages-dynamic-form-upd/carriages-dynamic-form-upd.component';
import { CarriagesDynamicFromCreateComponent } from './components/carriages-dynamic-from-create/carriages-dynamic-from-create.component';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [
    TuiButton,
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    CarriagesDynamicFormComponent,
    CarriagesDynamicFromCreateComponent,
    CarriageComponent,
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent {
  private store = inject(Store);

  public carriagesList$ = this.store.select(selectCarriagesArr);

  isCreateFieldOpen: boolean = false;

  currentCarriageToUpdate: string | undefined;

  constructor() {
    this.store.dispatch(CarriageActions.loadCarriagesList());
  }

  toggleCreateField() {
    this.isCreateFieldOpen = !this.isCreateFieldOpen;
  }

  toggleUpdForm(carriage: ICarriage) {
    this.currentCarriageToUpdate = carriage.code;
  }

  clearCurrentCarriage() {
    this.currentCarriageToUpdate = undefined;
  }

  closeCreateField() {
    this.isCreateFieldOpen = false;
  }
}
