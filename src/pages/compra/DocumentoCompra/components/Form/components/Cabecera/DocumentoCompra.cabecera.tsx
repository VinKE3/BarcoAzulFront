import { ChangeEvent, useState } from "react";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { useGlobalContext } from "../../../../../../../hooks";
import {
  ICombo,
  IMoneda,
  IDocumentoCompra,
  IDocumentoCompraTablas,
  ITiposPago,
  defaultDocumentoCompraTablas,
  IDocumentoCompraPorcentajes,
  IMotivosNota,
  IDocumentoCompraCuentaCorriente,
  IPorcentajes,
} from "../../../../../../../models";
import { handleHelpModal } from "../../../../../../../util";
import { FaMoneyBillTransfer } from "react-icons/fa6";

interface IProps {
  data: IDocumentoCompra;
  handleData: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
  handleGetTipoCambio: (retorno: boolean) => Promise<number>;
}
const DocumentoCompraCabecera: React.FC<IProps> = ({
  data,
  handleData,
  handleGetTipoCambio,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form, extra } = globalContext;
  const { primer } = modal;
  const {
    tiposDocumento,
    tiposCompra,
    tiposPago,
    monedas,
    porcentajesIGV,
    porcentajesPercepcion,
    motivosNota,
    cuentasCorriente,
  }: IDocumentoCompraTablas = form.tablas || defaultDocumentoCompraTablas;
  const { inputs } = extra.element;

  const [filteredTiposPago, setFilteredTiposPago] = useState(tiposPago);

  console.log(tiposCompra, "tipoCompra");
  console.log(tiposPago, "tipoPago");

  const simulateChangeEvent = (
    name: string,
    value: string
  ): React.ChangeEvent<HTMLSelectElement> => {
    return {
      target: { name, value } as EventTarget & HTMLSelectElement,
    } as React.ChangeEvent<HTMLSelectElement>;
  };

  // Manejar el cambio de tipoCompra
  const handleTipoCompraChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTipoCompraId = event.target.value;

    handleData(event); // Actualiza el estado global

    // Filtrar tiposPago según tipoCompraId
    const pagosFiltrados = tiposPago.filter(
      (pago) => pago.tipoVentaCompraId === selectedTipoCompraId
    );
    setFilteredTiposPago(pagosFiltrados);

    // Resetear el valor del tipoPago
    handleData(simulateChangeEvent("tipoPagoId", ""));
  };

  // Manejar el cambio de tipoPago
  const handleTipoPagoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTipoPagoId = event.target.value;

    handleData(event); // Actualiza el estado global

    // Encontrar el plazo del tipoPago seleccionado
    const tipoPagoSeleccionado = tiposPago.find(
      (pago) => pago.id === selectedTipoPagoId
    );
    const plazo = tipoPagoSeleccionado?.plazo || 0;

    // Calcular la nueva fecha de vencimiento
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + plazo);
    const nuevaFechaVencimiento = fechaActual.toISOString().split("T")[0];

    handleData(simulateChangeEvent("fechaVencimiento", nuevaFechaVencimiento));
  };
  //#endregion

  //#region Funciones
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;

    e.stopPropagation();
    handleHelpModal(setGlobalContext, "proveedorFind");
  };
  //#endregion
  return (
    <div className="form-base-container documento-compra-form">
      <div className="modal-base-content">
        <div className="input-base-row">
          <div className="input-base-container-20">
            <label htmlFor="id" className="label-base">
              Documento N°
            </label>
            <input
              id="id"
              name="id"
              placeholder="Documento N°"
              value={data.id ?? ""}
              disabled
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="tipoDocumentoId" className="label-base">
              Documento
            </label>
            <select
              ref={inputs["tipoDocumentoId"]}
              id="tipoDocumentoId"
              name="tipoDocumentoId"
              value={data.tipoDocumentoId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposDocumento.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="serie" className="label-base">
              Serie
            </label>
            <input
              id="serie"
              name="serie"
              value={data.serie}
              placeholder="Serie"
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="numero" className="label-base">
              Número
            </label>
            <input
              id="numero"
              name="numero"
              value={data.numero}
              placeholder="Número"
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="fechaEmision" className="label-base">
              F. Emisión
            </label>
            <input
              type="date"
              id="fechaEmision"
              name="fechaEmision"
              value={data.fechaEmision}
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="fechaContable" className="label-base">
              F. Contable
            </label>
            <input
              type="date"
              id="fechaContable"
              name="fechaContable"
              value={data.fechaContable}
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="fechaVencimiento" className="label-base">
              F. Vencimiento
            </label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              value={data.fechaVencimiento}
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-container-100">
          <label htmlFor="proveedorNombre" className="label-base">
            Proveedor
          </label>
          <div className="input-base-container-button">
            <input
              id="proveedorNombre"
              name="proveedorNombre"
              placeholder="Proveedor"
              value={data.proveedorNombre ?? ""}
              disabled
              className={
                primer.tipo !== "registrar" ? "input-base" : "input-base-button"
              }
            />
            {primer.tipo === "registrar" && (
              <button
                ref={inputs["buttonProveedorFind"]}
                id="buttonProveedorFind"
                name="buttonProveedorFind"
                title="Presione [ALT + C] para adjuntar proveedor."
                accessKey="c"
                onClick={() =>
                  handleHelpModal(setGlobalContext, "proveedorFind")
                }
                onKeyDown={handleKeyDown}
                className="button-base-anidado button-base-bg-primary"
              >
                <TbDeviceIpadSearch
                  strokeWidth={2}
                  size="2rem"
                  className="button-base-icon"
                />
              </button>
            )}
          </div>
        </div>
        <div className="input-base-container-100">
          <label htmlFor="proveedorDireccion" className="label-base">
            Dirección
          </label>
          <input
            id="proveedorDireccion"
            name="proveedorDireccion"
            value={data.proveedorDireccion}
            placeholder="Dirección"
            onChange={handleData}
            autoFocus
            disabled={primer.tipo === "consultar" || data.detalles.length > 0}
            className="input-base"
          />
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="tipoCompraId" className="label-base">
              Tipo Compra
            </label>
            <select
              ref={inputs["tipoCompraId"]}
              id="tipoCompraId"
              name="tipoCompraId"
              value={data.tipoCompraId ?? ""}
              onChange={handleTipoCompraChange}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposCompra.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="tipoPagoId" className="label-base">
              Tipo Pago
            </label>
            <select
              ref={inputs["tipoPagoId"]}
              id="tipoPagoId"
              name="tipoPagoId"
              value={data.tipoPagoId ?? ""}
              onChange={handleTipoPagoChange}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {filteredTiposPago.map((x: ITiposPago) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="monedaId" className="label-base">
              Moneda
            </label>
            <select
              id="monedaId"
              name="monedaId"
              value={data.monedaId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {monedas.map((x: IMoneda) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="tipoCambio" className="label-base">
              Tipo de Cambio
            </label>
            <div className="input-base-container-button">
              <input
                type="number"
                inputMode="numeric"
                ref={inputs["tipoCambio"]}
                id="tipoCambio"
                name="tipoCambio"
                value={data.tipoCambio}
                disabled
                className={
                  primer.tipo !== "consultar" && !api.loading
                    ? "input-base-button"
                    : "input-base"
                }
              />
              {primer.tipo !== "consultar" && !api.loading && (
                <button
                  id="buttonConsultarTipoCambio"
                  name="buttonConsultarTipoCambio"
                  title="Presione [ALT + Z] para consultar a SUNAT."
                  accessKey="z"
                  onClick={() => handleGetTipoCambio(false)}
                  onKeyDown={handleKeyDown}
                  disabled={data.detalles.length > 0}
                  className="button-base-anidado button-base-bg-primary"
                >
                  <FaMoneyBillTransfer
                    strokeWidth={2}
                    size="2rem"
                    className="button-base-icon"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="input-base-container-100">
          <label htmlFor="guiaRemision" className="label-base">
            Guía Remisión
          </label>
          <input
            id="guiaRemision"
            name="guiaRemision"
            value={data.guiaRemision}
            placeholder="Dirección"
            onChange={handleData}
            autoFocus
            disabled={primer.tipo === "consultar" || data.detalles.length > 0}
            className="input-base"
          />
        </div>
        <div className="input-base-container-100">
          <label htmlFor="observacion" className="label-base">
            Observación
          </label>
          <input
            id="observacion"
            name="observacion"
            value={data.observacion}
            placeholder="Dirección"
            onChange={handleData}
            autoFocus
            disabled={primer.tipo === "consultar" || data.detalles.length > 0}
            className="input-base"
          />
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="subTotal" className="label-base">
              SubTotal
            </label>
            <input
              id="subTotal"
              name="subTotal"
              value={data.subTotal}
              placeholder="Dirección"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="porcentajeIGV" className="label-base">
              IGV
            </label>
            <select
              ref={inputs["porcentajeIGV"]}
              id="porcentajeIGV"
              name="porcentajeIGV"
              value={data.porcentajeIGV ?? ""}
              onChange={handleTipoCompraChange}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {porcentajesIGV.map((x: IPorcentajes) => (
                <option key={x.porcentaje} value={x.porcentaje}>
                  {x.porcentaje}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentoCompraCabecera;
