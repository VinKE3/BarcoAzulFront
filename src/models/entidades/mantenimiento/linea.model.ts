export interface ILinea {
  id: string;
  codigoInterno: string | null;
  descripcion: string;
  direccion: string | null;
  telefono: string | null;
  contacto: string | null;
  fechaUltimaLista: string | null;
}

export const defaultLinea: ILinea = {
  id: "",
  codigoInterno: null,
  descripcion: "",
  direccion: null,
  telefono: null,
  contacto: null,
  fechaUltimaLista: null,
};

export interface ILineaFilter {
  descripcion: string;
}

export const defaultLineaFilter: ILineaFilter = {
  descripcion: "",
};

export interface ILineaTable {
  codigoInterno: string;
  descripcion: string;
  id: string;
}
