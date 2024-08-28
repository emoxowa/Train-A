import { Component, Input } from '@angular/core';
import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';

@Component({
  selector: 'app-carriage',
  standalone: true,
  imports: [],
  template: `
    <div>code: {{ carriagesData.code }}</div>
  <div>name: {{ carriagesData.name }}</div>
  <div>rows: {{ carriagesData.rows }}</div>
  <div>leftSeats: {{ carriagesData.leftSeats }}</div>
  <div>rightSeats: {{ carriagesData.rightSeats }}</div>
  `,
  styleUrl: './carriage.component.scss'
})
export class CarriageComponent {
  @Input() carriagesData!: ICarriagesType
}
