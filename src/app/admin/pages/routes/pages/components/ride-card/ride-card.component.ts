import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { IPriceInfo, IRideInfo, IScheduleInfo, ISegmentInfo } from '@app/admin/models/route-info.module';
import { IStation } from '@app/admin/models/station-list.model';
import { Store } from '@ngrx/store';
import { RiderAction } from '@core/store/admin-store/actions/riders.actions';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss',
})
export class RideCardComponent implements OnInit {
  @Input({ required: true }) rideInfo!: IRideInfo;

  @Input({ required: true }) routeId!: number;

  @Input({ required: true }) rideSchedule!: ISegmentInfo[];

  @Input({ required: true }) idRide!: number;

  @Input({ required: true }) cityRide!: number[];

  @Input({ required: true }) carriageRide!: string[];

  @Input({ required: true }) stationDataAllUpd: Pick<IStation, 'id' | 'city'>[] | undefined;

  @Input({ required: true }) carriagesDataAllUpd: Pick<ICarriage, 'code' | 'name'>[] | undefined;

  isEditingPrice: boolean[] = [];

  isEditingTime: boolean[] = [];

  @ViewChildren('timeInputDepart') timeInputsDepart!: QueryList<ElementRef<HTMLInputElement>>;

  @ViewChildren('timeInputArrive') timeInputsArrive!: QueryList<ElementRef<HTMLInputElement>>;

  @ViewChildren('carriageInput') carriageInputs!: QueryList<ElementRef<HTMLInputElement>>;

  @ViewChildren('carriageName') carriageName!: QueryList<ElementRef<HTMLInputElement>>;

  private readonly store = inject(Store);

  ngOnInit(): void {
    this.isEditingPrice = new Array(this.rideSchedule.length).fill(false);
    this.isEditingTime = new Array(this.rideSchedule.length).fill(false);
  }

  toggleEditPrice(index: number): void {
    this.isEditingPrice[index] = !this.isEditingPrice[index];
  }

  toggleEditTime(index: number): void {
    this.isEditingTime[index] = !this.isEditingTime[index];
  }

  // eslint-disable-next-line class-methods-use-this
  formatToDateTimeLocal(isoString: string): string {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // eslint-disable-next-line class-methods-use-this
  getCarriagePriceArray(carriagePriceObj: IPriceInfo) {
    return Object.entries(carriagePriceObj);
  }

  getCityById(cityId: number): string {
    if (this.stationDataAllUpd) {
      const stationName = this.stationDataAllUpd.find((station) => station.id === cityId);
      return stationName ? stationName.city : '';
    }
    return '';
  }

  getCarriageByCode(carriageCode: string): string {
    if (this.carriagesDataAllUpd) {
      const carriageName = this.carriagesDataAllUpd.find((carriage) => carriage.code === carriageCode);
      return carriageName ? carriageName.name : '';
    }
    return '';
  }

  findSegmentByRiderId(riderId: number): IScheduleInfo | undefined {
    return this.rideInfo.schedule.find((ride) => {
      return ride.rideId === riderId;
    });
  }

  saveRide(index: number): void {
    const departInputs = this.getValuesByIndex(this.timeInputsDepart, index, 'data-index');
    const arriveInputs = this.getValuesByIndex(this.timeInputsArrive, index, 'data-index');
    const prevDepartInputs = this.getValuesByIndex(this.timeInputsDepart, index - 1, 'data-index');
    const nextArriveInputs = this.getValuesByIndex(this.timeInputsArrive, index + 1, 'data-index');

    const carriagesInputs = this.getValuesByIndex(this.carriageInputs, index, 'data-index');
    const carriageNameTextContent = this.getTextContentByIndex(this.carriageName, index, 'data-index');

    const prevTime = [...prevDepartInputs, ...arriveInputs];
    const time = [...departInputs, ...nextArriveInputs];

    const carriagesPrice = this.mapCarriagePrices(carriageNameTextContent, carriagesInputs);

    const newSchedule = this.rideSchedule.map((segment, segmentIndex, schedule): ISegmentInfo => {
      if (segmentIndex === index) {
        return {
          price: carriagesPrice,
          time: time.map((timeItem) => new Date(timeItem).toISOString()) as [string, string],
        };
      }

      if (segmentIndex + 1 === index) {
        return {
          ...schedule[index - 1],
          time: prevTime.map((timeItem) => new Date(timeItem).toISOString()) as [string, string],
        };
      }

      return segment;
    });

    this.store.dispatch(
      RiderAction.updateRide({ scheduleItem: { segments: newSchedule }, routeId: this.routeId, rideId: this.idRide })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private mapCarriagePrices(carriageNames: (string | null)[], carriageInputs: string[]): IPriceInfo {
    const validCarriageNames = carriageNames.filter((name): name is string => name !== null);

    const carriagePrices: IPriceInfo = {};

    for (let i = 0; i < validCarriageNames.length; i += 1) {
      const key = validCarriageNames[i];
      carriagePrices[key] = Number(carriageInputs[i]);
    }

    return carriagePrices;
  }

  // eslint-disable-next-line class-methods-use-this
  private getValuesByIndex(
    elements: QueryList<ElementRef<HTMLInputElement>>,
    index: number,
    attribute: string
  ): string[] {
    return elements
      .filter((ref) => parseInt(ref.nativeElement.getAttribute(attribute) || '', 10) === index)
      .map((ref) => ref.nativeElement.value);
  }

  // eslint-disable-next-line class-methods-use-this
  private getTextContentByIndex(
    elements: QueryList<ElementRef<HTMLElement>>,
    index: number,
    attribute: string
  ): (string | null)[] {
    return elements
      .filter((ref) => parseInt(ref.nativeElement.getAttribute(attribute) || '', 10) === index)
      .map((ref) => ref.nativeElement.textContent);
  }
}
