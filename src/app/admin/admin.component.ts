import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StationComponent } from '@app/admin/pages/stations/stations.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [StationComponent, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
