export interface IConceptoFindModal {
  inputFocus: string;
}

export interface IConceptoFindFilter {
  numeroDocumento: string;
  tipoDocumentoId: string;
  proveedorId?: string;
  clienteId?: string;
}

export const defaultConceptoFindFilter: IConceptoFindFilter = {
  numeroDocumento: "",
  tipoDocumentoId: "",
  proveedorId: "",
  clienteId: "",
};

export interface IConceptoFind extends IConceptoFindTable {
  origen: string;
}

export interface IConceptoFindTable {
  id: string;
  fechaEmision: string;
  numeroDocumento: string;
  descripcion: string;
  monedaId: string;
  saldo: number;
}
