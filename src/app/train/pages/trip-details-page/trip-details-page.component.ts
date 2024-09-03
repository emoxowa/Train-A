/* eslint-disable no-console */
import { CommonModule, Location } from '@angular/common';
import { Component, inject, INJECTOR, OnInit } from '@angular/core';
import { TuiButton, TuiDialogService } from '@taiga-ui/core';
import { TuiAppBar } from '@taiga-ui/layout';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { first, map, Observable, shareReplay, take } from 'rxjs';
import { TuiSegmented } from '@taiga-ui/kit';
import { TrainService } from '@app/train/services/train.service';
import { ActivatedRoute } from '@angular/router';
import { IRideInformation } from '@app/train/models/ride-information.model';
import { Store } from '@ngrx/store';
import { selectStationIdAndCity } from '@app/core/store/admin-store/selectors/stations.selectors';
import { UniqueCarriagesPipe } from '@app/train/pipes/unique-carriages.pipe';
import { LegendComponent } from '@app/train/components/legend/legend.component';
import { selectCarriagesArr } from '@app/core/store/admin-store/selectors/carriage.selectors';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { CarriageComponent } from '@app/shared/components/carriage/carriage.component';
import { OrderService } from '@app/train/services/order.service';
import { IOrderCreateRequest } from '@app/train/models/order.model';
import { SumCarriagePricePipe } from '@app/train/pipes/sumCarriagePrice.pipe';
import { CityNamePipe } from '@app/train/pipes/city-name.pipe';
import { RouteModalComponent } from '../../components/route-modal/route-modal.component';
import { RouteModalData } from '../../components/search-results/search-results.component';

@Component({
  selector: 'app-trip-details-page',
  standalone: true,
  imports: [
    CommonModule,
    TuiAppBar,
    TuiSegmented,
    TuiButton,
    UniqueCarriagesPipe,
    LegendComponent,
    CarriageComponent,
    SumCarriagePricePipe,
    CityNamePipe,
  ],
  templateUrl: './trip-details-page.component.html',
  styleUrls: ['./trip-details-page.component.scss'],
})
export class TripDetailsPageComponent implements OnInit {
  private readonly dialogs = inject(TuiDialogService);

  private readonly injector = inject(INJECTOR);

  private readonly location = inject(Location);

  private readonly trainService = inject(TrainService);

  private readonly orderService = inject(OrderService);

  private readonly route = inject(ActivatedRoute);

  private store = inject(Store);

  protected rideInformation$!: Observable<IRideInformation>;

  public stationArr$ = this.store.select(selectStationIdAndCity);

  public selectedCarriage: string | null = null;

  public selectedSeat: number | null = null;

  public carriagesList$: Observable<ICarriage[]> = this.store.select(selectCarriagesArr);

  public occupiedSeats: number[] = [];

  public availableSeatsCount: number = 0;

  public stationStart: number = 0;

  public stationEnd: number = 0;

  ngOnInit(): void {
    const rideId = Number(this.route.snapshot.paramMap.get('id'));
    this.stationStart = Number(this.route.snapshot.queryParamMap.get('from'));
    this.stationEnd = Number(this.route.snapshot.queryParamMap.get('to'));

    if (rideId) {
      console.log('Fetching ride information for ID:', rideId);
      this.rideInformation$ = this.trainService.getRideInformation(rideId).pipe(shareReplay(1));

      this.rideInformation$.pipe(first()).subscribe({
        next: (ride) => {
          console.log('Ride information received:', ride);
          if (ride && ride.carriages.length > 0) {
            const [firstCarriage] = ride.carriages;
            this.selectedCarriage = firstCarriage;
          }
          this.calculateOccupiedSeats();
          this.calculateAvailableSeatsCount();
        },
        error: (error) => console.error('Error occurred while fetching ride information:', error),
      });
    } else {
      console.error('Ride ID is not available in route parameters.');
    }
  }

  protected showDialog(event: Event): void {
    event.stopPropagation();

    this.rideInformation$.pipe(take(1)).subscribe((rideInfo) => {
      if (rideInfo) {
        this.dialogs
          .open(new PolymorpheusComponent(RouteModalComponent, this.injector), {
            size: 'm',
            closeable: true,
            dismissible: true,
            data: {
              schedule: rideInfo.schedule,
              from: this.stationStart,
              to: this.stationEnd,
              path: rideInfo.path,
            } as RouteModalData,
          })
          .subscribe();
      }
    });
  }

  protected getCityName(stationId: number): Observable<string | undefined> {
    return this.stationArr$.pipe(map((stations) => stations.find((station) => station.id === stationId)?.city));
  }

  protected goBack(): void {
    this.location.back();
  }

  onCarriageSelected(carriage: string): void {
    this.selectedCarriage = carriage;
  }

  onSeatSelected(seatIndex: number, carriageIndex: number): void {
    this.selectedSeat = this.calculateAbsoluteSeatIndex(carriageIndex, seatIndex);
  }

  getCarriageData(carriageCode: string): ICarriage {
    let carriageData: ICarriage | undefined;
    this.carriagesList$.pipe(take(1)).subscribe((carriages) => {
      carriageData = carriages.find((carriage) => carriage.code === carriageCode);
    });

    return (
      carriageData || {
        code: 'unknown',
        name: 'Unknown Carriage',
        rows: 0,
        leftSeats: 0,
        rightSeats: 0,
      }
    );
  }

  calculateAbsoluteSeatIndex(carriageIndex: number, seatIndex: number): number {
    let seatOffset = 0;

    this.rideInformation$.pipe(take(1)).subscribe((ride) => {
      if (!ride) {
        return;
      }

      for (let i = 0; i < carriageIndex; i += 1) {
        const carriageData = this.getCarriageData(ride.carriages[i]);
        seatOffset += carriageData.rows * (carriageData.leftSeats + carriageData.rightSeats);
      }

      const absoluteSeatIndex = seatOffset + seatIndex;
      console.log(`Absolute Seat Index: ${absoluteSeatIndex}`);
      this.selectedSeat = absoluteSeatIndex;
    });

    return this.selectedSeat!;
  }

  calculateAvailableSeatsCount(): void {
    this.rideInformation$.pipe(take(1)).subscribe((ride) => {
      if (!ride) return;

      let totalSeats = 0;

      ride.carriages.forEach((carriageCode) => {
        const carriageData = this.getCarriageData(carriageCode);
        totalSeats += carriageData.rows * (carriageData.leftSeats + carriageData.rightSeats);
      });

      this.availableSeatsCount = totalSeats - this.occupiedSeats.length;
    });
  }

  getAvailableSeatsCountForCarriage(carriageCode: string): number {
    let totalAvailableSeats = 0;

    this.rideInformation$.pipe(take(1)).subscribe((ride) => {
      if (!ride) return;

      let seatOffset = 0;

      ride.carriages.forEach((code) => {
        const carriageData = this.getCarriageData(code);
        const carriageSeatsCount = carriageData.rows * (carriageData.leftSeats + carriageData.rightSeats);

        if (code === carriageCode) {
          const occupiedSeatsForThisCarriage = this.occupiedSeats
            .filter((seat) => seat > seatOffset && seat <= seatOffset + carriageSeatsCount)
            .map((seat) => seat - seatOffset);

          const availableSeatsForThisCarriage = carriageSeatsCount - occupiedSeatsForThisCarriage.length;
          totalAvailableSeats += availableSeatsForThisCarriage;
        }

        seatOffset += carriageSeatsCount;
      });
    });

    return totalAvailableSeats;
  }

  bookSeat(): void {
    if (this.selectedSeat !== null && this.selectedCarriage && this.rideInformation$) {
      this.rideInformation$.pipe(take(1)).subscribe((rideInfo) => {
        const orderRequest: IOrderCreateRequest = {
          rideId: rideInfo.rideId,
          seat: this.selectedSeat!,
          stationStart: this.stationStart,
          stationEnd: this.stationEnd,
        };
        this.orderService.createOrder(orderRequest).subscribe((response) => {
          console.log('Order created with ID:', response.id);
        });
      });
    } else {
      console.log('Please select a seat to book.');
    }
  }

  calculateOccupiedSeats(): void {
    this.rideInformation$.pipe(take(1)).subscribe((rideInfo) => {
      if (!rideInfo) return;

      rideInfo.schedule.segments.forEach((segment) => {
        this.occupiedSeats.push(...segment.occupiedSeats);
      });

      this.occupiedSeats = Array.from(new Set(this.occupiedSeats));
    });
  }

  getOccupiedSeatsForCarriage(carriageIndex: number): number[] {
    let seatOffset = 0;
    let carriageSeatsCount = 0;
    let occupiedSeatsForCarriage: number[] = [];

    this.rideInformation$.pipe(take(1)).subscribe((ride) => {
      if (!ride) return;

      for (let i = 0; i < carriageIndex; i += 1) {
        const carriageData = this.getCarriageData(ride.carriages[i]);
        seatOffset += carriageData.rows * (carriageData.leftSeats + carriageData.rightSeats);
      }

      const carriageData = this.getCarriageData(ride.carriages[carriageIndex]);
      carriageSeatsCount = carriageData.rows * (carriageData.leftSeats + carriageData.rightSeats);

      occupiedSeatsForCarriage = this.occupiedSeats
        .filter((seat) => seat > seatOffset && seat <= seatOffset + carriageSeatsCount)
        .map((seat) => seat - seatOffset);
    });

    return occupiedSeatsForCarriage;
  }

  calculateTotalPriceForCarriageType(carriageType: string): number {
    let totalPrice = 0;

    this.rideInformation$.pipe(take(1)).subscribe((rideInfo) => {
      if (!rideInfo) return;

      rideInfo.schedule.segments.forEach((segment) => {
        if (segment.price[carriageType]) {
          totalPrice += segment.price[carriageType];
        }
      });
    });

    return totalPrice;
  }
}
