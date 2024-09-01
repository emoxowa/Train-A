import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IRoutes } from '@app/admin/models/routes.model';
import { IStation } from '@app/admin/models/station-list.model';
import { RoutesActions } from '@app/core/store/admin-store/actions/routes.action';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { AdminService } from '@app/admin/service/admin.service';
import { IScheduleInfo } from '@app/admin/models/route-info.module';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { UpdRouteFormComponent } from '../upd-route-form/upd-route-form.component';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [CommonModule, TuiButton, UpdRouteFormComponent, RouterLink, RouterLinkActive, RouterModule],
  template: `
    <div class="route-card">
      <h2>Route {{ routeData.id }}</h2>
      <div>
        <h3>Carriages:</h3>
        <div class="route-card__carriage-arr">
          @for (carriage of routeData.carriages; track $index) {
            <div>- {{ carriage }} -</div>
          }
        </div>
      </div>
      <h3>Citys:</h3>
      <div class="route-card__station-arr">
        @for (station of stationData | async; track $index) {
          @if (station) {
            <div>- {{ station.city }} -</div>
          }
        }
      </div>
      @if (isRoutesUpdFormOpen) {
        <app-upd-route-form
          [routeData]="routeData"
          [stationDataAllUpd]="stationDataAll"
          [carriagesDataAllUpd]="carriagesDataAll"
          (formClosed)="closeRoutesCreateForm()"
        ></app-upd-route-form>
        <button size="s" (click)="closeRoutesCreateForm()" tuiButton>Close update</button>
      } @else {
        <button size="s" (click)="openRoutesUpdForm()" tuiButton>Update</button>
      }
      @if (routeData.id) {
        <button
          routerLinkActive="active"
          ariaCurrentWhenActive="page"
          [routerLink]="['/admin/routes', routeData.id]"
          size="s"
          tuiButton
        >
          Asign ride
        </button>
      }
      <button size="s" tuiButton (click)="deleteRoute()">Delete</button>
    </div>
  `,
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent {
  @Input({ required: true }) routeData!: IRoutes;

  @Input({ required: true }) stationData!: Observable<Pick<IStation, 'id' | 'city'>[]>;

  @Input({ required: true }) stationDataAll: Pick<IStation, 'id' | 'city'>[] | undefined;

  @Input({ required: true }) carriagesDataAll: Pick<ICarriage, 'code' | 'name'>[] | undefined;

  private adminService = inject(AdminService);

  private store = inject(Store);

  private router = inject(Router);

  public isRoutesUpdFormOpen: boolean = false;

  public deleteRoute() {
    if (this.routeData.id) {
      this.store.dispatch(RoutesActions.deleteRoute({ pickRoute: this.routeData.id }));
    }
  }

  public openRoutesUpdForm() {
    this.isRoutesUpdFormOpen = true;
  }

  public closeRoutesCreateForm() {
    this.isRoutesUpdFormOpen = false;
  }

  public showRouteInfo() {
    // get
    if (this.routeData.id) {
      this.adminService.getRouteInformation(this.routeData.id).subscribe({
        next(value) {
          // eslint-disable-next-line no-console
          console.log('show route info', value);
        },
      });
    }
  }

  postRouteInfo() {
    // post
    const mockScheduleInfo: IScheduleInfo = {
      segments: [
        {
          time: ['2024-08-08T22:19:57.708Z', '2024-08-12T03:29:57.708Z'],
          price: {
            carriage1: 210,
            carriage2: 300,
            carriage3: 250,
            carriage4: 250,
            carriage5: 250,
            carriage6: 250,
          },
        },
      ],
    };

    if (this.routeData.id) {
      this.adminService.createNewRide(this.routeData.id, mockScheduleInfo).subscribe({
        next(value) {
          // eslint-disable-next-line no-console
          console.log('create new ride', value);
        },
      });
    }
  }

  updRouteInfo() {
    const mockScheduleInfo: IScheduleInfo = {
      segments: [
        {
          time: ['2024-08-08T22:19:57.708Z', '2024-08-12T03:29:57.708Z'],
          price: {
            carriage1: 210,
            carriage2: 300,
            carriage3: 250,
            carriage4: 250,
            carriage5: 250,
            carriage6: 300,
          },
        },
      ],
    };

    if (this.routeData.id) {
      this.adminService.updateRide(this.routeData.id, 1898, mockScheduleInfo).subscribe({
        next(value) {
          // eslint-disable-next-line no-console
          console.log('upd ride', value);
        },
      });
    }
  }

  deleteRide() {
    if (this.routeData.id) {
      this.adminService.deleteRide(this.routeData.id, 1898).subscribe({
        next(value) {
          // eslint-disable-next-line no-console
          console.log('delete route info', value);
        },
      });
    }
  }
}
