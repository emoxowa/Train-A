interface Route {
    id: number;
    path: number[];
    carriages: string[];
    schedule: Schedule[];
  }
  
  interface Schedule {
    rideId: number;
    segments: Segment[];
    time: [string, string];
    price: Price;
  }
  
  interface Segment {
    distance: number;
  }
  
  interface Price {
    [key: string]: number;
  }
  

