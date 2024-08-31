import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';
import { IRoutes } from '@app/admin/models/routes.model';
import { IStation } from '@app/admin/models/station-list.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-upd-route-form',
  standalone: true,
  imports: [],
  templateUrl: './upd-route-form.component.html',
  styleUrl: './upd-route-form.component.scss',
})
export class UpdRouteFormComponent {
  @Input({ required: true }) routeData!: IRoutes;

  @Input({ required: true }) stationDataAllUpd: Pick<IStation, 'id' | 'city'>[] | undefined;

  @Input({ required: true }) carriagesDataAllUpd: Pick<ICarriagesType, 'code' | 'name'>[] | undefined;

  private store = inject(Store);

  private formBuilder = inject(FormBuilder);

  public updRouteForm: FormGroup = this.formBuilder.group({
    stations: this.formBuilder.array([new FormControl<string | null>(null)]),
    carriages: this.formBuilder.array([new FormControl<string | null>(null)]),
  });

  // ngOnInit(): void {
  //   // console.log('upd form routeData', this.routeData);
  //   // console.log('upd from stationData', this.stationDataAllUpd);
  //   // console.log('upd form carriagesData', this.carriagesDataAllUpd);
  // }

  // get stations(): FormArray {
  //   return this.updRouteForm.get('stations') as FormArray;
  // }

  // get carriages(): FormArray {
  //   return this.updRouteForm.get('carriages') as FormArray;
  // }

  // get processedStationData(): string[] | null {
  //   return this.stationData ? this.stationData.map((station) => station.city) : null;
  // }

  // get processedCarriagesData(): string[] | null {
  //   return this.carriagesData ? this.carriagesData.map((carriage) => carriage.name) : null;
  // }
}
