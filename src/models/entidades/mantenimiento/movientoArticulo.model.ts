import { ICombo } from "../../global";

export interface IMovimientoArticulo {
  lineaId: string;
  subLineaId: string;
  articuloId: string;
  codigoBarras: string;
  lineaDescripcion: string;
  subLineaDescripcion: string;
  marcaNombre: string;
  articuloDescripcion: string;
  unidadMedidaAbreviatura: string;
  monedaId: string;
  estadoStock: string;
  stockInicial: number;
  stockMinimo: number;
  stockMaximo: number;
  cantidadEntrada: number;
  cantidadSalida: number;
  saldoFinal: number;
  precio: number;
  total: number;
}

export const defaultMovimientoArticulo: IMovimientoArticulo = {
  lineaId: "",
  subLineaId: "",
  articuloId: "",
  codigoBarras: "",
  lineaDescripcion: "",
  subLineaDescripcion: "",
  marcaNombre: "",
  articuloDescripcion: "",
  unidadMedidaAbreviatura: "",
  monedaId: "",
  estadoStock: "",
  stockInicial: 0,
  stockMinimo: 0,
  stockMaximo: 0,
  cantidadEntrada: 0,
  cantidadSalida: 0,
  saldoFinal: 0,
  precio: 0,
  total: 0,
};

export interface IMovimientoArticuloFilter {
  descripcion: string;
  estadoStock: string;
}

export const defaultMovimientoArticuloFilter: IMovimientoArticuloFilter = {
  descripcion: "",
  estadoStock: "",
};

export interface IMovimientoArticuloTablas {
  formatos: ICombo[];
  estadosStock: ICombo[];
}

export const defaultMovimientoArticuloTablas: IMovimientoArticuloTablas = {
  formatos: [],
  estadosStock: [],
};

export interface IMovimientoArticuloTable {
  estadoStock: string;
  codigoBarras: string;
  subLineaDescripcion: string;
  articuloDescripcion: string;
  unidadMedidaAbreviatura: string;
  stockInicial: number;
  cantidadEntrada: number;
  cantidadSalida: number;
  saldoFinal: number;
}
