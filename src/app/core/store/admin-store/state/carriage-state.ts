import { ICarriage } from '@app/admin/models/create-new-carriage-type.model';

export interface ICarriageState {
  carriageList: ICarriage[];
}

export const initionalCarriageState: ICarriageState = {
  carriageList: [],
};
