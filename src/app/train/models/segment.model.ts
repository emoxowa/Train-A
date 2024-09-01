export interface ISegment {
  time: [string, string];
  price: Record<string, number>;
  occupiedSeats: number[];
}
