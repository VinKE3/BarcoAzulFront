import { ChangeEvent, useEffect, useState } from "react";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { useFocus, useGlobalContext } from "../../../../hooks";
import {
  ICobro,
  ICobroHelpModal,
  ICombo,
  ICuentaBancaria,
  ICuentaPorCobrar,
  IDocumentoVenta,
  IMensajes,
  IMoneda,
  INotaCredito,
  ITipoPago,
  defaultCobro,
} from "../../../../models";
import {
  handleClearMensajes,
  handleClearModalProp,
  handleFocus,
  handleHelpModal,
  handleInputType,
  handleNumber,
  handleSelectCuentaBancaria,
  handleSetErrorMensaje,
  handleSetInputs,
  handleSetMensajes,
  handleSetTextos,
  post,
  roundNumber,
} from "../../../../util";
import { ButtonGroup } from "../../../ButtonGroup";
import { ButtonFooter } from "../../../Footer";
import { CheckBox } from "../../../Input";
import { BasicKeyHandler } from "../../../Keys";
import { ModalForm } from "../../../Modal";
import { Table } from "../../../Table";
import { DeleteModal } from "../Delete";
import useCobroHelpColumn from "./cobro.column";

const CobroHelpModal: React.FC<ICobroHelpModal> = ({ dataCobro, tablas, handleCobro, isApi = false }) => {
  //#region useState
  const menu: string = "Tesoreria/VentaCobro";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, extra } = globalContext;
  const { element } = extra;
  const { retorno } = form as { retorno: ICobro };
  const { tercer } = modal;

  const [dataGeneral, setDataGeneral] = useState<INotaCredito | ICuentaPorCobrar | IDocumentoVenta>(dataCobro);
  const [data, setData] = useState<ICobro>(defaultCobro);
  const [table, setTable] = useState<ICobro[]>(dataCobro.cobros);
  const { tiposPago, monedas, cuentasBancarias } = tablas;
  const columns = useCobroHelpColumn(dataGeneral.id, isApi);

  const [show, setShow] = useState<boolean>(false);
  const inputs = useFocus("fechaCobro", "montoLocal");
  const footerItems = [
    { text: "TOTAL A PAGAR S/.", value: Number(dataGeneral.total) },
    { text: "TOTAL PAGADO S/.", value: Number(data.montoPagado) },
    { text: "PENDIENTE DE PAGO S/.", value: Number(data.montoPendiente) },
  ];
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleNew();
  }, []);

  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    handleCobro && handleCobro(table);
  }, [table]);

  useEffect(() => {
    setDataGeneral(dataCobro);
    setTable(dataCobro.cobros);
  }, [dataCobro]);

  useEffect(() => {
    dataGeneral.cobros && handleTotales(dataGeneral.cobros);
  }, [dataGeneral.cobros]);

  // useEffect(() => {
  //   show && handleGetTipoCambio();
  // }, [show]);

  useEffect(() => {
    !isApi && retorno && retorno.tipoModal === "eliminar" && handleCrudDetalles(retorno);
  }, [retorno]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };

      switch (name) {
        case "tipoCobroId":
          const tipoPago = tiposPago.find((x: ITipoPago) => x.id === value);
          newData.tipoCobroDescripcion = tipoPago?.descripcion ?? "";
          newData.pedirCuentaBancaria = tipoPago?.pedirCuentaBancaria ?? false;
          break;
        case "cuentaBancariaId":
          const cuentaBancaria = cuentasBancarias.find((x: ICuentaBancaria) => x.id.toString() === value);
          newData.cuentaBancariaDescripcion = cuentaBancaria ? handleSelectCuentaBancaria(cuentaBancaria) : "";
          break;
        default:
          break;
      }

      return newData;
    });
  };

  const handleNew = (): void => {
    setShow(true);
    handleClear();
    handleHelpModal(setGlobalContext, "", "tercer", true);
  };

  const handleClose = (): void => {
    setShow(false);
    handleClear();

    if (!isApi) handleClearMensajes(setGlobalContext);
    handleClearModalProp(setGlobalContext, "tercer");
  };

  // const handleGetTipoCambio = async (focus: boolean = false): Promise<void> => {
  //   const { precioVenta } = await handleTipoCambio(
  //     globalContext,
  //     setGlobalContext,
  //     data.fechaCobro,
  //     inputs,
  //     focus,
  //     "adicional"
  //   );

  //   if (precioVenta === 0) {
  //     return;
  //   }

  //   setData((x) => ({ ...x, tipoCambio: precioVenta }));
  //   focus && handleFocus(inputs["montoLocal"]);
  // };

  const handleCrudDetalles = (detalle: ICobro): void => {
    switch (detalle.tipoModal) {
      case "registrar":
        handleAdd(detalle);
        break;
      case "eliminar":
        handleDelete(detalle);
        break;
      default:
        break;
    }
  };

  const handleAdd = (cobro: ICobro): void => {
    const nuevoDetalleId = table.length + 1;
    setTable((x) => [...x, { ...cobro, item: nuevoDetalleId }]);
  };

  const handleDelete = (cobro: ICobro): void => {
    const existeDetalle = table.find((x) => x.item === cobro.item);

    if (existeDetalle) {
      const nuevosDetalles = table.filter((x) => x.item !== cobro.item);
      const detallesActualizados = nuevosDetalles.map((x, index) => ({
        ...x,
        item: index + 1,
      }));

      setTable(detallesActualizados);
    }
  };

  const handleValidation = async (): Promise<boolean> => {
    await handleClearMensajes(setGlobalContext);

    const textos: string[] = [];

    // Validaciones específicas para el detalle general
    if (!data.tipoCobroId || data.tipoCobroId === "") {
      textos.push("El tipo de cobro es requerido");
    }

    if (!data.monedaId || data.monedaId === "") {
      textos.push("La moneda es requerida");
    }

    // if (!data.tipoCambio || data.tipoCambio <= 0) {
    //   textos.push("El tipo de cambio debe ser mayor que 0");
    // }

    if (!data.montoLocal || data.montoLocal <= 0) {
      textos.push("El monto debe ser mayor que 0");
    }

    const montos = handleProccessData();
    const newMontoPagado = roundNumber(data.montoPagado + montos.montoPEN);

    if (newMontoPagado > dataGeneral.total) {
      textos.push("El total de los cobros debe ser menor o igual al total del documento.");
    }

    if (data.pedirCuentaBancaria) {
      if (!data.cuentaBancariaId || data.cuentaBancariaId <= 0) {
        textos.push("La cuenta bancaria es requerida");
      }
    }

    if (textos.length > 0) {
      handleSetTextos(setGlobalContext, "adicional", textos);
    }

    return textos.length === 0;
  };

  const handleProccessData = (): ICobro => {
    const { tipoId, tipoDocumentoId, proveedorId, clienteId, serie, numero } = dataGeneral;
    const { montoLocal } = data;

    // Calcular montos basados en la moneda
    // const montoPEN = monedaId === "S" ? montoLocal : montoLocal * tipoCambio;
    // const montoUSD = monedaId === "S" ? montoLocal / tipoCambio : montoLocal;

    // Datos comunes
    const commonData = {
      ...data,
      montoPEN: roundNumber(montoLocal),
      montoUSD: roundNumber(0),
    };

    // Retornar dependiendo de isApi
    return isApi ? { ...commonData, tipoId, tipoDocumentoId, proveedorId, clienteId, serie, numero } : commonData;
  };

  const handleSave = async (): Promise<void> => {
    const detalleValido = await handleValidation();
    if (!detalleValido) {
      handleFocus(inputs["fechaCobro"]);
      return;
    }
    const detalleProcesado = handleProccessData();

    if (isApi) {
      try {
        const resultMessages: IMensajes[] = await post(globalContext, detalleProcesado, menu);
        handleSetMensajes(setGlobalContext, resultMessages, "adicional");
        handleClearModalProp(setGlobalContext, "tercer");
      } catch (error) {
        handleSetErrorMensaje(setGlobalContext, error, "adicional");
        handleFocus(inputs["fechaCobro"]);
      }
    } else {
      handleCrudDetalles(detalleProcesado);
      handleClear();
    }
  };

  const handleClear = (): void => {
    setData((x) => ({
      ...x,
      tipoCobroId: tiposPago[0].id ?? "",
      tipoCobroDescripcion: tiposPago[0].descripcion ?? "",
      monedaId: monedas[0].id ?? "",
      montoLocal: dataGeneral.total - data.montoPagado,
    }));
    handleFocus(inputs["fechaCobro"]);
  };

  const handleTotales = (cobros: ICobro[]): void => {
    const totalPagado = cobros.reduce((total, x) => total + x.montoPEN, 0);
    const totalPendiente = dataGeneral.total - totalPagado;
    setData((x) => ({
      ...x,
      montoLocal: dataGeneral.total - totalPagado,
      montoPendiente: roundNumber(totalPendiente),
      montoPagado: roundNumber(totalPagado),
    }));
  };

  // const handleKeyDown = async (e: KeyboardEvent<HTMLButtonElement | HTMLInputElement>): Promise<void> => {
  //   if (e.key !== "Enter") return;

  //   await handleGetTipoCambio();
  // };
  //#endregion

  return (
    <>
      {tiposPago.length > 0 && (
        <ModalForm
          title={isApi ? `Modificar cobros - Documento: ${dataGeneral.numeroDocumento}` : "Registrar Cobro"}
          origenMensajes="adicional"
          replaceClose={true}
          onClose={() => handleClearModalProp(setGlobalContext, "segundo")}
          className="cobro-help-modal md:min-w-[40%] md:max-w-[900px] !gap-y-0"
        >
          {!show && tercer.tipo !== "consultar" && (
            <ButtonGroup showRegistrar={false} showAnular={false}>
              <button
                id="buttonAgregar"
                name="buttonAgregar"
                title="Presione [ALT + A] para agregar un registro."
                accessKey="a"
                autoFocus={tercer.tipo === null}
                onClick={handleNew}
                className="button-base button-base-bg-secondary"
              >
                <BsFileEarmarkPlusFill size={"1.5rem"} className="button-base-icon" />
                <span className="button-base-text-hidden-info">[ ALT + A ]</span>
                <span className="button-base-text-hidden">Agregar</span>
              </button>
            </ButtonGroup>
          )}

          {show && data.montoLocal !== 0 && (
            <BasicKeyHandler selector="cobro-help-modal">
              <div className="filter-base cobro-help-modal">
                <div className="input-base-row">
                  <div className="input-base-container-25">
                    <label htmlFor="fechaCobro" className="label-base">
                      Fecha
                    </label>
                    <input
                      type="date"
                      ref={inputs["fechaCobro"]}
                      id="fechaCobro"
                      name="fechaCobro"
                      value={data.fechaCobro}
                      onChange={handleData}
                      autoFocus
                      disabled={tercer.tipo === "consultar"}
                      className="input-base"
                    />
                  </div>
                  <div className="input-base-container-25">
                    <label htmlFor="tipoCobroId" className="label-base">
                      Tipo Cobro
                    </label>
                    <select
                      id="tipoCobroId"
                      name="tipoCobroId"
                      value={data.tipoCobroId}
                      onChange={handleData}
                      className="input-base"
                    >
                      <option key="default" value="">
                        SELECCIONAR
                      </option>
                      {tiposPago
                        .filter((x: ITipoPago) => x.tipoVentaId === "001")
                        .map((x: ICombo) => (
                          <option key={x.id} value={x.id}>
                            {x.descripcion}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="input-base-container-25">
                    <label htmlFor="monedaId" className="label-base">
                      Moneda
                    </label>
                    <select id="monedaId" name="monedaId" value={data.monedaId ?? ""} disabled className="input-base">
                      {monedas
                        .filter((x) => x.id === "S")
                        .map((x: IMoneda) => (
                          <option key={x.id} value={x.id}>
                            {x.descripcion}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="input-base-container-25">
                    <label htmlFor="montoLocal" className="label-base">
                      Monto
                    </label>
                    <input
                      ref={inputs["montoLocal"]}
                      type="number"
                      inputMode="numeric"
                      id="montoLocal"
                      name="montoLocal"
                      placeholder="Monto"
                      value={data.montoLocal}
                      onChange={handleData}
                      autoComplete="off"
                      min={0}
                      step={0.1}
                      disabled={tercer.tipo === "consultar"}
                      className="input-base"
                    />
                  </div>
                </div>

                {/* <div className="input-base-row">
                  <div className="input-base-container-50">
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
                        className={!api.loading ? "input-base-button" : "input-base"}
                      />
                      {!api.loading && (
                        <button
                          id="buttonConsultarTipoCambio"
                          name="buttonConsultarTipoCambio"
                          title="Presione [ALT + Z] para consultar a SUNAT."
                          accessKey="z"
                          onClick={() => handleGetTipoCambio()}
                          onKeyDown={handleKeyDown}
                          className="button-base-anidado button-base-bg-primary"
                        >
                          <FaMoneyBillTransfer strokeWidth={2} size="2rem" className="button-base-icon" />
                        </button>
                      )}
                    </div>
                  </div>
                </div> */}

                {data.pedirCuentaBancaria && (
                  <div className="input-base-row">
                    <div className="input-base-container-100">
                      <label htmlFor="cuentaBancariaId" className="label-base">
                        Cuenta Bancaria
                      </label>
                      <select
                        id="cuentaBancariaId"
                        name="cuentaBancariaId"
                        value={data.cuentaBancariaId ?? ""}
                        onChange={handleData}
                        disabled={tercer.tipo === "consultar"}
                        className="input-base"
                      >
                        <option key="default" value="">
                          SELECCIONAR
                        </option>
                        {cuentasBancarias.map((x: ICuentaBancaria) => (
                          <option key={x.id} value={x.id}>
                            {handleSelectCuentaBancaria(x)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="input-base-row">
                  <div className="input-base-container-100">
                    <label htmlFor="observacionModal" className="label-base">
                      Observación
                    </label>
                    <input
                      id="observacionModal"
                      name="observacion"
                      placeholder="Observación"
                      value={data.observacion ?? ""}
                      onChange={handleData}
                      autoComplete="off"
                      disabled={tercer.tipo === "consultar"}
                      className="input-base"
                    />
                  </div>
                  {isApi && (
                    <div className="input-base-container-auto">
                      {element.responsive === "full" && <span className="label-base-checkbox">-</span>}
                      <CheckBox
                        id="afectarCaja"
                        value={data.afectarCaja}
                        handleData={handleData}
                        disabled={tercer.tipo === "consultar"}
                        label="Afectar Caja"
                      />
                    </div>
                  )}
                </div>

                <ButtonFooter
                  menu={menu}
                  modalProp="tercer"
                  origenMensaje="adicional"
                  data={data}
                  replaceSend={true}
                  onSend={handleSave}
                  replaceClose={true}
                  onClose={handleClose}
                  inputFocus="fechaCobro"
                />
              </div>
            </BasicKeyHandler>
          )}

          <Table
            data={table}
            columns={columns}
            doubleClick={false}
            pagination={false}
            selectable={false}
            tableClassName={"cobro-help-modal-table"}
            border={true}
          />

          {footerItems.map((item, index) => (
            <div key={index} className="form-base-detalle-row">
              <p className="form-base-detalle-row-text">{item.text}</p>
              <p className="form-base-detalle-row-number">{handleNumber(item.value, true, true)}</p>
            </div>
          ))}
        </ModalForm>
      )}

      {isApi && tercer.tipo === "eliminar" && (
        <DeleteModal modalProp="tercer" menu={menu} clearForm={false} origenMensaje="adicional" propText={"item"} />
      )}
    </>
  );
};

export default CobroHelpModal;
