import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IRoutes } from '@app/admin/models/routes.model';
import { IStation } from '@app/admin/models/station-list.model';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>id: {{ routeData.id }}</div>
    <div>carriages: {{ routeData.carriages }}</div>
    <div>
      @for (stationId of routeData.path; track $index) {
        @let station = getCityById(stationId);
        @if (station) {
          <span>{{ station.city }} - </span>
        }
      }
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
