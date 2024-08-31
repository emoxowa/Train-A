import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { IRoutes } from '@app/admin/models/routes.model';
import { IStation } from '@app/admin/models/station-list.model';
import { TuiButton, TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-upd-route-form',
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
  templateUrl: './upd-route-form.component.html',
  styleUrl: './upd-route-form.component.scss',
})
export class UpdRouteFormComponent implements OnInit {
  @Input({ required: true }) routeData!: IRoutes;

  @Input({ required: true }) stationDataAllUpd: Pick<IStation, 'id' | 'city'>[] | undefined;

  @Input({ required: true }) carriagesDataAllUpd: Pick<ICarriagesType, 'code' | 'name'>[] | undefined;

  @Output() formClosed = new EventEmitter<void>();

  private formBuilder = inject(FormBuilder);

  public updRouteForm: FormGroup = this.formBuilder.group({
    stations: this.formBuilder.array([new FormControl<string | null>(null)]),
    carriages: this.formBuilder.array([new FormControl<string | null>(null)]),
  });

  ngOnInit(): void {
    this.setInitialValues();
  }

  get stations(): FormArray {
    return this.updRouteForm.get('stations') as FormArray;
  }

  get carriages(): FormArray {
    return this.updRouteForm.get('carriages') as FormArray;
  }

  get processedStationData(): string[] | null {
    return this.stationDataAllUpd ? this.stationDataAllUpd.map((station) => station.city) : null;
  }

  get processedCarriagesData(): string[] | null {
    return this.carriagesDataAllUpd ? this.carriagesDataAllUpd.map((carriage) => carriage.name) : null;
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

  public removeStation(index: number): void {
    if (this.stations.length > 1) {
      this.stations.removeAt(index);
    }
  }

  public removeCarriage(index: number): void {
    if (this.carriages.length > 1) {
      this.carriages.removeAt(index);
    }
  }

  public createRoute() {
    const stations = this.mutateStations(
      Array.from(new Set(this.updRouteForm.get('stations')?.value.slice(0, -1) as string[]))
    );
    const carriages = this.mutateCarriages(
      this.updRouteForm.get('carriages')?.value.filter((carriage: string) => carriage !== null)
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

    // const newRoute: IRoutes = {
    //   path: stations,
    //   carriages,
    // };

    // console.log('upd route', newRoute);

    // this.store.dispatch(RoutesActions.addNewRoute({ newRoute }));
    this.closeForm();
    this.resetForm();
  }

  private mutateStations(stationsArr: string[]): number[] {
    const keys: number[] = [];
    if (this.stationDataAllUpd) {
      // eslint-disable-next-line no-restricted-syntax
      for (const station of this.stationDataAllUpd) {
        if (stationsArr.includes(station.city)) keys.push(station.id);
      }
    }
    return keys;
  }

  private mutateCarriages(carriagesArr: string[]): string[] {
    const keys: string[] = [];

    if (this.carriagesDataAllUpd) {
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < carriagesArr.length; i += 1) {
        const name = carriagesArr[i];
        // eslint-disable-next-line no-restricted-syntax
        for (let j = 0; j < this.carriagesDataAllUpd.length; j += 1) {
          const carriage = this.carriagesDataAllUpd[j];
          if (carriage.code && carriage.name === name) {
            keys.push(carriage.code);
          }
        }
      }
    }

    return keys;
  }

  private resetForm() {
    this.stations.clear();
    this.carriages.clear();
    this.stations.push(new FormControl<string | null>(null));
    this.carriages.push(new FormControl<string | null>(null));
  }

  public closeForm() {
    this.formClosed.emit();
  }

  private setInitialValues(): void {
    if (this.routeData) {
      const stationIds = this.routeData.path || [];
      this.stations.clear();
      stationIds.forEach((id: number) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const station = this.stationDataAllUpd?.find((station) => station.id === id);
        this.stations.push(new FormControl<string | null>(station ? station.city : null));
      });
      this.stations.push(new FormControl<string | null>(null));

      const carriageCodes = this.routeData.carriages || [];
      this.carriages.clear();
      carriageCodes.forEach((code: string) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const carriage = this.carriagesDataAllUpd?.find((carriage) => carriage.code === code);
        this.carriages.push(new FormControl<string | null>(carriage ? carriage.name : null));
      });
      this.carriages.push(new FormControl<string | null>(null));
    }
  }
}
