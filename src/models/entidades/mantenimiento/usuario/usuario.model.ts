import { ICombo } from "../../../global";

export interface IUsuario {
  id: string;
  nick: string;
  tipoUsuarioId: string;
  observacion: string | null;
  isActivo: boolean;
  vendedorId: string | null;
  clave: string;
  claveConfirmacion: string;
  puntoVentaId: string;
  bloquearPrecioEnVentas: boolean;
  bloquearCampoAlmacen: boolean;
  bloquearFechaEmision: boolean;
}

export const defaultUsuario: IUsuario = {
  id: "",
  nick: "",
  tipoUsuarioId: "NO", //Usuario no configurado
  observacion: null,
  isActivo: true,
  vendedorId: null,
  clave: "",
  claveConfirmacion: "",
  puntoVentaId: "",
  bloquearCampoAlmacen: false,
  bloquearPrecioEnVentas: false,
  bloquearFechaEmision: false,
};

export interface IUsuarioTablas {
  vendedores: ICombo[];
  tiposUsuario: ICombo[];
  puntosVenta: ICombo[];
}

export const defaultUsuarioTablas: IUsuarioTablas = {
  vendedores: [],
  tiposUsuario: [],
  puntosVenta: [],
};



export interface IUsuarioFilter {
  nick: string;
}

export const defaultUsuarioFilter: IUsuarioFilter = {
  nick: "",
};

export interface IUsuarioTable {
  id: string;
  isActivo: boolean;
  nick: string;
  tipoUsuarioId: string;
}
