import { defaultCliente, defaultProveedor, ICliente, IProveedor } from "../../entidades";

export interface ISimplificado {
  empresaNumeroDocumentoIdentidad: string;
  empresaNombre: string;
  empresaDireccion: string;

  empresaDepartamentoId: string;
  empresaProvinciaId: string;
  empresaDistritoId: string;

  puntoVentaId: string; //Se obtendrá desde el token
  almacenId: string; //Se obtendrá desde el token
  vendedorId: string; //Se obtendrá desde el token

  clienteId: string;
  proveedorId: string;
  monedaId: string;
  porcentajeIGV: number;

  cliente: ICliente;
  proveedor: IProveedor;
}

export const defaultSimplificado: ISimplificado = {
  empresaNumeroDocumentoIdentidad: "",
  empresaNombre: "",
  empresaDireccion: "",
  empresaDepartamentoId: "",
  empresaProvinciaId: "",
  empresaDistritoId: "",

  puntoVentaId: "",
  almacenId: "",
  vendedorId: "",

  clienteId: "",
  proveedorId: "",
  monedaId: "",
  porcentajeIGV: 0,

  cliente: defaultCliente,
  proveedor: defaultProveedor,
};
