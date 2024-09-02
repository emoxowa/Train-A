import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-carriage',
  standalone: true,
  imports: [TuiIcon],
  template: `
    <div class="carriage">
      <div class="carriage__header">
        <span>{{ carriagesData.name }}</span>
        <div class="carriage__seats">{{ (leftSeats.length + rightSeats.length) * rows.length }} seats</div>
      </div>
      <div class="carriage__container">
        <div class="carriage__enter">
          <tui-icon icon="@tui.fa.solid.mug-saucer"></tui-icon>
          <tui-icon icon="@tui.fa.solid.person-walking-dashed-line-arrow-right"></tui-icon>
          <tui-icon icon="@tui.fa.solid.trash" style="align-self: flex-end;"></tui-icon>
          <tui-icon icon="@tui.fa.solid.restroom" style="align-self: flex-end;"></tui-icon>
        </div>
        <div class="carriage__body">
          @for (row of rows; track row; let rowIndex = $index) {
            <div class="carriage__row">
              <div class="carriage__left-seats">
                @for (seat of leftSeats; track seat; let seatIndexLeft = $index) {
                  <div class="carriage__seat">L-{{ seat + (leftSeats.length + rightSeats.length) * rowIndex }}</div>
                }
              </div>

              <div class="carriage__right-seats">
                @for (seat of rightSeats; track seat; let seatIndexRight = $index) {
                  <div class="carriage__seat">
                    R-{{
                      getSeats(carriagesData.leftSeats).length +
                        seat +
                        (leftSeats.length + rightSeats.length) * rowIndex
                    }}
                  </div>
                }
              </div>
            </div>
          }
        </div>
        <div class="carriage__restroom"><tui-icon icon="@tui.fa.solid.restroom"></tui-icon></div>
      </div>
    </div>
  `,
  styleUrl: './carriage.component.scss',
})
export class CarriageComponent implements OnChanges {
  @Input({ required: true }) carriagesData!: ICarriage;

  rows: number[] = [];

  leftSeats: number[] = [];

  rightSeats: number[] = [];

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
}
