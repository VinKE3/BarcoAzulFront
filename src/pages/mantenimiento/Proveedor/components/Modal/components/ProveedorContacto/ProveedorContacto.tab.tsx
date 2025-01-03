import React, { ChangeEvent, useEffect, useState } from "react";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import {
  BasicKeyHandler,
  ButtonFooter,
  ButtonGroup,
  DeleteModal,
  Messages,
  Table,
} from "../../../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../../../hooks";
import {
  defaultProveedorContacto,
  defaultProveedorContactoTablas,
  ICombo,
  IProveedorContacto,
  IProveedorContactoTab,
} from "../../../../../../../models";
import {
  handleClearModalProp,
  handleHelpModal,
  handleInitialData,
  handleInputType,
  handleSetErrorMensaje,
  handleSetInputs,
  handleSetMensajeCustom,
} from "../../../../../../../util";
import useProveedorContactoColumn from "./proveedorContacto.column";

interface IProp {
  dataContacto: IProveedorContactoTab;
  handleListarContacto: () => Promise<IProveedorContacto[]>;
}

const ProveedorContactoTab: React.FC<IProp> = ({ dataContacto, handleListarContacto }) => {
  //#region useState
  const menu: string = "Mantenimiento/ProveedorContacto";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const { cargos } = dataContacto.tablas || defaultProveedorContactoTablas;
  const mensaje = mensajes.filter((x) => x.tipo >= 0 && x.origen === "proveedorContacto");
  const mensajeSuccess = mensajes.filter((x) => x.tipo === 0 && x.origen === "proveedorContacto");

  const [data, setData] = useState<IProveedorContacto>(defaultProveedorContacto);
  const [table, setTable] = useState<IProveedorContacto[]>(dataContacto.data || []);
  const [show, setShow] = useState<boolean>(false);
  const columns = useProveedorContactoColumn();
  const inputs = useFocus("numeroDocumentoIdentidad", "nombres");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    retorno && retorno.origen === "proveedorContacto" && handleLoad(); //Para cargar data seleccionada de una fila de la tabla
  }, [segundo]);

  useEffect(() => {
    mensajeSuccess.length > 0 && handleListar();
  }, [mensajes]);

  useEffect(() => {
    return () => {
      handleClearModalProp(setGlobalContext, "segundo", false, true);
    };
  }, []);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };

  const handleLoad = async (): Promise<void> => {
    if (segundo.tipo === "registrar" || segundo.tipo === "eliminar") {
      return;
    }
    handleInitialData(globalContext, defaultProveedorContacto, "segundo", menu)
      .then((response) => {
        setShow(true);
        setData(response.data as IProveedorContacto);
      })
      .catch((error) => {
        handleSetErrorMensaje(setGlobalContext, error, "proveedorContacto");
      });
  };

  const handleListar = async (): Promise<void> => {
    setTable(await handleListarContacto());
  };

  const handleNew = (): void => {
    setData((x) => ({ ...x, proveedorId: primer.id as string }));
    handleHelpModal(setGlobalContext, "", "segundo", true);
    setShow(true);
  };

  const handleClose = (): void => {
    setShow(false);
    setData(defaultProveedorContacto);
    handleClearModalProp(setGlobalContext, "segundo", false, true);
  };
  //#endregion

  return (
    <>
      <div className="main-modal-secondary">
        {mensaje.length > 0 && <Messages mensajes={mensaje} />}

        <Messages
          showClose={false}
          mensajes={handleSetMensajeCustom(5, [
            "Cualquier registro, modificación o eliminación de contactos será guardado automáticamente en la base de datos, usar con precaución.",
          ])}
        />

        {!show && primer.tipo !== "consultar" && (
          <ButtonGroup showRegistrar={false} showAnular={false}>
            <button
              id="buttonAgregarContacto"
              name="buttonAgregarContacto"
              title="Presione [ALT + A] para agregar registro."
              accessKey="a"
              autoFocus={segundo.tipo === null}
              onClick={handleNew}
              className="main-button main-button-bg-secondary"
            >
              <BsFileEarmarkPlusFill size={"1.5rem"} className="main-button-icon" />
              <span className="main-button-text">Agregar Contacto</span>
            </button>
          </ButtonGroup>
        )}

        {show && (
          <BasicKeyHandler selector={"proveedor-contacto-modal"}>
            <div className="main-filter proveedor-contacto-modal">
              <div className="main-input-group">
                <div className="main-input-33">
                  <label htmlFor="numeroDocumentoIdentidad" className="main-label">
                    Documento
                  </label>
                  <input
                    ref={inputs["numeroDocumentoIdentidad"]}
                    id="numeroDocumentoIdentidad"
                    name="numeroDocumentoIdentidad"
                    placeholder="Documento"
                    value={data.numeroDocumentoIdentidad ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    autoFocus={segundo.tipo !== null}
                    disabled={segundo.tipo === "consultar"}
                    className="main-input"
                  />
                </div>
                <div className="main-input-100">
                  <label htmlFor="nombres" className="main-label">
                    Nombre
                  </label>
                  <input
                    ref={inputs["nombres"]}
                    id="nombres"
                    name="nombres"
                    placeholder="Nombre"
                    value={data.nombres}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={segundo.tipo === "consultar"}
                    className="main-input"
                  />
                </div>
              </div>

              <div className="main-input-group">
                <div className="main-input-50">
                  <label htmlFor="cargoId" className="main-label">
                    Cargo
                  </label>
                  <select
                    id="cargoId"
                    name="cargoId"
                    value={data.cargoId ?? ""}
                    onChange={handleData}
                    disabled={segundo.tipo === "consultar"}
                    className="main-input"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {cargos.map((x: ICombo) => (
                      <option key={x.id} value={x.id}>
                        {x.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="main-input-50">
                  <label htmlFor="celular" className="main-label">
                    Celular
                  </label>
                  <input
                    id="celular"
                    name="celular"
                    placeholder="Celular"
                    value={data.celular ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={segundo.tipo === "consultar"}
                    className="main-input"
                  />
                </div>
              </div>

              <div className="main-input-group">
                <div className="main-input-50">
                  <label htmlFor="correoElectronico" className="main-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="correoElectronico"
                    name="correoElectronico"
                    placeholder="correo.electrónico@....com"
                    value={data.correoElectronico ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={segundo.tipo === "consultar"}
                    className="main-input"
                  />
                </div>
                <div className="main-input-50">
                  <label htmlFor="telefono" className="main-label">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    placeholder="Teléfono"
                    value={data.telefono ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={segundo.tipo === "consultar"}
                    className="main-input"
                  />
                </div>
              </div>

              <div className="main-input-group">
                <div className="main-input-100">
                  <label htmlFor="direccion" className="main-label">
                    Dirección
                  </label>
                  <input
                    id="direccion"
                    name="direccion"
                    placeholder="Dirección"
                    value={data.direccion ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={segundo.tipo === "consultar"}
                    className="main-input"
                  />
                </div>
              </div>

              <ButtonFooter
                modalProp="segundo"
                menu={menu}
                origenMensaje="proveedorContacto"
                data={data}
                clearForm={false}
                onSend={handleClose}
                onClose={handleClose}
                inputFocus="numeroDocumentoIdentidad"
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
          tableClassName="proveedor-contacto-table"
        />
      </div>

      {segundo.tipo === "eliminar" && (
        <DeleteModal
          modalProp="segundo"
          menu={menu}
          origenMensaje="proveedorContacto"
          propText={"nombres"}
          clearForm={false}
          onSend={handleClose}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default ProveedorContactoTab;
