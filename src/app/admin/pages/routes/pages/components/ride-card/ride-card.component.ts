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
            @if(isEditingTime[i]){
              @if (segmentData) {
              @if (i === 0) {
                <input
                    class="ride-card__time-input" 
                    type="datetime-local" 
                    (input)="onInputChangeTime($event, idRide)"
                    [value]="formatToDateTimeLocal(segmentData.segments[i].time[0])"
                  />
              } @else if (i === rideSchedule.length - 1) {
                <input
                    class="ride-card__time-input" 
                    type="datetime-local" 
                    (input)="onInputChangeTime($event, idRide)"
                    [value]="formatToDateTimeLocal(segmentData.segments[i].time[1])"
                  />
              } @else {
                <div class="ride-card__time-input_arrive">
                  <span>arrive</span>
                  <input
                    class="ride-card__time-input" 
                    type="datetime-local" 
                    (input)="onInputChangeTime($event, idRide)"
                    [value]="formatToDateTimeLocal(segmentData.segments[i - 1].time[1])"
                  />
                </div>
                <div class="ride-card__time-input_depart">
                  <span>depart </span>
                  <input
                    class="ride-card__time-input" 
                    type="datetime-local" 
                    (input)="onInputChangeTime($event, idRide)"
                    [value]="formatToDateTimeLocal(segmentData.segments[i].time[0])"
                  />
                </div>
              }
            }
            } @else if (!isEditingTime[i]) {
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
          }
          @if(!isEditingTime[i]){
              <button (click)="toggleEditTime(i)" class="ride-card__edit-carriage">Edit</button>
            } @else if (isEditingTime[i]) {
              <button (click)="toggleEditTime(i)">Save</button>
            } 
        </div>
        <div class="ride-card__carriage">
          @if (segmentData) {
            @let priceCarriage = getCarriagePriceArray(segmentData.segments[i].price);
            @for (carriage of priceCarriage; track carriage[0]; let j = $index;) {
              @if(!isEditingPrice[i]){
                <div class="ride-card__cariage-element">
                <span>{{carriage[0]}} </span>
                <span>{{carriage[1]}}</span>
              </div>
              } @else if (isEditingPrice[i]) {
                <div class="ride-card__cariage-element">
                <span>{{carriage[0]}}</span>
                <input
                    class="ride-card__carriage-input" 
                    type="number" 
                    (input)="onInputChangePrice($event, carriage[0], idRide)"
                    [value]="carriage[1]"
                  />
              </div> 
              }             
            }
            @if(!isEditingPrice[i]){
              <button (click)="toggleEditPrice(i)" class="ride-card__edit-carriage">Edit</button>
            } @else if (isEditingPrice[i]) {
              <button (click)="toggleEditPrice(i)">Save</button>
            }    
          }
        </div>
      </div>
    }
  `,
  styleUrl: './ride-card.component.scss',
})
export class RideCardComponent implements OnInit{
  private formBuilder = inject(FormBuilder);

  @Input({ required: true }) rideInfo!: IRideInfo;

  @Input({ required:true }) routeId!: number;

  @Input({ required: true }) rideSchedule!: ISegmentInfo[];

  @Input({ required: true }) idRide!: number;

  @Input({ required: true }) cityRide!: number[];

  @Input({ required: true }) carriageRide!: string[];

  @Input({ required: true }) stationDataAllUpd: Pick<IStation, 'id' | 'city'>[] | undefined;

  @Input({ required: true }) carriagesDataAllUpd: Pick<ICarriage, 'code' | 'name'>[] | undefined;

  isEditingPrice: boolean[] = [];

  isEditingTime: boolean[] = [];

  ngOnInit(): void {  
  // console.log('ride info', this.rideInfo);
  // console.log('ride schedule', this.rideSchedule);
  // console.log('idRide ride', this.idRide);
  // console.log('carriage ride', this.carriageRide);
  // console.log('city ride', this.cityRide);
  // console.log('all station ride', this.stationDataAllUpd)
  // console.log('all carriages ride', this.carriagesDataAllUpd)
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
  onInputChangePrice(event: Event, carriageName: string, rideIndex: number) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    // eslint-disable-next-line no-console
    console.log('route Index', this.routeId)
    // eslint-disable-next-line no-console
    console.log(`Input value changed at ride index ${rideIndex} and carriage index ${carriageName}: ${inputValue}`);
  }

  onInputChangeTime(event:Event, rideIndex: number){
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    // eslint-disable-next-line no-console
    console.log('route Index', this.routeId)
    // eslint-disable-next-line no-console
    console.log(`Input value changed at ride index ${rideIndex}: ${inputValue}`);
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
