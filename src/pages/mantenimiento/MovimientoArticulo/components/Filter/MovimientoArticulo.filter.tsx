import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  IMovimientoArticuloFilter,
  IMovimientoArticuloTable,
  defaultMovimientoArticuloFilter,
} from "../../../../../models";
import {
  getListar,
  handleInputType,
  handleSetErrorMensaje,
  resetPagination,
} from "../../../../../util";

const MovimientoArticuloFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<IMovimientoArticuloFilter>(
    defaultMovimientoArticuloFilter
  );
  const search = useDebounce(filter);
  const estadosStock = [
    { Id: "", Descripcion: "TODOS" },
    { Id: "AL01", Descripcion: "STOCK AGOTANDOSE" },
    { Id: "AL02", Descripcion: "STOCK SUFICIENTE" },
    { Id: "AL03", Descripcion: "STOCK EXCESIVO" },
    { Id: "AL04", Descripcion: "SIN STOCK" },
  ];
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search, pagina]);

  useEffect(() => {
    primer.id === null && mensaje.length > 0 && handleListar();
  }, [modal, mensajes]);
  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    resetPagination(setGlobalContext);
    setFilter((x) => ({ ...x, [name]: value }));
  };
  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        descripcion: search.descripcion,
      });
      const {
        data,
        total,
      }: { data: IMovimientoArticuloTable[]; total: number } = await getListar(
        globalContext,
        params
      );
      setGlobalContext((x) => ({
        ...x,
        table: { ...x.table, data, total },
      }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };

  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <BasicKeyHandler selector="articulo-filter">
        <div className="input-base-row articulo-filter">
          <div className="input-base-container-50">
            <label htmlFor="estadoStock" className="label-base">
              estadoStock
            </label>
            <select
              id="estadoStock"
              name="estadoStock"
              value={filter.estadoStock}
              onChange={handleData}
              className="input-base"
            >
              {estadosStock.map((x) => (
                <option key={x.Id} value={x.Id}>
                  {x.Descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-75">
            <label htmlFor="descripcionFilter" className="label-base">
              Descripción
            </label>
            <input
              id="descripcionFilter"
              name="descripcion"
              placeholder="Descripción"
              value={filter.descripcion}
              onChange={handleData}
              autoComplete="off"
              className="input-base"
            />
          </div>
        </div>
      </BasicKeyHandler>
    </div>
  );
};

export default MovimientoArticuloFilter;
