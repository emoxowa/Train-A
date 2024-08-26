import { Component, inject } from '@angular/core';
import { ICreateAdmin } from '@app/admin/models/create-admin';
import { INewCarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { AdminService } from '@app/admin/service/admin.service';
import { TuiButton } from '@taiga-ui/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [TuiButton],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent {
  private adminService = inject(AdminService);

  // for developing
  readonly newAdmin: ICreateAdmin = {
    email: 'admin@admin.com',
    password: 'my-password',
  };

  constructor() {
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
    const newCarriagesType: INewCarriagesType = {
      name: 'test',
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
