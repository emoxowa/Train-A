import { Component } from '@angular/core';
import { NoRidesAvailableComponent } from '@app/train/components/no-rides-available/no-rides-available.component';
import { SearchFormComponent } from '@app/train/components/search-form/search-form.component';
import { SearchResultsComponent } from '@app/train/components/search-results/search-results.component';
import { TuiButton } from '@taiga-ui/core';
import { TuiInputModule, TuiInputDateModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    TuiButton,
    TuiInputModule,
    TuiInputDateModule,
    SearchFormComponent,
    SearchResultsComponent,
    SearchFormComponent,
    NoRidesAvailableComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
