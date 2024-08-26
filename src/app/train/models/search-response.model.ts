import { IStation } from '@app/admin/models/station-list.model';
import { Route } from './route.model';

export interface SearchResponse {
  from: IStation;
  to: IStation;
  routes: Route[];
}

export const searchResponse: SearchResponse = {
  from: {
    id: 1,
    city: 'City45',
    latitude: 55.7558,
    longitude: 37.6173,
    connectedTo: [
      {
        id: 2,
        connectedTo: { id: 2, distance: 150 },
        latitude: 55.7558,
        longitude: 37.6173,
      },
      {
        id: 3,
        connectedTo: { id: 3, distance: 300 },
        latitude: 55.7558,
        longitude: 37.6173,
      },
    ],
  },
  to: {
    id: 3,
    city: 'City102',
    latitude: 40.7128,
    longitude: -74.006,
    connectedTo: [
      {
        id: 1,
        connectedTo: { id: 1, distance: 300 },
        latitude: 40.7128,
        longitude: -74.006,
      },
      {
        id: 2,
        connectedTo: { id: 2, distance: 450 },
        latitude: 40.7128,
        longitude: -74.006,
      },
    ],
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
              time: ['2024-08-13T16:30:00Z', '2024-08-13T18:00:00Z'],
              price: { '1st class': 300, '2nd class': 200 },
              occupiedSeats: [1, 2, 3],
            },
            {
              time: ['2024-08-13T18:05:00Z', '2024-08-13T19:30:00Z'],
              price: { '1st class': 400, '2nd class': 250 },
              occupiedSeats: [4, 5, 6],
            },
            {
              time: ['2024-08-13T19:35:00Z', '2024-08-13T22:00:00Z'],
              price: { '1st class': 500, '2nd class': 300 },
              occupiedSeats: [7, 8, 9],
            },
          ],
          time: ['2024-08-13T16:30:00Z', '2024-08-13T22:00:00Z'],
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
              time: ['2024-08-13T19:05:00Z', '2024-08-13T21:00:00Z'],
              price: { 'Women-only': 586 },
              occupiedSeats: [4],
            },
            {
              time: ['2024-08-13T21:05:00Z', '2024-08-14T00:00:00Z'],
              price: { 'Women-only': 600 },
              occupiedSeats: [5],
            },
          ],
          time: ['2024-08-13T19:05:00Z', '2024-08-14T00:00:00Z'],
          price: { 'Women-only': 1186 },
          occupiedSeats: [4, 5],
        },
      ],
    },
  ],
};
