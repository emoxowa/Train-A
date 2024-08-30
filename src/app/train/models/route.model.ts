import { ISchedule } from './schedule.model';

export interface IRoute {
  id: number;
  path: number[];
  carriages: string[];
  schedule: ISchedule[];
}
