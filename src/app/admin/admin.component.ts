import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarriageComponent } from '@app/shared/components/carriage/carriage.component';
import { StationComponent } from './pages/stations/stations.component';
import { RoutesComponent } from './pages/routes/routes.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RoutesComponent, StationComponent, CarriageComponent, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
