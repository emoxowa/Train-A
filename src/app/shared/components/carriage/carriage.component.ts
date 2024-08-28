import { Component, Input } from '@angular/core';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';

@Component({
  selector: 'app-carriage',
  standalone: true,
  imports: [],
  template: `
    <div class="carriage">
      <div class="carriage__header">
        <span>Code: {{ carriagesData.code }}</span>
        <span>Name: {{ carriagesData.name }}</span>
      </div>
      <div class="carriage__body">
        @for (row of getRows(carriagesData.rows); track row; let rowIndex = $index) {
          <div class="carriage__row">
            <div class="carriage__left-seats">
              @for (seat of getSeats(carriagesData.leftSeats, rowIndex); track seat; let seatIndexLeft = $index) {
                <div class="carriage__seat">
                  L{{ row }}-{{ seatIndexLeft + rowIndex * (carriagesData.leftSeats + carriagesData.rightSeats) + 1 }}
                </div>
              }
            </div>
            <div class="carriage__right-seats">
              @for (seat of getSeats(carriagesData.rightSeats, rowIndex); track seat; let seatIndexRight = $index) {
                <div class="carriage__seat">
                  R{{ row }}-{{
                    seatIndexRight +
                      carriagesData.leftSeats +
                      rowIndex * (carriagesData.leftSeats + carriagesData.rightSeats) +
                      1
                  }}
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './carriage.component.scss',
})
export class CarriageComponent {
  @Input() carriagesData!: ICarriagesType;

  // eslint-disable-next-line class-methods-use-this
  getRows(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  // eslint-disable-next-line class-methods-use-this
  getSeats(count: number, rowIndex: number): number[] {
    return Array.from({ length: count }, (_, index) => index + rowIndex * count);
  }
}
