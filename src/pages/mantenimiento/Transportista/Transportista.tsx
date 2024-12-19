import { useEffect, useState } from "react";
import {
  TransportistaFilter,
  TransportistaModal,
  useTransportistaColumn,
} from ".";
import {
  ButtonGroup,
  DeleteModal,
  Loading,
  Messages,
  NotFound,
  Table,
} from "../../../components";
import { useGlobalContext, usePermisos } from "../../../hooks";
import {
  ITransportista,
  ITransportistaTablas,
  defaultTransportista,
} from "../../../models";
import {
  handleInitialData,
  handlePrimaryModal,
  handleResetContext,
  handleResetMensajeError,
  handleSetPermisoYMenu,
} from "../../../util";

const Transportista: React.FC = () => {
  //#region useState
  const menu: string = "Mantenimiento/Conductor";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("Conductor");
  const columns = useTransportistaColumn();
  //#endregion

  //#region useEffect
  useEffect(() => {
    const resetContext = async () => {
      handleResetContext(setGlobalContext);
    };
    resetContext();
  }, []);

  useEffect(() => {
    if (permisos.menuId !== "") {
      handleSetPermisoYMenu(setGlobalContext, permisos, menu);
      setReady(true);
    }
  }, [permisos]);

  useEffect(() => {
    primer.tipo && !form.data && handleModal();
  }, [primer.tipo]);
  //#endregion

  //#region funciones
  const handleModal = async (): Promise<void> => {
    if (primer.tipo === "eliminar" || primer.tipo === "anular") {
      return;
    }

    handleInitialData(globalContext, defaultTransportista)
      .then((response) => {
        const {
          data,
          tablas,
        }: { data: ITransportista; tablas: ITransportistaTablas } = response;
        handlePrimaryModal(setGlobalContext, data, tablas);
      })
      .catch((error) => {
        handleResetMensajeError(setGlobalContext, true, true, error);
      });
  };
  //#endregion

  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Transportistas</h4>
        {ready && visible && <ButtonGroup isTablas={true} />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <TransportistaFilter />}

            {visible && (
              <Table
                data={table.data}
                columns={columns}
                tableClassName="transportista-table"
                isTablas={true}
              />
            )}

            {primer.tipo === "eliminar" && <DeleteModal propText={"nombre"} />}

            {form.data && primer.tipo && api.menu === menu && (
              <TransportistaModal />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Transportista;
