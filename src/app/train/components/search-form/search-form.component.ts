/* eslint-disable no-console */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDataList, TuiIcon, TuiIconPipe } from '@taiga-ui/core';
import { TuiInputModule, TuiInputDateModule, TuiInputTimeModule } from '@taiga-ui/legacy';
import { TUI_DEFAULT_MATCHER, TuiDay, TuiLet } from '@taiga-ui/cdk';
import { map, Observable, of, startWith, switchMap } from 'rxjs';

const CITIES = [
  { name: 'Moscow', latitude: 55.7558, longitude: 37.6176 },
  { name: 'New York', latitude: 40.7128, longitude: -74.006 },
  { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
];

function request(query: string): Observable<readonly { name: string; latitude: number; longitude: number }[]> {
  return of(CITIES.filter((item) => TUI_DEFAULT_MATCHER(item.name, query)));
}

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
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  protected minDate = TuiDay.currentLocal();

  protected form = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    date: new FormControl(this.minDate, Validators.required),
    time: new FormControl(null),
  });

  isDateSelected(): boolean {
    return this.form.get('date')?.valid ?? false;
  }

  onSearch(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  swapFromTo(): void {
    const fromValue: string | null = this.form.get('from')?.value ?? null;
    const toValue: string | null = this.form.get('to')?.value ?? null;

    this.form.get('from')?.setValue(toValue);
    this.form.get('to')?.setValue(fromValue);
  }

  protected readonly itemsFrom$ = this.form.get('from')!.valueChanges.pipe(
    startWith(''),
    switchMap((value) =>
      request(value ?? '').pipe(
        map((response) => {
          if (response.length === 1 && String(response[0].name) === value) {
            this.form.get('from')!.setValue(response[0].name);
            return [];
          }
          return response;
        })
      )
    ),
    startWith(CITIES)
  );

  protected readonly itemsTo$ = this.form.get('to')!.valueChanges.pipe(
    startWith(''),
    switchMap((value) =>
      request(value ?? '').pipe(
        map((response) => {
          if (response.length === 1 && String(response[0].name) === value) {
            this.form.get('to')!.setValue(response[0].name);
            return [];
          }
          return response;
        })
      )
    ),
    startWith(CITIES)
  );
}
