import { useEffect, useState } from "react";
import { ProvinciaFilter, ProvinciaModal, useProvinciaColumn } from ".";
import { ButtonGroup, DeleteModal, Loading, Messages, NotFound, Table } from "../../../components";
import { useGlobalContext, usePermisos } from "../../../hooks";
import { IProvincia, IProvinciaTablas, defaultProvincia } from "../../../models";
import { handleInitialData, handlePrimaryModal, handleResetContext, handleResetMensajeError, handleSetPermisoYMenu } from "../../../util";

const Provincia: React.FC = () => {
  //#region useState
  const menu: string = "Mantenimiento/Provincia";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("Provincia");
  const columns = useProvinciaColumn();
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

    handleInitialData(globalContext, defaultProvincia)
      .then((response) => {
        const { data, tablas }: { data: IProvincia; tablas: IProvinciaTablas } = response;
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
        <h4 className="main-header-title">Provincias</h4>
        {ready && visible && <ButtonGroup isTablas={true} />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <ProvinciaFilter />}
            {visible && <Table data={table.data} columns={columns} tableClassName="provincia-table" doubleClick={false} />}

            {primer.tipo === "eliminar" && <DeleteModal propText={"nombre"} />}
            {form.data && primer.tipo && api.menu === menu && <ProvinciaModal />}
          </>
        )}
      </div>
    </div>
  );
};
export default Provincia;