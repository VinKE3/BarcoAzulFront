import { IGlobalContext } from "../context";
import { ModalCrudType, ModalIdType, ModalPropType } from "../types";

export interface IGetIsPermitidoParams {
  globalContext: IGlobalContext;
  accion: ModalCrudType;
  modalProp?: ModalPropType;
  id?: ModalIdType;
  menu?: string;
}
