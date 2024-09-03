import { TuiRoot } from '@taiga-ui/core';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from '@app/train/pages/home-page/home-page.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICarriage } from './admin/models/create-new-carriage-type.model';
import { selectCarriagesArr } from './core/store/admin-store/selectors/carriage.selectors';
import { CarriageActions } from './core/store/admin-store/actions/carriage.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, HomePageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  public carriagesList$: Observable<ICarriage[]> = this.store.select(selectCarriagesArr);

  ngOnInit(): void {
    this.store.dispatch(CarriageActions.loadCarriagesList());
  }
}
