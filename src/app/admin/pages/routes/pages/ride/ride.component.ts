import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ICreateAdmin } from '@app/admin/models/create-admin';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { IScheduleInfo } from '@app/admin/models/route-info.module';
import { IStation } from '@app/admin/models/station-list.model';
import { AdminService } from '@app/admin/service/admin.service';
import { RiderAction } from '@app/core/store/admin-store/actions/riders.actions';
import { selectCarriagesIdAndName } from '@app/core/store/admin-store/selectors/carriage.selectors';
import { selectRiderInfo } from '@app/core/store/admin-store/selectors/rider.selector';
import { selectStationIdAndCity } from '@app/core/store/admin-store/selectors/stations.selectors';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { map, Observable, tap } from 'rxjs';
import { RideCardComponent } from '../components/ride-card/ride-card.component';

@Component({
  selector: 'app-ride',
  standalone: true,
  imports: [TuiButton, RouterLink, RouterLinkActive, CommonModule, RideCardComponent],
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss'],
})
export class RideComponent implements OnInit {
  private adminService = inject(AdminService);

  private route: ActivatedRoute = inject(ActivatedRoute);

  private store = inject(Store);

  public routeId: number = Number(this.route.snapshot.params['id']);

  public stationArr$ = this.store.select(selectStationIdAndCity);

  public carriagesArr$ = this.store.select(selectCarriagesIdAndName);

  public riderInfo$ = this.store.select(selectRiderInfo);

  // for developing
  readonly newAdmin: ICreateAdmin = {
    email: 'admin@admin.com',
    password: 'my-password',
  };

  ngOnInit(): void {
    this.adminService
      .loginAdmin(this.newAdmin)
      .pipe(
        tap((response) => {
          this.adminService.token$.next(response.token);
        })
      )
      .subscribe();

    this.store.dispatch(RiderAction.loadRiderList({ idRoute: this.routeId }));
  }

  // getRideInfo() {
  //   this.adminService
  //     .getRouteInformation(2)
  //     .pipe(tap((data) => console.log('Reqest ride', data)))
  //     .subscribe();
  // }

  postRouteInfo() {
    // post
    const mockScheduleInfo: IScheduleInfo = {
      segments: [
        {
          time: ['2024-08-08T22:19:57.708Z', '2024-08-12T03:29:57.708Z'],
          price: {
            carriage1:1500
          },
        },
        // {
        //   time: ['2024-08-12T03:29:57.708Z', '2024-08-15T08:39:57.708Z'],
        //   price: {
        //     вагон:2000
        //   },
        // },
        // {
        //   time: ['2024-08-15T08:39:57.708Z', '2024-08-18T13:49:57.708Z'],
        //   price: {
        //     вагон:3000
        //   },
        // },
      ],
    };

    this.adminService.createNewRide(533, mockScheduleInfo).subscribe({
      next(value) {
        // eslint-disable-next-line no-console
        console.log('create new ride', value);
      },
    });
  }

  getCitiesByIds(cityIds: number[]): Observable<Pick<IStation, 'id' | 'city'>[]> {
    return this.stationArr$.pipe(map((stations) => stations.filter((station) => cityIds.includes(station.id))));
  }

  getCarriagesByCode(carriagesCode: string[]): Observable<Pick<ICarriage, 'code' | 'name'>[]> {
    return this.carriagesArr$.pipe(
      map((carriages) =>
        // eslint-disable-next-line array-callback-return
        carriages.filter((carriage) => {
          if (carriage.code) {
            carriagesCode.includes(carriage.code);
          }
        })
      )
    );
  }
}
