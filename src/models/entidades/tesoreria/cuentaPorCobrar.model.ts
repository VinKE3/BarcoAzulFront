import { format, startOfMonth } from "date-fns";
import { IMoneda } from "../../global";
import { ICuentaBancaria, ITipoPago } from "../mantenimiento";
import { ICobro } from "./cobro.model";

export interface ICuentaPorCobrar {
  id: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  fechaEmision: string;
  fechaVencimiento: string;
  clienteId: string;
  clienteNombre: string;
  clienteDireccion: string;
  tipoVentaId: string;
  tipoPagoId: string;
  observacion: string | null;
  almacenId: string;
  montoIGV: number;
  porcentajeIGV: number;
  totalOperacionesInafectas: number;
  totalOperacionesGratuitas: number;
  totalPago: number;
  total: number;
  pedidoId: string;
  tipoId: string;
  proveedorId: string;
  vendedorId: string;
  horaEmision: string;
  usarCodigoBarras: boolean;
  detalles: null;
  cobros: ICobro[];
  documentoReferenciaId: string | null;
  documentoReferencia: string;
  fechaDocumentoReferencia: string | null;
  motivoNotaId: string | null;
  motivoSustento: string | null;
  numeroDocumento: string | null;

  //Adicional
  abonado: number;
  saldo: number;
  //Adicional
}

export const defaultCuentaPorCobrar: ICuentaPorCobrar = {
  id: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  fechaVencimiento: format(new Date(), "yyyy-MM-dd"),
  clienteId: "",
  clienteNombre: "",
  clienteDireccion: "",
  tipoVentaId: "",
  tipoPagoId: "",
  observacion: null,
  almacenId: "",
  montoIGV: 0,
  porcentajeIGV: 0,
  totalOperacionesInafectas: 0,
  totalOperacionesGratuitas: 0,
  totalPago: 0,
  total: 0,
  pedidoId: "",
  tipoId: "",
  proveedorId: "",
  vendedorId: "",
  horaEmision: "",
  usarCodigoBarras: false,
  detalles: null,
  cobros: [],
  documentoReferenciaId: null,
  documentoReferencia: "",
  fechaDocumentoReferencia: null,
  motivoNotaId: "",
  motivoSustento: "",
  numeroDocumento: null,

  //Adicional
  abonado: 0,
  saldo: 0,
  //Adicional
};

export interface ICuentaPorCobrarTablas {
  tiposPago: ITipoPago[];
  monedas: IMoneda[];
  cuentasBancarias: ICuentaBancaria[];
}

export const defaultCuentaPorCobrarTablas: ICuentaPorCobrarTablas = {
  tiposPago: [],
  monedas: [],
  cuentasBancarias: [],
};

export interface ICuentaPorCobrarFilter {
  clienteNombre: string;
  numeroDocumento: string;
  fechaInicio: string;
  fechaFin: string;
  filtro: string;
}

export const defaultCuentaPorCobrarFilter: ICuentaPorCobrarFilter = {
  clienteNombre: "",
  numeroDocumento: "",
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  filtro: "",
};

export interface ICuentaPorCobrarTable {
  abonado: number;
  clienteNombre: string;
  fechaEmision: string;
  id: string;
  isCancelado: boolean;
  monedaId: string;
  numeroDocumento: string;
  ruc: string;
  saldo: number;
  total: number;
}

export interface ICuentaPorCobrarModalTable {
  afectarCaja: boolean;
  clienteId: string;
  cuentaBancariaId: string | null;
  cuentaBancariaDescripcion: string;
  fechaCobro: string;
  item: number;
  monedaId: string;
  montoPEN: number;
  montoUSD: number;
  numero: string;
  observacion: string | null;
  pedirCuentaBancaria: boolean;
  proveedorId: string;
  serie: string;
  tipoCambio: number;
  tipoCobroDescripcion: string;
  tipoCobroId: string;
  tipoDocumentoId: string;
  tipoId: string;
}
