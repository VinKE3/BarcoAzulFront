import { ModalCrudType, ModalIdType } from "../../../types";

export interface IModal {
  tipo: ModalCrudType;
  id: ModalIdType;
  isTablas?: boolean;
  isPermitido?: boolean;
}

export const defaultModal: IModal = {
  tipo: null,
  id: null,
  isTablas: false,
  isPermitido: false,
};

export interface ISubModal {
  id: ModalIdType;
  menu: string;
}
