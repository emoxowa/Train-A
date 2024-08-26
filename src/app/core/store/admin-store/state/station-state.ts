import { IStationList } from '@app/admin/models/station-list.model';

export interface IStationState {
  stationList: IStationList[];
  deletingIndicate: boolean;
  creatingIndicate: boolean;
}

export const initionalStationState: IStationState = {
  stationList: [],
  deletingIndicate: false,
  creatingIndicate: false,
};
