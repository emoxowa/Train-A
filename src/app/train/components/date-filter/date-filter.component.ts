import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiButton } from '@taiga-ui/core';
import { TuiCarousel } from '@taiga-ui/kit';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  standalone: true,
  imports: [TuiCarousel, TuiButton, CommonModule],
})
export class DateFilterComponent {
  @Input() dates: TuiDay[] = [];

  @Input() selectedDate: TuiDay | null = null;

  @Output() dateSelected = new EventEmitter<TuiDay>();

  onDateClick(date: TuiDay): void {
    this.dateSelected.emit(date);
  }

  isDateSelected(date: TuiDay): boolean {
    return this.selectedDate ? this.selectedDate.daySame(date) : false;
  }
}
