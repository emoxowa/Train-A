import { Component, EventEmitter, Output } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-create-route-form',
  standalone: true,
  imports: [TuiButton],
  template: ` <button size="s" tuiButton (click)="closeForm()">Close form</button> `,
  styleUrl: './create-route-form.component.scss',
})
export class CreateRouteFormComponent {
  @Output() formClosed = new EventEmitter<void>();

  closeForm() {
    this.formClosed.emit();
  }
}
