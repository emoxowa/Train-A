import { CommonModule } from '@angular/common';
import { Component, inject, INJECTOR } from '@angular/core';
import { searchResponse } from '@app/train/models/search-response.model';
import { TuiButton, TuiDialogService, TuiIcon } from '@taiga-ui/core';
import { FormatDurationPipe } from '@app/train/pipes/format-duration.pipe';
import { Route } from '@app/train/models/route.model';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { StationData } from '@app/train/models/station-data.model';
import { RouteModalComponent } from '@app/train/components/route-modal/route-modal.component';
import { NoRidesAvailableComponent } from '../no-rides-available/no-rides-available.component';

export interface RouteModalData {
  route: Route;
  fromStation: StationData;
  toStation: StationData;
}
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, TuiButton, TuiIcon, NoRidesAvailableComponent, FormatDurationPipe, RouteModalComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  private readonly dialogs = inject(TuiDialogService);

  private readonly injector = inject(INJECTOR);

  searchResponse = searchResponse;

  protected showDialog(route: Route): void {
    this.dialogs
      .open(new PolymorpheusComponent(RouteModalComponent, this.injector), {
        size: 'm',
        closeable: true,
        dismissible: true,
        data: {
          route,
          fromStation: this.searchResponse.from,
          toStation: this.searchResponse.to,
        } as RouteModalData,
      })
      .subscribe();
  }
}
