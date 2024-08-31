import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { IRoutes } from '@app/admin/models/routes.model';
import { IStation } from '@app/admin/models/station-list.model';
import { RoutesActions } from '@app/core/store/admin-store/actions/routes.action';
import { Store } from '@ngrx/store';
import { TuiButton, TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-create-route-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiSelectModule,
    TuiDataListWrapper,
    TuiDataList,
    TuiButton,
    CommonModule,
  ],
  templateUrl: './create-route-from.component.html',
  styleUrl: './create-route-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRouteFormComponent {
  @Output() formClosed = new EventEmitter<void>();

  @Input({ required: true }) stationData: Pick<IStation, 'id' | 'city'>[] | undefined;

  @Input({ required: true }) carriagesData: Pick<ICarriagesType, 'code' | 'name'>[] | undefined;

  private store = inject(Store);

  private formBuilder = inject(FormBuilder);

  public createRouteForm: FormGroup = this.formBuilder.group({
    stations: this.formBuilder.array([new FormControl<string | null>(null)]),
    carriages: this.formBuilder.array([new FormControl<string | null>(null)]),
  });

  get stations(): FormArray {
    return this.createRouteForm.get('stations') as FormArray;
  }

  get carriages(): FormArray {
    return this.createRouteForm.get('carriages') as FormArray;
  }

  get processedStationData(): string[] | null {
    return this.stationData ? this.stationData.map((station) => station.city) : null;
  }

  get processedCarriagesData(): string[] | null {
    return this.carriagesData ? this.carriagesData.map((carriage) => carriage.name) : null;
  }

  public onSelectChangeStation(index: number): void {
    if (index === this.stations.length - 1) {
      this.stations.push(new FormControl<string | null>(null));
    }
  }

  public onSelectChangeCarriages(index: number): void {
    if (index === this.carriages.length - 1) {
      this.carriages.push(new FormControl<string | null>(null));
    }
  }

  public createRoute() {
    const stations = this.mutateStations(
      Array.from(new Set(this.createRouteForm.get('stations')?.value.slice(0, -1) as string[]))
    );
    const carriages = this.mutateCarriages(
      this.createRouteForm.get('carriages')?.value.filter((carriage: string) => carriage !== null)
    );

    if (stations.length <= 1) {
      // eslint-disable-next-line no-alert
      alert('add at least two stations');
      return;
    }

    if (carriages.length === 0) {
      // eslint-disable-next-line no-alert
      alert('add at least one carriages');
      return;
    }

    const newRoute: IRoutes = {
      path: stations,
      carriages,
    };

    this.store.dispatch(RoutesActions.addNewRoute({ newRoute }));
    this.resetForm();
  }

  private mutateStations(stationsArr: string[]): number[] {
    const keys: number[] = [];
    if (this.stationData) {
      // eslint-disable-next-line no-restricted-syntax
      for (const station of this.stationData) {
        if (stationsArr.includes(station.city)) keys.push(station.id);
      }
    }
    return keys;
  }

  private mutateCarriages(carriagesArr: string[]): string[] {
    const keys: string[] = [];

    if (this.carriagesData) {
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < carriagesArr.length; i += 1) {
        const name = carriagesArr[i];
        // eslint-disable-next-line no-restricted-syntax
        for (let j = 0; j < this.carriagesData.length; j += 1) {
          const carriage = this.carriagesData[j];
          if (carriage.code && carriage.name === name) {
            keys.push(carriage.code);
          }
        }
      }
    }

    return keys;
  }

  public closeForm() {
    this.formClosed.emit();
  }

  private resetForm() {
    this.stations.clear();
    this.carriages.clear();
    this.stations.push(new FormControl<string | null>(null));
    this.carriages.push(new FormControl<string | null>(null));
  }
}
