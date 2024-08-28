/* eslint-disable no-console */
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDataList, TuiIcon, TuiIconPipe } from '@taiga-ui/core';
import { TuiInputModule, TuiInputDateModule, TuiInputTimeModule } from '@taiga-ui/legacy';
import { TUI_DEFAULT_MATCHER, TuiDay, TuiLet } from '@taiga-ui/cdk';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { selectStationArr } from '@app/core/store/admin-store/selectors/stations.selectors';
import { Store } from '@ngrx/store';
import { StationsActions } from '@app/core/store/admin-store/actions/stations.actions';
import { IStation } from '@app/admin/models/station-list.model';
import { ISearchRoutesRequest } from '@app/train/models/search-request.model';
import { TrainService } from '@app/train/services/train.service';
import { DateFilterComponent } from '../date-filter/date-filter.component';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiButton,
    TuiIcon,
    TuiIconPipe,
    TuiInputTimeModule,
    TuiLet,
    TuiDataList,
    DateFilterComponent,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent implements OnInit {
  private store = inject(Store);

  private trainService = inject(TrainService);

  protected minDate = TuiDay.currentLocal();

  public stations$: Observable<IStation[]> = this.store.select(selectStationArr);

  public selectedDate: TuiDay | null = null;

  ngOnInit(): void {
    this.store.dispatch(StationsActions.loadStationList());
    const initialDate = this.form.get('date')?.value || null;
    this.selectedDate = initialDate;
  }

  protected form = new FormGroup({
    from: new FormControl<IStation | null>(null, Validators.required),
    to: new FormControl<IStation | null>(null, Validators.required),
    date: new FormControl(this.minDate, Validators.required),
    time: new FormControl(null),
  });

  isDateSelected(): boolean {
    return this.form.get('date')?.valid ?? false;
  }

  onSearch(): void {
    if (this.form.valid) {
      const searchRequest = this.prepareSearchRequest();

      this.trainService
        .searchTrips(
          searchRequest.fromLatitude,
          searchRequest.fromLongitude,
          searchRequest.toLatitude,
          searchRequest.toLongitude,
          searchRequest.time
        )
        .subscribe((response) => {
          console.log('Search Response:', response);
        });
    }
  }

  private prepareSearchRequest(): ISearchRoutesRequest {
    const fromStation = this.form.get('from')!.value;
    const toStation = this.form.get('to')!.value;
    const date = this.form.get('date')!.value as TuiDay;
    const time = this.form.get('time')!.value;

    const timeInMillis = time ? date.append(time).toUtcNativeDate().getTime() : date.toUtcNativeDate().getTime();

    return {
      fromLatitude: fromStation!.latitude,
      fromLongitude: fromStation!.longitude,
      toLatitude: toStation!.latitude,
      toLongitude: toStation!.longitude,
      time: timeInMillis,
    };
  }

  swapFromTo(): void {
    const fromValue: IStation | null = this.form.get('from')?.value ?? null;
    const toValue: IStation | null = this.form.get('to')?.value ?? null;

    this.form.get('from')?.setValue(toValue);
    this.form.get('to')?.setValue(fromValue);
  }

  protected readonly itemsFrom$: Observable<IStation[]> = this.form.get('from')!.valueChanges.pipe(
    startWith(''),
    switchMap((value) => {
      const searchValue = typeof value === 'string' ? value : (value?.city ?? '');
      return this.stations$.pipe(
        map((stations) => stations.filter((station) => TUI_DEFAULT_MATCHER(station.city, searchValue)))
      );
    })
  );

  protected readonly itemsTo$: Observable<IStation[]> = this.form.get('to')!.valueChanges.pipe(
    startWith(''),
    switchMap((value) => {
      const searchValue = typeof value === 'string' ? value : (value?.city ?? '');
      return this.stations$.pipe(
        map((stations) => stations.filter((station) => TUI_DEFAULT_MATCHER(station.city, searchValue)))
      );
    })
  );

  public availableDates: TuiDay[] = this.generateDates(this.minDate, 4);

  onDateSelected(date: TuiDay): void {
    this.selectedDate = date;
    this.form.get('date')?.setValue(date);

    this.onSearch();
  }

  addFutureDates(): void {
    const lastDate = this.availableDates[this.availableDates.length - 1];
    const newDate = lastDate.append({ day: 1 });
    this.availableDates = [...this.availableDates, newDate];
  }

  private generateDates(startDate: TuiDay, numberOfDays: number): TuiDay[] {
    return Array.from({ length: numberOfDays }, (_, index) => startDate.append({ day: index }));
  }
}
