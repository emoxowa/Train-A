import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IRoutes } from '@app/admin/models/routes.model';
import { IStation } from '@app/admin/models/station-list.model';
import { TuiButton } from '@taiga-ui/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [CommonModule, TuiButton],
  template: `
    <div class="route-card">
      <h2>Route {{ routeData.id }}</h2>
      <div>
        <h3>Carriages:</h3>
        <div class="route-card__carriage-arr">
          @for (carriage of routeData.carriages; track $index) {
            <div>{{ carriage }}</div>
          }
        </div>
      </div>
      <h3>Citys:</h3>
      <div class="route-card__station-arr">
        @for (station of stationData | async; track $index) {
          @if (station) {
            <div>{{ station.city }}</div>
          }
        }
      </div>
      <button size="s" tuiButton>Update</button>
      <button size="s" tuiButton>Asign ride</button>
      <button size="s" tuiButton>Delete</button>
    </div>
  `,
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent {
  @Input({ required: true }) routeData!: IRoutes;

  @Input({ required: true }) stationData!: Observable<Pick<IStation, 'id' | 'city'>[]>;
}
