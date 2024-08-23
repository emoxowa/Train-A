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
    stationId: 3,
    city: 'City102',
    geolocation: { latitude: 40.7128, longitude: -74.006 },
  },
  routes: [
    {
      id: 1,
      path: [1, 2, 3],
      carriages: ['1st class', '2nd class'],
      schedule: [
        {
          rideId: 101,
          segments: [
            {
              time: ['2024-08-13T17:30:00Z', '2024-08-13T17:35:00Z'],
              price: { '1st class': 300, '2nd class': 200 },
              occupiedSeats: [1, 2, 3],
            },
            {
              time: ['2024-08-13T18:40:00Z', '2024-08-13T19:00:00Z'],
              price: { '1st class': 400, '2nd class': 250 },
              occupiedSeats: [4, 5, 6],
            },
            {
              time: ['2024-08-13T19:05:00Z', '2024-08-13T20:00:00Z'],
              price: { '1st class': 500, '2nd class': 300 },
              occupiedSeats: [7, 8, 9],
            },
          ],
          time: ['2024-08-13T16:30:00Z', '2024-08-14T18:00:00Z'],
          price: { '1st class': 1200, '2nd class': 750 },
          occupiedSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
      ],
    },
    {
      id: 2,
      path: [1, 3],
      carriages: ['Women-only'],
      schedule: [
        {
          rideId: 102,
          segments: [
            {
              time: ['2024-08-13T20:05:00Z', '2024-08-13T20:10:00Z'], // 5 минут
              price: { 'Women-only': 586 },
              occupiedSeats: [4],
            },
            {
              time: ['2024-08-13T23:15:00Z', '2024-08-13T24:00:00Z'], // 1 час 45 минут в пути
              price: { 'Women-only': 600 },
              occupiedSeats: [5],
            },
          ],
          time: ['2024-08-13T19:05:00Z', '2024-08-14T21:00:00Z'],
          price: { 'Women-only': 1186 },
          occupiedSeats: [4, 5],
        },
      ],
    },
  ],
};
