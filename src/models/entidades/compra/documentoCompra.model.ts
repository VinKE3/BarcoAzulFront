import { ICombo } from "../../global";

export interface IDocumentoCompra {
  id: string;
  empresaId: string;
  proveedorId: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  clienteId: string;
  fechaEmision: Date;
  fechaContable: Date;
  fechaVencimiento: Date;
  proveedorNombre: string;
  proveedorNumeroDocumentoIdentidad: string;
  proveedorDireccion: string;
  tipoCompraId: string;
  monedaId: string;
  tipoCambio: number;
  tipoPagoId: string;
  numeroOperacion: string;
  cuentaCorrienteId: string;
  documentoReferenciaId: string;
  abonar: true;
  motivoNotaId: string;
  motivoSustento: string;
  guiaRemision: string;
  observacion: string;
  subTotal: number;
  porcentajeIGV: number;
  montoIGV: number;
  totalNeto: number;
  total: number;
  incluyeIGV: true;
  afectarStock: true;
  detalles: IDocumentoCompraDetalles[];
}

export interface IDocumentoCompraDetalles {
  detalleId: number;
  lineaId: string;
  subLineaId: string;
  articuloId: string;
  unidadMedidaId: string;
  marcaId: number;
  descripcion: string;
  codigoBarras: string;
  cantidad: number;
  precioUnitario: number;
  subTotal: number;
  montoIGV: number;
  importe: number;
  presentacion: string;
  unidadMedidaDescripcion: string;
  cantidadPendiente: number;
}

export const defaultDocumentoCompra: IDocumentoCompra = {
  id: "",
  empresaId: "",
  proveedorId: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  clienteId: "",
  fechaEmision: new Date(),
  fechaContable: new Date(),
  fechaVencimiento: new Date(),
  proveedorNombre: "",
  proveedorNumeroDocumentoIdentidad: "",
  proveedorDireccion: "",
  tipoCompraId: "",
  monedaId: "",
  tipoCambio: 0,
  tipoPagoId: "",
  numeroOperacion: "",
  cuentaCorrienteId: "",
  documentoReferenciaId: "",
  abonar: true,
  motivoNotaId: "",
  motivoSustento: "",
  guiaRemision: "",
  observacion: "",
  subTotal: 0,
  porcentajeIGV: 0,
  montoIGV: 0,
  totalNeto: 0,
  total: 0,
  incluyeIGV: true,
  afectarStock: true,
  detalles: [],
};

export interface IDocumentoCompraFilter {
  proveedor: string;
}

export const defaultDocumentoCompraFilter: IDocumentoCompraFilter = {
  proveedor: "",
};

export interface ITiposPago {
  id: string;
  tipoVentaCompraId: string;
  descripcion: string;
  abreviatura: string;
  plazo: number;
}

export interface IPorcentajes {
  porcentaje: number;
  default: boolean;
}

export interface IMotivosNota {
  id: string;
  tipoDocumentoId: string;
  descripcion: string;
}

export interface IDocumentoCompraCuentaCorriente {
  id: string;
  empresaId: string;
  cuentaCorrienteId: string;
  numero: string;
  entidadBancariaNombre: string;
  entidadBancariaTipo: string;
  tipoCuentaDescripcion: string;
  monedaId: string;
  saldoFinal: number;
}

export interface IDocumentoCompraTablas {
  tiposDocumento: ICombo[];
  tiposCompra: ICombo[];
  tiposPago: ITiposPago[];
  monedas: ICombo[];
  porcentajesIGV: IPorcentajes[];
  porcentajesPercepcion: IPorcentajes[];
  motivosNota: ICombo[];
  cuentasCorriente: IDocumentoCompraCuentaCorriente[];
}

export const defaultDocumentoCompraTablas: IDocumentoCompraTablas = {
  tiposDocumento: [],
  tiposCompra: [],
  tiposPago: [],
  monedas: [],
  porcentajesIGV: [],
  porcentajesPercepcion: [],
  motivosNota: [],
  cuentasCorriente: [],
};

export interface IDocumentoCompraTable {
  id: string;
  fechaContable: string;
  fechaEmision: string;
  numeroDocumento: string;
  proveedorNombre: string;
  proveedorNumero: string;
  monedaId: string;
  total: number;
  isCancelado: boolean;
  isBloqueado: boolean;
  afectarStock: boolean;
}
