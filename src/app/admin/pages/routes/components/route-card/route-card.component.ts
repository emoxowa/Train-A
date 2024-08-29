import { Component, Input } from '@angular/core';
import { IRoutes } from '@app/admin/models/routes.model';

@Component({
  selector: 'app-route-card',
  standalone: true,
  imports: [],
  template: `
    <div>id: {{ routeData.id }}</div>
    <div>carriages: {{ routeData.carriages }}</div>
    <div>path: {{ routeData.path }}</div>
  `,
  styleUrl: './route-card.component.scss'
})
export class RouteCardComponent {
  @Input({required: true}) routeData!: IRoutes 
}
