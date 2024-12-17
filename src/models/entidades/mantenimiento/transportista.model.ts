import { ICombo } from "../../global";
import { IDepartamento } from "./departamento.model";

export interface ITransportista {
  id: string;
  tipo: string;
  tipoDocumentoIdentidadId: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  apellidos: string | null;
  correoElectronico: string | null;
  direccion: string | null;
  departamentoId: string | null;
  provinciaId: string | null;
  distritoId: string | null;
  licenciaConducir: string | null;
  telefono: string | null;
  numeroRegistroMTC: string | null;
}

export const defaultTransportista: ITransportista = {
  id: "",
  tipo: "",
  tipoDocumentoIdentidadId: "",
  numeroDocumentoIdentidad: "",
  nombre: "",
  apellidos: null,
  correoElectronico: null,
  direccion: null,
  departamentoId: null,
  provinciaId: null,
  distritoId: null,
  licenciaConducir: null,
  telefono: null,
  numeroRegistroMTC: null,
};

export interface ITransportistaTablas {
  departamentos: IDepartamento[];
  vendedores: ICombo[];
  tipos: ICombo[];
  tiposDocumentoIdentidad: ICombo[];
}

export const defaultTransportistaTablas: ITransportistaTablas = {
  departamentos: [],
  vendedores: [],
  tipos: [],
  tiposDocumentoIdentidad: [],
};

export interface ITransportistaFilter {
  numeroDocumentoIdentidad: string;
  nombre: string;
}

export const defaultTransportistaFilter: ITransportistaFilter = {
  numeroDocumentoIdentidad: "",
  nombre: "",
};

export interface ITransportistaTable {
  direccion: string | null;
  id: string;
  nombre: string;
  numeroDocumentoIdentidad: string;
}
