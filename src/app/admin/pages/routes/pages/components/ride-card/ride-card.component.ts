import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { IRideInfo, IScheduleInfo, ISegmentInfo } from '@app/admin/models/route-info.module';
import { IStation } from '@app/admin/models/station-list.model';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (rideSchedule) {
      <div>Ride {{ idRide }}</div>
    }
    @for (ride of rideSchedule; track ride; let i = $index) {
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
          @for (time of ride.time; track time; let j = $index) {
            @if (j === 0) {
              <div class="ride-card__time-element">Departure {{ time | date: 'dd.MM.yyyy HH:mm' }}</div>
            } @else {
              Arrival {{ time | date: 'dd.MM.yyyy HH:mm' }}
            }
          }
          <div class="test-time">
            <h4>test time</h4>
            <!-- @if(i < rideSchedule.length - 1 && rideInfo.schedule[idRide].segments[i] && rideInfo.schedule[idRide].segments[i + 1]){
              <div>depart next segment {{rideInfo.schedule[idRide].segments[i + 1].time[0] | date: 'dd.MM.yyyy HH:mm'}}</div>
            <div>arrive next segment {{rideInfo.schedule[idRide].segments[i + 1].time[1] | date: 'dd.MM.yyyy HH:mm'}}</div>
            } -->
            <!-- <div>segment {{rideInfo.schedule[i].segments[i] | json}}</div>
            @if(i < rideSchedule.length - 1){
              <div>next segment{{rideInfo.schedule[i].segments[i+1] | json}}</div>
            } -->
            <div>
              @if (i < rideSchedule.length - 1) {
                @let segmentData = findSegmentByRiderId(idRide);
                @if (segmentData) {
                  <div>depart {{ segmentData.segments[i + 1].time[0] | date: 'dd.MM.yyyy HH:mm' }}</div>
                  <div>arrive {{ segmentData.segments[i + 1].time[1] | date: 'dd.MM.yyyy HH:mm' }}</div>
                }
              }
            </div>
          </div>
        </div>
        <div class="ride-card__carriage">
          <!-- @for (carriage of carriageRide; track trackCarriageByIndex) {
            <div class="ride-card__carriage-element">
              {{ getCarriageByCode(carriage) }}
            </div>
          } -->
          <div>test carriages</div>
        </div>
      </div>
    }
  `,
  styleUrl: './ride-card.component.scss',
})
export class RideCardComponent {
  @Input({ required: true }) rideInfo!: IRideInfo;

  @Input({ required: true }) rideSchedule!: ISegmentInfo[];

  @Input({ required: true }) idRide!: number;

  @Input({ required: true }) cityRide!: number[];

  @Input({ required: true }) carriageRide!: string[];

  @Input({ required: true }) stationDataAllUpd: Pick<IStation, 'id' | 'city'>[] | undefined;

  @Input({ required: true }) carriagesDataAllUpd: Pick<ICarriage, 'code' | 'name'>[] | undefined;

  // private store = inject(Store);

  // ngOnInit(): void {
  // console.log('ride info', this.rideInfo);
  // console.log('ride schedule', this.rideSchedule);
  // console.log('idRide ride', this.idRide);
  // console.log('carriage ride', this.carriageRide);
  // console.log('city ride', this.cityRide);
  // console.log('all station ride', this.stationDataAllUpd)
  // console.log('all carriages ride', this.carriagesDataAllUpd)
  // }

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
