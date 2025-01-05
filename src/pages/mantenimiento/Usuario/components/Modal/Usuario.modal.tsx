import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler, ButtonFooter, CheckBox, ModalForm } from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import { ICombo, IUsuario, IUsuarioTablas, defaultUsuarioTablas } from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const UsuarioModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, extra } = globalContext;
  const { primer } = modal;
  const { element } = extra;

  const { vendedores, puntosVenta, tiposUsuario }: IUsuarioTablas = form.tablas || defaultUsuarioTablas;
  const [data, setData] = useState<IUsuario>(form.data);
  const inputs = useFocus("id", "nombre");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    primer.tipo !== "registrar" && setData((x) => ({ ...x, clave: "123", claveConfirmacion: "123" }));
  }, [primer.tipo]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };
  //#endregion

  return (
    <>
      {vendedores.length > 0 && (
        <BasicKeyHandler selector="usuario-modal">
          <ModalForm title={`${primer.tipo} usuario`} className="usuario-modal md:min-w-[50%]">
            <div className="modal-base-content">
              <div className="input-base-row">
                <div className="input-base-container-25">
                  <label htmlFor="id" className="label-base">
                    Código
                  </label>
                  <input ref={inputs["id"]} id="id" name="id" placeholder="Código" value={data.id} disabled className="input-base" />
                </div>
                <div className="input-base-container-25">
                  <label htmlFor="nick" className="label-base">
                    Nick
                  </label>
                  <input
                    ref={inputs["nick"]}
                    id="nick"
                    name="nick"
                    placeholder="Nick"
                    value={data.nick}
                    onChange={handleData}
                    autoComplete="off"
                    autoFocus
                    disabled={primer.tipo !== "registrar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-auto">
                  {element.responsive === "full" && <span className="label-base-checkbox">-</span>}
                  <CheckBox
                    id="isActivo"
                    value={data.isActivo}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Activo"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label htmlFor="tipoUsuarioId" className="label-base">
                    Tipo Usuario
                  </label>
                  <select id="tipoUsuarioId" name="tipoUsuarioId" value={data.tipoUsuarioId ?? ""} disabled className="input-base">
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {tiposUsuario.map((x: ICombo) => (
                      <option key={x.id} value={x.id}>
                        {x.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="clave" className="label-base">
                    Clave
                  </label>
                  <input
                    type="password"
                    id="clave"
                    name="clave"
                    placeholder="Clave"
                    value={data.clave ?? ""}
                    onChange={handleData}
                    autoComplete="new-password"
                    disabled={primer.tipo !== "registrar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="claveConfirmacion" className="label-base">
                    Confirmar Clave
                  </label>
                  <input
                    type="password"
                    id="claveConfirmacion"
                    name="claveConfirmacion"
                    placeholder="Confirmar Clave"
                    value={data.claveConfirmacion ?? ""}
                    onChange={handleData}
                    autoComplete="new-password"
                    disabled={primer.tipo !== "registrar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="vendedorId" className="label-base">
                    Vendedor
                  </label>
                  <select
                    id="vendedorId"
                    name="vendedorId"
                    value={data.vendedorId ?? ""}
                    onChange={handleData}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {vendedores.map((x: ICombo) => (
                      <option key={x.id} value={x.id}>
                        {x.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-base-container-50">
                  <label htmlFor="puntoVentaId" className="label-base">
                    Establecimiento
                  </label>
                  <select
                    id="puntoVentaId"
                    name="puntoVentaId"
                    value={data.puntoVentaId ?? ""}
                    onChange={handleData}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {puntosVenta.map((x: ICombo) => (
                      <option key={x.id} value={x.id}>
                        {x.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-100">
                  <label htmlFor="observacion" className="label-base">
                    Observación
                  </label>
                  <input
                    id="observacion"
                    name="observacion"
                    placeholder="Observación"
                    value={data.observacion ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
            </div>

            <ButtonFooter data={data} inputFocus={primer.tipo === "registrar" ? "id" : "nombre"} />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default UsuarioModal;
