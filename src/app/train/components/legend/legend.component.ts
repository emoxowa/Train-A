import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss',
})
export class LegendComponent {
  @Input() reservedSeats: number = 0;

  @Input() availableSeats: number = 0;

  @Input() selectedSeats: number = 0;
}
