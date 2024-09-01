import { Component, Input } from '@angular/core';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { ISegmentInfo } from '@app/admin/models/route-info.module';
import { IStation } from '@app/admin/models/station-list.model';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [],
  template: `
    @if (rideData) {
      <div>Ride {{ idRide }}</div>
    }
    @for (ride of rideData; track ride; let i = $index) {
      <div class="ride-card__container">
        <div class="ride-card__city">
          <div class="ride-card__city-element">
            {{ getCityById(cityRide[i]) }}
          </div>
          @if (i === rideData.length - 1) {
            <div class="ride-card__city-element">
              {{ getCityById(cityRide[rideData.length]) }}
            </div>
          }
        </div>
        <div class="ride-card__time">
          @for (time of ride.time; track time; let j = $index) {
            <div class="ride-card__time-element">
              {{ time }}
            </div>
          }
        </div>
        <div class="ride-card__carriage">
          @for (carriage of carriageRide; track trackCarriageByIndex) {
            <div class="ride-card__carriage-element">
              {{ getCarriageByCode(carriage) }}
            </div>
          }
        </div>
      </div>
    }
  `,
  styleUrl: './ride-card.component.scss',
})
export class RideCardComponent {
  @Input({ required: true }) rideData!: ISegmentInfo[];

  @Input({ required: true }) idRide!: number;

  @Input({ required: true }) cityRide!: number[];

  @Input({ required: true }) carriageRide!: string[];

  @Input({ required: true }) stationDataAllUpd: Pick<IStation, 'id' | 'city'>[] | undefined;

  @Input({ required: true }) carriagesDataAllUpd: Pick<ICarriage, 'code' | 'name'>[] | undefined;

  // ngOnInit(): void {
  //   console.log('ride data', this.rideData);
  //   console.log('idRide ride', this.idRide);
  //   console.log('carriage ride', this.carriageRide);
  //   console.log('city ride', this.cityRide);
  //   console.log('all station ride', this.stationDataAllUpd)
  //   console.log('all carriages ride', this.carriagesDataAllUpd)
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

  // eslint-disable-next-line class-methods-use-this
  trackCarriageByIndex(index: number): number {
    return index;
  }
}
