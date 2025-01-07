import { format } from "date-fns";
import {
  defaultDocumentoFilter,
  ICombo,
  IDocumentoFilter,
  ISerie,
} from "../../global";
import { CrudType } from "../../types";
import { IClientePersonal, IPersonal } from "..";

export interface IEntradaAlmacen {
  empresaId: string;
  proveedorId: string | null;
  tipoDocumentoId: string | null;
  serie: string;
  numero: string;
  clienteId: string | null;
  proveedorNumeroDocumentoIdentidad: string | null;
  proveedorNombre: string | null;
  proveedorDireccion: string | null;
  personalId: string | null;
  fechaEmision: string;
  monedaId: string | null;
  tipoCambio: number;
  numeroOP: string | null;
  observacion: string | null;
  detalles: IEntradaAlmacenDetalle[];
}

export const defaultEntradaAlmacen: IEntradaAlmacen = {
  empresaId: "",
  proveedorId: null,
  tipoDocumentoId: null,
  serie: "",
  numero: "",
  clienteId: null,
  proveedorNumeroDocumentoIdentidad: null,
  proveedorNombre: null,
  proveedorDireccion: null,
  personalId: null,
  fechaEmision: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
  monedaId: null,
  tipoCambio: 0,
  numeroOP: null,
  observacion: null,
  detalles: [],
};

export interface IEntradaAlmacenDetalle {
  detalleId: number;
  lineaId: string | null;
  subLineaId: string | null;
  articuloId: string;
  unidadMedidaId: string | null;
  marcaId: number;
  descripcion: string;
  codigoBarras: string | null;
  cantidad: number;
  precioUnitario: number;
  subTotal: number;
  montoIGV: number;
  importe: number;
  presentacion: string | null;
  unidadMedidaDescripcion: string | null;
}

export const defaultEntradaAlmacenDetalle: IEntradaAlmacenDetalle = {
  detalleId: 0,
  lineaId: null,
  subLineaId: null,
  articuloId: "",
  unidadMedidaId: null,
  marcaId: 0,
  descripcion: "",
  codigoBarras: null,
  cantidad: 0,
  precioUnitario: 0,
  subTotal: 0,
  montoIGV: 0,
  importe: 0,
  presentacion: null,
  unidadMedidaDescripcion: null,
};

export interface IAlmacenPersonal {
  id: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  numeroDocumentoIdentidad: string;
  cargoDescripcion: string;
  isActivo: boolean;
}

export const defaultAlmacenPersonal: IAlmacenPersonal = {
  id: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  nombres: "",
  numeroDocumentoIdentidad: "",
  cargoDescripcion: "",
  isActivo: false,
};

export interface IEntradaAlmacenTablas {
  personal: IAlmacenPersonal[];
}

export const defaultEntradaAlmacenTablas: IEntradaAlmacenTablas = {
  personal: [],
};

export interface IEntradaAlmacenFilter extends IDocumentoFilter {
  observacion: string;
}

export const defaultEntradaAlmacenFilter: IEntradaAlmacenFilter = {
  ...defaultDocumentoFilter,
  observacion: "",
};

export interface IEntradaAlmacenTable {
  empresaId: string;
  fechaEmision: string;
  id: string;
  numeroDocumento: string;
  proveedorNombre: string;
  tipoDocumentoDescripcion: string;
}
