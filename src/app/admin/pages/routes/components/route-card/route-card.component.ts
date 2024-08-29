import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IRoutes } from '@app/admin/models/routes.model';
import { IStation } from '@app/admin/models/station-list.model';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [CommonModule],
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
        @for (stationId of routeData.path; track $index) {
          @let station = getCityById(stationId);
          @if (station) {
            <div>{{ station.city }} -</div>
          }
        }
      </div>
    </div>
  `,
  styleUrl: './route-card.component.scss',
})
export class RouteCardComponent {
  @Input({ required: true }) routeData!: IRoutes;

  @Input({ required: true }) stationData!: IStation[];

  getCityById(cityId: number): IStation | undefined {
    return this.stationData.find((station) => station.id === cityId);
  }
}
