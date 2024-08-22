import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiBlockStatus } from '@taiga-ui/layout';

@Component({
  selector: 'app-no-rides-available',
  standalone: true,
  imports: [CommonModule, TuiBlockStatus],
  templateUrl: './no-rides-available.component.html',
  styleUrl: './no-rides-available.component.scss',
})
export class NoRidesAvailableComponent {}
