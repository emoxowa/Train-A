import { StationData } from './station-data.model';
import { Route } from './route.model';

export interface SearchResponse {
  from: StationData;
  to: StationData;
  routes: Route[];
}

export const searchResponse: SearchResponse = {
  from: {
    stationId: 1,
    city: 'City45',
    geolocation: { latitude: 55.7558, longitude: 37.6173 },
  },
  to: {
    stationId: 2,
    city: 'City102',
    geolocation: { latitude: 40.7128, longitude: -74.006 },
  },
  routes: [
    {
      id: 1,
      path: [1, 2],
      carriages: ['1st class', '2nd class'],
      schedule: [
        {
          rideId: 101,
          segments: [
            {
              time: ['2024-08-13T16:30:00Z', '2024-08-13T22:26:00Z'],
              price: { '1st class': 731, '2nd class': 498 },
              occupiedSeats: [1, 2, 3],
            },
          ],
          time: ['2024-08-13T16:30:00Z', '2024-08-13T22:26:00Z'],
          price: { '1st class': 731, '2nd class': 498 },
          occupiedSeats: [1, 2, 3],
        },
      ],
    },
    {
      id: 2,
      path: [1, 2],
      carriages: ['Women-only'],
      schedule: [
        {
          rideId: 102,
          segments: [
            {
              time: ['2024-08-13T19:05:00Z', '2024-08-14T02:23:00Z'],
              price: { 'Women-only': 586 },
              occupiedSeats: [4],
            },
          ],
          time: ['2024-08-13T19:05:00Z', '2024-08-14T02:23:00Z'],
          price: { 'Women-only': 586 },
          occupiedSeats: [4],
        },
      ],
    },
  ],
};
