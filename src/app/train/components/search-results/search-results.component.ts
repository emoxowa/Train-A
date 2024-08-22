import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { searchResponse } from '@app/train/models/search-response.model';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { FormatDurationPipe } from '@app/train/pipes/format-duration.pipe';
import { NoRidesAvailableComponent } from '../no-rides-available/no-rides-available.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, TuiButton, TuiIcon, NoRidesAvailableComponent, FormatDurationPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  searchResponse = searchResponse;

  onRouteClick(route: number[]): void {
    // eslint-disable-next-line no-console
    console.log('Route clicked:', route, this.searchResponse);
  }
}
