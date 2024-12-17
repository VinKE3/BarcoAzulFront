import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler, ButtonFooter, ModalForm } from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import { ILinea } from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const LineaModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const [data, setData] = useState<ILinea>(form.data);
  const inputs = useFocus("codigoInterno");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };
  //#endregion

  return (
    <BasicKeyHandler selector="linea-modal">
      <ModalForm title={`${primer.tipo} línea`} className="linea-modal md:min-w-[50%]">
        <div className="modal-base-content">
          <div className="input-base-row">
            <div className="input-base-container-50">
              <label htmlFor="id" className="label-base">
                Código
              </label>
              <input id="id" name="id" placeholder="Código" value={data.id} disabled className="input-base" />
            </div>

            <div className="input-base-container-50">
              <label htmlFor="codigoInterno" className="label-base">
                Código Interno
              </label>
              <input
                ref={inputs["codigoInterno"]}
                id="codigoInterno"
                name="codigoInterno"
                placeholder="Código Interno"
                value={data.codigoInterno ?? ""}
                onChange={handleData}
                autoComplete="off"
                autoFocus
                maxLength={4}
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>

          <div className="input-base-row">
            <div className="input-base-container-100">
              <label htmlFor="descripcion" className="label-base">
                Descripción
              </label>
              <input
                id="descripcion"
                name="descripcion"
                placeholder="Descripción"
                value={data.descripcion}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>

          <div className="input-base-row">
            <div className="input-base-container-100">
              <label htmlFor="direccion" className="label-base">
                Dirección
              </label>
              <input
                id="direccion"
                name="direccion"
                placeholder="Dirección"
                value={data.direccion ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>

          <div className="input-base-row">
            <div className="input-base-container-33">
              <label htmlFor="contacto" className="label-base">
                Contacto
              </label>
              <input
                id="contacto"
                name="contacto"
                placeholder="Contacto"
                value={data.contacto ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-33">
              <label htmlFor="telefono" className="label-base">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                placeholder="Teléfono"
                value={data.telefono ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-33">
              <label htmlFor="fechaUltimaLista" className="label-base">
                Última Lista
              </label>
              <input
                type="date"
                id="fechaUltimaLista"
                name="fechaUltimaLista"
                value={data.fechaUltimaLista ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>
        </div>

        <ButtonFooter data={data} inputFocus="codigoInterno" />
      </ModalForm>
    </BasicKeyHandler>
  );
};

export default LineaModal;
