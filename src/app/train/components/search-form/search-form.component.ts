/* eslint-disable no-console */
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAlertService, TuiButton, TuiDataList, TuiIcon, TuiIconPipe, TuiNotification } from '@taiga-ui/core';
import { TuiInputModule, TuiInputDateModule, TuiInputTimeModule } from '@taiga-ui/legacy';
import { TUI_DEFAULT_MATCHER, TuiDay, TuiLet } from '@taiga-ui/cdk';
import { map, Observable, startWith, switchMap, take } from 'rxjs';
import { selectStationArr } from '@app/core/store/admin-store/selectors/stations.selectors';
import { Store } from '@ngrx/store';
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
    TuiNotification,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent implements OnInit {
  private store = inject(Store);

  private trainService = inject(TrainService);

  private alertService = inject(TuiAlertService);

  protected minDate = TuiDay.currentLocal();

  public stations$: Observable<IStation[]> = this.store.select(selectStationArr);

  public selectedDate: TuiDay | null = null;

  ngOnInit(): void {
    const initialDate = this.form.get('date')?.value || null;
    this.selectedDate = initialDate;
    this.trainService.setSelectedDate(this.selectedDate);
  }

  protected form = new FormGroup({
    from: new FormControl<string | null>(null, Validators.required),
    to: new FormControl<string | null>(null, Validators.required),
    date: new FormControl(this.minDate, Validators.required),
    time: new FormControl(null),
  });

  protected isDateSelected(): boolean {
    return this.form.get('date')?.valid ?? false;
  }

  protected onSearch(): void {
    if (this.form.valid) {
      this.prepareSearchRequest().subscribe((searchRequest) => {
        if (searchRequest) {
          this.trainService.searchTrips(searchRequest).subscribe({
            error: (error) => {
              if (error.error?.reason === 'stationNotFound') {
                this.showNotification(error.error.message, 'Error');
              } else {
                this.showNotification('An unexpected error occurred.', 'Error');
              }
            },
          });
        }
      });
    }
  }

  private showNotification(message: string, label: string): void {
    this.alertService.open(message, { label }).subscribe();
  }

  private prepareSearchRequest(): Observable<ISearchRoutesRequest | null> {
    return this.stations$.pipe(
      take(1),
      map((stations) => {
        const fromStationCity = this.form.get('from')!.value;
        const toStationCity = this.form.get('to')!.value;

        if (!fromStationCity || !toStationCity) {
          return null;
        }

        const fromFullStation = stations.find((i) => i.city === fromStationCity);
        const toFullStation = stations.find((i) => i.city === toStationCity);

        if (!fromFullStation || !toFullStation) {
          return null;
        }

        const date = this.form.get('date')!.value as TuiDay;
        this.trainService.setSelectedDate(date);
        const time = this.form.get('time')!.value;

        const timeInMillis = time
          ? date.append(time).toLocalNativeDate().getTime()
          : date.toLocalNativeDate().getTime();

        return {
          fromLatitude: fromFullStation.latitude,
          fromLongitude: fromFullStation.longitude,
          toLatitude: toFullStation.latitude,
          toLongitude: toFullStation.longitude,
          time: timeInMillis,
        };
      })
    );
  }

  protected swapFromTo(): void {
    const fromValue: string | null = this.form.get('from')?.value ?? null;
    const toValue: string | null = this.form.get('to')?.value ?? null;

    this.form.get('from')?.setValue(toValue);
    this.form.get('to')?.setValue(fromValue);
  }

  protected readonly itemsFrom$: Observable<string[] | null> = this.form.get('from')!.valueChanges.pipe(
    startWith(''),
    switchMap((value) => {
      return this.stations$.pipe(
        map((stations) =>
          stations.map((station) => station.city).filter((city) => TUI_DEFAULT_MATCHER(city, value as string))
        )
      );
    })
  );

  protected readonly itemsTo$: Observable<string[] | null> = this.form.get('to')!.valueChanges.pipe(
    startWith(''),
    switchMap((value) => {
      return this.stations$.pipe(
        map((stations) =>
          stations.map((station) => station.city).filter((city) => TUI_DEFAULT_MATCHER(city, value as string))
        )
      );
    })
  );

  public availableDates: TuiDay[] = SearchFormComponent.generateDates(this.minDate, 4);

  protected onDateSelected(date: TuiDay): void {
    this.selectedDate = date;
    this.form.get('date')?.setValue(date);
    this.trainService.setSelectedDate(date);
    this.onSearch();
  }

  protected addFutureDates(): void {
    const lastDate = this.availableDates[this.availableDates.length - 1];
    const newDate = lastDate.append({ day: 1 });
    this.availableDates = [...this.availableDates, newDate];
  }

  public static generateDates(startDate: TuiDay, numberOfDays: number): TuiDay[] {
    return Array.from({ length: numberOfDays }, (_, index) => startDate.append({ day: index }));
  }
}
