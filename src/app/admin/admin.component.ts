import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StationComponent } from './pages/stations/stations.component';
import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [StationComponent, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
