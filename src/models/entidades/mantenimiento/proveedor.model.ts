import { ICombo } from "../../global";

export interface IProveedor {
  id: string;
  tipoDocumentoIdentidadId: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  telefono: string | null;
  direccion: string | null;
  farmaciaCodigo: string | null;
  vendedor: string | null;
  supervisor: string | null;
  representante: string | null;
}

export const defaultProveedor: IProveedor = {
  id: "",
  tipoDocumentoIdentidadId: "",
  numeroDocumentoIdentidad: "",
  nombre: "",
  telefono: null,
  direccion: null,
  farmaciaCodigo: null,
  vendedor: null,
  supervisor: null,
  representante: null,
};

export interface IProveedorTablas {
  tiposDocumentoIdentidad: ICombo[];
}

export const defaultProveedorTablas: IProveedorTablas = {
  tiposDocumentoIdentidad: [],
};

export interface IProveedorFilter {
  numeroDocumentoIdentidad: string;
  nombre: string;
}

export const defaultProveedorFilter: IProveedorFilter = {
  numeroDocumentoIdentidad: "",
  nombre: "",
};

export interface IProveedorTable {
  id: string;
  nombre: string;
  numeroDocumentoIdentidad: string;
  telefono: string;
}
