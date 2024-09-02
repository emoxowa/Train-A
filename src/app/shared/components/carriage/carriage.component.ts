/* eslint-disable no-console */
import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-carriage',
  standalone: true,
  imports: [TuiIcon, CommonModule],
  template: `
    <div class="carriage">
      <div class="carriage__header">
        <span>{{ carriagesData.name }}</span>
        <div class="carriage__seats">
          {{ (leftSeats.length + rightSeats.length) * rows.length - occupiedSeats.length }} seats
        </div>
      </div>
      <div class="carriage__container">
        <div class="carriage__enter">
          <tui-icon icon="@tui.fa.solid.mug-saucer"></tui-icon>
          <tui-icon icon="@tui.fa.solid.person-walking-dashed-line-arrow-right"></tui-icon>
          <tui-icon icon="@tui.fa.solid.trash" style="align-self: flex-end;"></tui-icon>
          <tui-icon icon="@tui.fa.solid.restroom" style="align-self: flex-end;"></tui-icon>
        </div>

        <div class="carriage__body">
          <div class="carriage__row" *ngFor="let row of rows; let rowIndex = index">
            <div class="carriage__left-seats">
              <div
                class="carriage__seat"
                [ngClass]="{
                  'selected-seat': calculateSeatIndex(rowIndex, seatIndexLeft, 'L') === selectedSeatIndex,
                  'occupied-seat': isOccupiedSeat(calculateSeatIndex(rowIndex, seatIndexLeft, 'L')),
                  'available-seat':
                    !isOccupiedSeat(calculateSeatIndex(rowIndex, seatIndexLeft, 'L')) &&
                    calculateSeatIndex(rowIndex, seatIndexLeft, 'L') !== selectedSeatIndex,
                }"
                *ngFor="let seat of leftSeats; let seatIndexLeft = index"
                (click)="onSeatClick(calculateSeatIndex(rowIndex, seatIndexLeft, 'L'))"
              >
                {{ calculateSeatIndex(rowIndex, seatIndexLeft, 'L') }}
              </div>
            </div>

            <div class="carriage__right-seats">
              <div
                class="carriage__seat"
                [ngClass]="{
                  'selected-seat': calculateSeatIndex(rowIndex, seatIndexRight, 'R') === selectedSeatIndex,
                  'occupied-seat': isOccupiedSeat(calculateSeatIndex(rowIndex, seatIndexRight, 'R')),
                  'available-seat':
                    !isOccupiedSeat(calculateSeatIndex(rowIndex, seatIndexRight, 'R')) &&
                    calculateSeatIndex(rowIndex, seatIndexRight, 'R') !== selectedSeatIndex,
                }"
                *ngFor="let seat of rightSeats; let seatIndexRight = index"
                (click)="onSeatClick(calculateSeatIndex(rowIndex, seatIndexRight, 'R'))"
              >
                {{ calculateSeatIndex(rowIndex, seatIndexRight, 'R') }}
              </div>
            </div>
          </div>
        </div>

        <div class="carriage__restroom"><tui-icon icon="@tui.fa.solid.restroom"></tui-icon></div>
      </div>
    </div>
  `,
  styleUrl: './carriage.component.scss',
})
export class CarriageComponent implements OnChanges {
  @Input({ required: true }) carriagesData!: ICarriage;

  @Input() occupiedSeats: number[] = [];

  @Output() seatSelected = new EventEmitter<number>();

  rows: number[] = [];

  leftSeats: number[] = [];

  rightSeats: number[] = [];

  selectedSeatIndex: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['carriagesData'] && this.carriagesData) {
      this.rows = this.getRows(this.carriagesData.rows);
      this.leftSeats = this.getSeats(this.carriagesData.leftSeats);
      this.rightSeats = this.getSeats(this.carriagesData.rightSeats);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getRows(count: number): number[] {
    const rows = Array.from({ length: count }, (_, index) => index + 1);
    return rows;
  }

  // eslint-disable-next-line class-methods-use-this
  getSeats(count: number): number[] {
    const seats = Array.from({ length: count }, (_, index) => index + 1);
    return seats;
  }

  calculateSeatIndex(rowIndex: number, seatIndex: number, side: string): number {
    const seatsPerRow = this.leftSeats.length + this.rightSeats.length;
    if (side === 'L') {
      return rowIndex * seatsPerRow + seatIndex + 1;
    }
    return rowIndex * seatsPerRow + this.leftSeats.length + seatIndex + 1;
  }

  onSeatClick(seatIndex: number): void {
    if (this.isOccupiedSeat(seatIndex)) {
      console.log(`Seat ${seatIndex} is occupied`);
      return;
    }
    this.selectedSeatIndex = seatIndex;
    this.seatSelected.emit(seatIndex);
  }

  isOccupiedSeat(seatIndex: number): boolean {
    return this.occupiedSeats.includes(seatIndex);
  }
}
