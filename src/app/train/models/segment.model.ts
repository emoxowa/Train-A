export interface ISegment {
  time: [string, string];
  price: { [key: string]: number };
  occupiedSeats: number[];
}
