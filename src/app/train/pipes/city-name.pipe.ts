import { Pipe, PipeTransform } from '@angular/core';
import { selectStationIdAndCity } from '@app/core/store/admin-store/selectors/stations.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '@app/core/store/app-state';

@Pipe({
  name: 'cityName',
  standalone: true,
})
export class CityNamePipe implements PipeTransform {
  constructor(private store: Store<AppState>) {}

  transform(stationId: number): Observable<string | undefined> {
    return this.store
      .select(selectStationIdAndCity)
      .pipe(map((stations) => stations.find((station) => station.id === stationId)?.city));
  }
}
