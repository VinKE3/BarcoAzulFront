import { ICombo } from "../../global";

export interface ICorrelativo {
  id: string;
  numero: number;
  puntoVentaId: string;
  serie: string;
  tipoDocumentoId: string;
  tipoDocumentoDescripcion: string | null;
}

export const defaultCorrelativo: ICorrelativo = {
  id: "",
  tipoDocumentoId: "",
  tipoDocumentoDescripcion: null,
  serie: "",
  numero: 0,
  puntoVentaId: "",
};

export interface ICorrelativoTablas {
  tiposDocumento: ICombo[];
}
export const defaultCorrelativoTablas: ICorrelativoTablas = {
  tiposDocumento: [],
};
