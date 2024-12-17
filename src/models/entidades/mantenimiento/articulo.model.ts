import { ICombo, IMoneda } from "../../global";
import { ILinea } from "./linea.model";

export interface IArticulo {
  id: string;
  codigoBarras: string | null;
  descripcion: string;
  farmacologiaId: string;
  tipoProductoId: string;
  grupoFarmacologicoId: string;
  unidadMedidaId: string;
  unidadMedidaAlternaId: string;
  lineaId: string;
  unidadesPorCaja: number;
  factor: number;
  peso: number;
  stockMinimo: number;
  stockMaximo: number;
  tieneIGVCompra: boolean;
  tieneIGVVenta: boolean;
  monedaId: string;
  situacion: string | null;
  ubicacionSFC: string | null;
  registroSanitario: string | null;
  controlarStock: boolean;
  ventaConReceta: boolean;

  costoCompra: number;
  precioCompra: number;
  porcUtilidad: number;
  precioVenta: number;
  dsctoMaximo: number;
  precioSugPublico: number;
  porcDsctoCaja: number;
  porcDsctoUnidad: number;
  precioDsctoCaja: number;
  precioDsctoUnidad: number;
}

export const defaultArticulo: IArticulo = {
  id: "",
  codigoBarras: null,
  descripcion: "",
  farmacologiaId: "",
  tipoProductoId: "",
  grupoFarmacologicoId: "",
  unidadMedidaId: "",
  unidadMedidaAlternaId: "",
  lineaId: "",
  unidadesPorCaja: 1,
  peso: 0,
  tieneIGVCompra: true,
  tieneIGVVenta: true,
  monedaId: "",
  situacion: null,
  registroSanitario: null,
  controlarStock: true,
  ventaConReceta: false,
  
  //Campos fijos
  factor: 1,
  stockMinimo: 0,
  stockMaximo: 0,
  ubicacionSFC: null,
  //Campos fijos

  //Presentacion General
  costoCompra: 0,
  precioCompra: 0,
  porcUtilidad: 0,
  precioVenta: 0,
  dsctoMaximo: 0,
  precioSugPublico: 0,
  porcDsctoCaja: 0,
  porcDsctoUnidad: 0,
  precioDsctoCaja: 0,
  precioDsctoUnidad: 0,
  //Presentacion General
};

export interface IArticuloTablas {
  farmacologias: ICombo[];
  gruposFarmacologicos: ICombo[];
  lineas: ILinea[];
  monedas: IMoneda[];
  unidadesMedida: ICombo[];
  situaciones: ICombo[];
  tiposProducto: ICombo[];
}

export const defaultArticuloTablas: IArticuloTablas = {
  farmacologias: [],
  gruposFarmacologicos: [],
  lineas: [],
  monedas: [],
  unidadesMedida: [],
  situaciones: [],
  tiposProducto: [],
};

export interface IArticuloFilter {
  id: string;
  descripcion: string;
}

export const defaultArticuloFilter: IArticuloFilter = {
  id: "",
  descripcion: "",
};

export interface IArticuloTable {
  id: string;
  descripcion: string;
  factor: number;
  unidadesPorCaja: number;
  farmacologiaNombre: string;
  unidadMedidaDescripcion: string;
  tipoProductoDescripcion: string;
}
