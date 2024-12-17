import { format } from "date-fns";
import { ModalCrudType } from "../../types";

export interface ICobro {
  tipoId: string | null;
  item: number;
  fechaCobro: string;
  tipoCobroId: string;
  cuentaBancariaId: number | null;
  observacion: string | null;
  monedaId: string;
  tipoCambio: number;
  montoPEN: number;
  montoUSD: number;
  pedirCuentaBancaria: boolean;

  //CuentaPorCobrar
  tipoDocumentoId: string | null;
  proveedorId: string | null;
  clienteId: string | null;
  serie: string | null;
  numero: string | null;
  afectarCaja: boolean;
  //CuentaPorCobrar

  //Adicionales
  tipoModal: ModalCrudType;
  tipoCobroDescripcion: string;
  cuentaBancariaDescripcion: string;
  montoLocal: number;
  montoPagado: number; //Calculo de totales
  montoPendiente: number; //Calculo de totales
  //Adicionales
}

export const defaultCobro: ICobro = {
  tipoId: null,
  item: 0,
  fechaCobro: format(new Date(), "yyyy-MM-dd"),
  tipoCobroId: "",
  cuentaBancariaId: null,
  observacion: null,
  monedaId: "",
  tipoCambio: 0,
  montoLocal: 0,
  montoPEN: 0,
  montoUSD: 0,
  pedirCuentaBancaria: false,

  //CuentaPorCobrar
  tipoDocumentoId: null,
  proveedorId: null,
  clienteId: null,
  serie: null,
  numero: null,
  afectarCaja: false,
  //CuentaPorCobrar

  //Adicionales
  tipoModal: "registrar",
  tipoCobroDescripcion: "",
  cuentaBancariaDescripcion: "",
  montoPagado: 0,
  montoPendiente: 0,
  //Adicionales
};
