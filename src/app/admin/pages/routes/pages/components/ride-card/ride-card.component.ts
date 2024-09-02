import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { IPriceInfo, IRideInfo, IScheduleInfo, ISegmentInfo } from '@app/admin/models/route-info.module';
import { IStation } from '@app/admin/models/station-list.model';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (rideSchedule) {
      <div>Ride {{ idRide }}</div>
    }
    @for (ride of rideSchedule; track ride; let i = $index) {
      @let segmentData = findSegmentByRiderId(idRide);
      <div class="ride-card__container">
        <div class="ride-card__city">
          <div class="ride-card__city-element">
            {{ getCityById(cityRide[i]) }}
          </div>
          @if (i === rideSchedule.length - 1) {
            <div class="ride-card__city-element">
              {{ getCityById(cityRide[rideSchedule.length]) }}
            </div>
          }
        </div>
        <div class="ride-card__time">
          <!-- @for (time of ride.time; track time; let j = $index) {
            @if (j === 0) {
              <div class="ride-card__time-element">Departure {{ time | date: 'dd.MM.yyyy HH:mm' }}</div>
            } @else {
              Arrival {{ time | date: 'dd.MM.yyyy HH:mm' }}
            }
          } -->
          <div class="test-time">
            <h4>time</h4>
            @if (segmentData) {
              @if (i === 0) {
                <div>depart {{ segmentData.segments[i].time[0] | date: 'dd.MM.yyyy HH:mm' }}</div>
              } @else if (i === rideSchedule.length - 1) {
                <div>arrive {{ segmentData.segments[i].time[1] | date: 'dd.MM.yyyy HH:mm' }}</div>
              } @else {
                <div>arrive {{ segmentData.segments[i - 1].time[1] | date: 'dd.MM.yyyy HH:mm' }}</div>
                <div>depart {{ segmentData.segments[i].time[0] | date: 'dd.MM.yyyy HH:mm' }}</div>
              }
            }
          </div>
        </div>
        <div class="ride-card__carriage">
          @if (segmentData) {
            @let priceCarriage = getCarriagePriceArray(segmentData.segments[i].price);
            @for (carriage of priceCarriage; track carriage[0]; let j = $index) {
              @if (!isEditing[i]) {
                <div class="ride-card__cariage-element">
                  <span>{{ carriage[0] }} </span>
                  <span>{{ carriage[1] }}</span>
                </div>
              } @else if (isEditing[i]) {
                <div class="ride-card__cariage-element">
                  <span>{{ carriage[0] }}</span>
                  <input
                    class="ride-card__carriage-input"
                    type="number"
                    (input)="onInputChangePrice($event, carriage[0], idRide)"
                    [value]="carriage[1]"
                  />
                </div>
              }
            }
            @if (!isEditing[i]) {
              <button (click)="toggleEdit(i)" class="ride-card__edit-carriage">Edit</button>
            } @else if (isEditing[i]) {
              <button (click)="toggleEdit(i)">Save</button>
            }
          }
        </div>
      </div>
    }
  `,
  styleUrl: './ride-card.component.scss',
})
export class RideCardComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  @Input({ required: true }) rideInfo!: IRideInfo;

  @Input({ required: true }) routeId!: number;

  @Input({ required: true }) rideSchedule!: ISegmentInfo[];

  @Input({ required: true }) idRide!: number;

  @Input({ required: true }) cityRide!: number[];

  @Input({ required: true }) carriageRide!: string[];

  @Input({ required: true }) stationDataAllUpd: Pick<IStation, 'id' | 'city'>[] | undefined;

  @Input({ required: true }) carriagesDataAllUpd: Pick<ICarriage, 'code' | 'name'>[] | undefined;

  isEditing: boolean[] = [];

  ngOnInit(): void {
    // if (this.rideSchedule && this.rideInfo) {
    //   this.rideSchedule.forEach((ride, i) => {
    //     const segmentData = this.findSegmentByRiderId(this.idRide);
    //     if (segmentData) {
    //       this.getcarriagePriceArray(segmentData.segments[i].price).forEach((carriage) => {
    //         this.carriagePriceGroup.addControl(carriage[0], new FormControl(carriage[1]));
    //       });
    //     }
    //   });
    // }
    // console.log('ride info', this.rideInfo);
    // console.log('ride schedule', this.rideSchedule);
    // console.log('idRide ride', this.idRide);
    // console.log('carriage ride', this.carriageRide);
    // console.log('city ride', this.cityRide);
    // console.log('all station ride', this.stationDataAllUpd)
    // console.log('all carriages ride', this.carriagesDataAllUpd)
    this.isEditing = new Array(this.rideSchedule.length).fill(false);
  }

  toggleEdit(index: number): void {
    if (this.isEditing[index]) {
      console.log('Saving changes for ride index', index);
    }
    this.isEditing[index] = !this.isEditing[index];
  }

  // eslint-disable-next-line class-methods-use-this
  onInputChangePrice(event: Event, carriageName: string, rideIndex: number) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    // console.log('route Index', this.routeId)
    // console.log(`Input value changed at ride index ${rideIndex} and carriage index ${carriageName}: ${inputValue}`);
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
}
