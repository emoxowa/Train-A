import { CommonModule, Location } from '@angular/common';
import { Component, inject, INJECTOR, OnInit } from '@angular/core';
import { TuiButton, TuiDialogService } from '@taiga-ui/core';
import { TuiAppBar } from '@taiga-ui/layout';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { catchError, first, Observable, of, shareReplay, take } from 'rxjs';
import { TuiSegmented } from '@taiga-ui/kit';
import { TrainService } from '@app/train/services/train.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRideInformation } from '@app/train/models/ride-information.model';
import { Store } from '@ngrx/store';
import { UniqueCarriagesPipe } from '@app/train/pipes/unique-carriages.pipe';
import { LegendComponent } from '@app/train/components/legend/legend.component';
import { selectCarriagesArr } from '@app/core/store/admin-store/selectors/carriage.selectors';
import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';
import { CarriageComponent } from '@app/shared/components/carriage/carriage.component';
import { OrderService } from '@app/train/services/order.service';
import { IOrderCreateRequest } from '@app/train/models/order.model';
import { SumCarriagePricePipe } from '@app/train/pipes/sumCarriagePrice.pipe';
import { CityNamePipe } from '@app/train/pipes/city-name.pipe';
import { NoRidesAvailableComponent } from '@app/train/components/no-rides-available/no-rides-available.component';
import { RouteModalComponent, RouteModalData } from '../../components/route-modal/route-modal.component';

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
    NoRidesAvailableComponent,
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

  private readonly store = inject(Store);

  private readonly router = inject(Router);

  protected rideInformation$!: Observable<IRideInformation | null>;

  public selectedCarriage: string | null = null;

  public selectedOrderCarriage: string | null = null;

  public selectedSeat: number | null = null;

  public carriagesList$: Observable<ICarriage[]> = this.store.select(selectCarriagesArr);

  public occupiedSeats: number[] = [];

  public availableSeatsCount: number = 0;

  public stationStart: number = 0;

  public stationEnd: number = 0;

  public showNoRidesAvailable: boolean = false;

  public bookingSuccess: boolean = false;

  public bookingError: boolean = false;

  public errorMessage: string | null = null;

  public selectedCarriageIndex: number | null = null;

  public selectedSeatIndex: number | null = null;

  ngOnInit(): void {
    this.initializeRideData();
  }

  private initializeRideData(): void {
    const rideId = Number(this.route.snapshot.paramMap.get('id'));
    this.stationStart = Number(this.route.snapshot.queryParamMap.get('from'));
    this.stationEnd = Number(this.route.snapshot.queryParamMap.get('to'));

    if (rideId) {
      this.rideInformation$ = this.trainService.getRideInformation(rideId).pipe(
        shareReplay(1),
        catchError(() => {
          this.showNoRidesAvailable = true;
          return of(null);
        })
      );

      this.rideInformation$.pipe(first()).subscribe((ride) => {
        if (ride && ride.carriages.length > 0) {
          const [carriage] = ride.carriages;
          this.selectedCarriage = carriage;
          this.calculateOccupiedSeats(ride);
          this.calculateAvailableSeatsCount(ride);
        }
      });
    }
  }

  protected showDialog(event: Event): void {
    event.stopPropagation();
    this.withRideInfo((rideInfo) => {
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
            rideId: rideInfo.rideId,
          } as RouteModalData,
        })
        .subscribe();
    });
  }

  protected goBack(): void {
    this.location.back();
  }

  onCarriageSelected(carriage: string): void {
    this.selectedCarriage = carriage;
  }

  onSeatSelected(seatIndex: number, carriageIndex: number): void {
    this.selectedSeatIndex = seatIndex;
    this.selectedCarriageIndex = carriageIndex;

    this.selectedSeat = this.calculateAbsoluteSeatIndex(carriageIndex, seatIndex);
    this.withRideInfo((rideInfo) => {
      this.selectedOrderCarriage = rideInfo.carriages[carriageIndex] || null;
    });
  }

  private withRideInfo(callback: (rideInfo: IRideInformation) => void): void {
    this.rideInformation$.pipe(take(1)).subscribe((rideInfo) => {
      if (rideInfo) {
        callback(rideInfo);
      }
    });
  }

  getCarriageData(carriageCode: string): ICarriage {
    let carriageData: ICarriage | undefined;
    this.carriagesList$.pipe(take(1)).subscribe((carriages) => {
      carriageData = carriages.find((carriage) => carriage.code === carriageCode);
    });
    return carriageData || { code: 'unknown', name: 'Unknown Carriage', rows: 0, leftSeats: 0, rightSeats: 0 };
  }

  private calculateAbsoluteSeatIndex(carriageIndex: number, seatIndex: number): number {
    let seatOffset = 0;
    this.withRideInfo((ride) => {
      for (let i = 0; i < carriageIndex; i += 1) {
        const carriageData = this.getCarriageData(ride.carriages[i]);
        seatOffset += carriageData.rows * (carriageData.leftSeats + carriageData.rightSeats);
      }
      this.selectedSeat = seatOffset + seatIndex;
    });
    return this.selectedSeat!;
  }

  private calculateAvailableSeatsCount(ride: IRideInformation): void {
    this.availableSeatsCount = this.calculateTotalSeats(ride) - this.occupiedSeats.length;
  }

  private calculateTotalSeats(ride: IRideInformation): number {
    return ride.carriages.reduce((totalSeats, carriageCode) => {
      const carriageData = this.getCarriageData(carriageCode);
      return totalSeats + carriageData.rows * (carriageData.leftSeats + carriageData.rightSeats);
    }, 0);
  }

  getAvailableSeatsCountForCarriage(carriageCode: string): number {
    let totalAvailableSeats = 0;
    let seatOffset = 0;

    this.withRideInfo((ride) => {
      ride.carriages.forEach((code) => {
        const carriageData = this.getCarriageData(code);
        const carriageSeatsCount = carriageData.rows * (carriageData.leftSeats + carriageData.rightSeats);

        if (code === carriageCode) {
          const occupiedSeatsForThisCarriage = this.occupiedSeats
            .filter((seat) => seat > seatOffset && seat <= seatOffset + carriageSeatsCount)
            .map((seat) => seat - seatOffset);

          totalAvailableSeats += carriageSeatsCount - occupiedSeatsForThisCarriage.length;
        }

        seatOffset += carriageSeatsCount;
      });
    });

    return totalAvailableSeats;
  }

  bookSeat(): void {
    if (this.selectedSeat !== null && this.selectedCarriage && this.rideInformation$) {
      this.withRideInfo((rideInfo) => {
        const orderRequest: IOrderCreateRequest = {
          rideId: rideInfo.rideId,
          seat: this.selectedSeat!,
          stationStart: this.stationStart,
          stationEnd: this.stationEnd,
        };

        this.orderService.createOrder(orderRequest).subscribe({
          next: () => {
            this.bookingSuccess = true;
            this.selectedSeat = null;
          },
          error: (errorResponse) => {
            if (errorResponse.status === 400 && errorResponse.error?.reason === 'alreadyBooked') {
              this.bookingError = true;
              this.errorMessage = errorResponse.error.message;
              this.selectedSeat = null;
            } else if (errorResponse.status === 401 && errorResponse.error?.reason === 'invalidAccessToken') {
              this.router.navigate(['/signin']);
            } else {
              console.error('Unexpected booking error:', errorResponse);
            }
          },
        });
      });
    }
  }

  private calculateOccupiedSeats(rideInfo: IRideInformation): void {
    this.occupiedSeats = rideInfo.schedule.segments.reduce((seats, segment) => {
      return [...seats, ...segment.occupiedSeats];
    }, [] as number[]);
    this.occupiedSeats = Array.from(new Set(this.occupiedSeats));
  }

  getOccupiedSeatsForCarriage(carriageIndex: number): number[] {
    let seatOffset = 0;
    let carriageSeatsCount = 0;
    let occupiedSeatsForCarriage: number[] = [];

    this.withRideInfo((ride) => {
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
}
