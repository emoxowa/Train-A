import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICreateAdmin } from '@app/admin/models/create-admin';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { AdminService } from '@app/admin/service/admin.service';
import { CarriageActions } from '@app/core/store/admin-store/actions/carriage.actions';
import { selectCarriagesArr } from '@app/core/store/admin-store/selectors/carriage.selectors';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { tap } from 'rxjs';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [TuiButton, CommonModule, ReactiveFormsModule, TuiInputModule],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent {
  private adminService = inject(AdminService);

  private store = inject(Store);

  public carriagesList$ = this.store.select(selectCarriagesArr);

  private formBuilder = inject(FormBuilder);

  public editCarriagesForm: FormGroup = this.formBuilder.group({
    name: '',
    rows: '',
    leftSeats: '',
    rightSeats: '',
  });

  // for developing
  readonly newAdmin: ICreateAdmin = {
    email: 'admin@admin.com',
    password: 'my-password',
  };

  constructor() {
    this.store.dispatch(CarriageActions.loadCarriagesList());
    // for developing
    this.adminService
      .loginAdmin(this.newAdmin)
      .pipe(
        tap((response) => {
          this.adminService.token$.next(response.token);
        })
      )
      .subscribe();

    this.editCarriagesForm.valueChanges.subscribe((formValues) => {
      this.onFieldChange(formValues);
    });
  }

  createNewCarriagesType() {
    const newCarriagesType: Omit<ICarriagesType, 'code'> = {
      name: 'boba',
      rows: 20,
      leftSeats: 2,
      rightSeats: 3,
    };

    this.store.dispatch(CarriageActions.createNewCarriageType({ newCarriages: newCarriagesType }));
  }

  getCarriagesTypes() {
    this.adminService.getCarriageList().subscribe({
      next: () => {
        // console.log('carriages', data);
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public onFieldChange(formValues: ICarriagesType): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newFieldCangeValue = formValues;
    // console.log('Dynamic form values', formValues);
  }
}
