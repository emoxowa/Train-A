import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ICreateAdmin } from '@app/admin/models/create-admin';
import { AdminService } from '@app/admin/service/admin.service';
import { RoutesActions } from '@app/core/store/admin-store/actions/routes.action';
import { selectRoutesArr } from '@app/core/store/admin-store/selectors/routes.selector';
import { Store } from '@ngrx/store';
import { TuiButton } from '@taiga-ui/core';
import { tap } from 'rxjs';
import { selectStationArr } from '@app/core/store/admin-store/selectors/stations.selectors';
import { StationsActions } from '@app/core/store/admin-store/actions/stations.actions';
import { IStation } from '@app/admin/models/station-list.model';
import { RouteCardComponent } from './components/route-card/route-card.component';
import { CreateRouteFormComponent } from './components/create-route-form/create-route-form.component';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [TuiButton, CommonModule, RouteCardComponent, CreateRouteFormComponent],
  template: `
    @if (isRoutesCreateFormOpen) {
      <app-create-route-form (formClosed)="closeRoutesCreateForm()"></app-create-route-form>
    } @else {
      <button size="s" tuiButton (click)="openRoutesCreateForm()">Create</button>
    }
    @let routes = routesList$ | async;
    @for (route of routes; track route.id) {
      <app-route-card [routeData]="route" [stationData]="localStationArr"></app-route-card>
    }
  `,
  styleUrl: './routes.component.scss',
})
export class RoutesComponent implements OnInit {
  private adminService = inject(AdminService);

  private store = inject(Store);

  routesList$ = this.store.select(selectRoutesArr);

  stationArr$ = this.store.select(selectStationArr);

  localStationArr: IStation[] = [];

  isRoutesCreateFormOpen: boolean = false;

  // for developing
  readonly newAdmin: ICreateAdmin = {
    email: 'admin@admin.com',
    password: 'my-password',
  };

  constructor() {
    this.adminService
      .loginAdmin(this.newAdmin)
      .pipe(
        tap((response) => {
          this.adminService.token$.next(response.token);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(StationsActions.loadStationList());
    this.store.dispatch(RoutesActions.loadRoutesList());

    this.stationArr$.subscribe({
      next: (stations) => {
        this.localStationArr = stations;
      },
    });
  }

  openRoutesCreateForm() {
    this.isRoutesCreateFormOpen = true;
  }

  closeRoutesCreateForm() {
    this.isRoutesCreateFormOpen = false;
  }
}
