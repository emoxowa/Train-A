import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IStation } from '@app/admin/models/station-list.model';
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

  private formBuilder = inject(FormBuilder);

  public createRouteForm: FormGroup = this.formBuilder.group({
    stations: this.formBuilder.array([this.formBuilder.control('', Validators.required)]),
    // carriages: this.formBuilder.array([new FormControl<string | null>(null)]),
  });

  get stations(): FormArray {
    return this.createRouteForm.get('stations') as FormArray;
  }

  // get carriages(): FormArray {
  //   return this.createRouteForm.get('carriages') as FormArray;
  // }

  get processedStationData(): string[] | null {
    return this.stationData ? this.stationData.map((station) => station.city) : null;
  }

  public onSelectChangeStation(index: number): void {
    if (index === this.stations.length - 1) {
      this.stations.push(this.formBuilder.control('', Validators.required));
    }
  }

  closeForm() {
    this.formClosed.emit();
  }
}
