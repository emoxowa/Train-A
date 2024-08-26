import { ICarriagesType } from '@app/admin/models/create-new-carriage-type.model';

export interface ICarriageState {
  carriageList: ICarriagesType[];
}

export const initionalCarriageState: ICarriageState = {
  carriageList: [],
};
