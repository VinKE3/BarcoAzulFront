/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChangeEvent, useEffect, useState } from "react"
import {

  Messages,
  Table,
} from "../../../../../../../components";
import { useGlobalContext } from "../../../../../../../hooks";
import {
  ICuentaPorCobrar,
  IAbonos,
  defaultAbonos,
} from "../../../../../../../models";
import {
  handleInputType,
} from "../../../../../../../util";
import { useCuentaPorCobrarDetalleColumn } from "../../../Column";
interface IProps {
  dataGeneral: ICuentaPorCobrar;
  setDataGeneral: React.Dispatch<React.SetStateAction<ICuentaPorCobrar>>;
}

const CuentaPorCobrarDetalle: React.FC<IProps> = ({ dataGeneral }) => {
  //#region useState
  const { globalContext } = useGlobalContext();
  const { modal, form, mensajes, extra } = globalContext;
  const { primer } = modal;
  const { retorno } = form;
  const { element } = extra;
  const { inputs } = element;
  const mensaje = mensajes.filter((x) => x.origen === "detalle" && x.tipo >= 0);
  const [data, setData] = useState<IAbonos>(defaultAbonos);
  const columns = useCuentaPorCobrarDetalleColumn(primer.tipo);
  //#endregion
  //#region useEffect
  useEffect(() => {
    retorno &&
      retorno.origen === "detalle" &&
      handleActionBar(retorno as IAbonos);
  }, [retorno]);
  //#endregion

  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };

  const handleActionBar = (detalle: IAbonos): void => {
    setData(detalle);
  };
  return (
    <div className="form-base-container guia-remision-form">
      {mensaje.length > 0 && <Messages />}

      <div className="filter-base">
        <span className="filter-base-text">Abonos</span>

        <>
          <div className="input-base-row">
            <div className="input-base-container-100">
              <label htmlFor="abonoId" className="label-base">
                Abono
              </label>
              <div className="input-base-container-button">
                <input
                  id="abonoId"
                  name="abonoId"
                  placeholder="AbonoId"
                  value={data.abonoId ?? ""}
                  disabled
                  className="input-base-button"
                />
              </div>
            </div>
          </div>

          <div className="input-base-row">
            <div className="input-base-container-50">
              <label htmlFor="tipoPagoDescripcion" className="label-base">
                Tipo Pago
              </label>
              <div className="input-base-container-button">
                <input
                  id="tipoPagoDescripcion"
                  name="tipoPagoDescripcion"
                  placeholder="Lote"
                  value={data.tipoPagoDescripcion ?? ""}
                  disabled
                  className="input-base-button"
                />
              </div>
            </div>

            <div className="input-base-container-50">
              <label htmlFor="fecha" className="label-base">
                Fecha
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={data.fecha ?? ""}
                disabled
                className="input-base"
              />
            </div>
            <div className="input-base-container-33">
              <label htmlFor="monto" className="label-base">
                monto
              </label>
              <div className="input-base-container-button">
                <input
                  ref={inputs["monto"]}
                  type="number"
                  inputMode="numeric"
                  id="monto"
                  name="monto"
                  placeholder="monto"
                  value={data.monto ?? 0}
                  onChange={handleData}
                  autoComplete="off"
                  min={0}
                  step={1}
                  disabled
                  className="input-base-button"
                />
              </div>
            </div>
          </div>
        </>
        <Table
          tableClassName=""
          data={dataGeneral.abonos}
          columns={columns}
          doubleClick={false}
          pagination={false}
          selectable={false}
          border={true}
        />
      </div>
    </div>
  );
};

export default CuentaPorCobrarDetalle;
