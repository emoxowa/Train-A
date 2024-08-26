import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ICreateAdmin } from '@app/admin/models/create-admin';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { AdminService } from '@app/admin/service/admin.service';
import { CarriageActions } from '@app/core/store/admin-store/actions/carriage.actions';
import { selectCarriagesArr } from '@app/core/store/admin-store/selectors/carriage.selectors';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [TuiButton, CommonModule],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent {
  private adminService = inject(AdminService);

  private store = inject(Store);

  public carriagesList$ = this.store.select(selectCarriagesArr);

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
  }

  createNewCarriagesType() {
    const newCarriagesType: Omit<ICarriagesType, 'code'> = {
      name: 'test2',
      rows: 20,
      leftSeats: 2,
      rightSeats: 3,
    };

    this.adminService.createNewCarriageType(newCarriagesType).subscribe({
      next: () => {
        // console.log('response create', response);
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }

  getCarriagesTypes() {
    this.adminService.getCarriageList().subscribe({
      next: () => {
        // console.log('carriages', data);
      },
    });
  }
}
