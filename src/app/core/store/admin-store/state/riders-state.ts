import { IRideInfo } from '@app/admin/models/route-info.module';

export interface IRiderState {
  riderList: IRideInfo;
}

export const initionalRiderState: IRiderState = {
  riderList: {
    id: 0,
    path: [],
    carriages: [],
    schedule: [],
  },
};
