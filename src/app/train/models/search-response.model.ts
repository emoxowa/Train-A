import { StationData } from './station-data.model';
import { Route } from './route.model';

export interface SearchResponse {
  from: StationData;
  to: StationData;
  routes: Route[];
}
