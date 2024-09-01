import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-ride',
  standalone: true,
  imports: [TuiButton, RouterLink, RouterLinkActive],
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss'],
})
export class RideComponent {}
