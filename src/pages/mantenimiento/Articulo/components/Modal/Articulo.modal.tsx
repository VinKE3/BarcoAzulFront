import { ChangeEvent, useEffect, useState } from "react";
import {
  BasicKeyHandler,
  ButtonFooter,
  CheckBox,
  ModalForm,
  SelectFilter,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IArticulo,
  IArticuloTablas,
  ISubLineaArt,
  ICombo,
  IMoneda,
  IOptionType,
  defaultArticuloTablas,
} from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const ArticuloModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, extra } = globalContext;
  const { primer } = modal;
  const {
    tiposExistencia,
    lineas,
    subLineas,
    marcas,
    monedas,
    unidadesMedida,
  }: IArticuloTablas = form.tablas || defaultArticuloTablas;
  const [data, setData] = useState<IArticulo>(form.data);
  const inputs = useFocus("id", "codigoBarras");
  //#endregion
  console.log(tiposExistencia);
  console.log(lineas);
  console.log(subLineas);
  console.log(marcas);
  console.log(monedas);
  console.log(unidadesMedida);
  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);
  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };
      return newData;
    });
  };

  const handleCustomSelect = (
    option: IOptionType | null,
    name: string
  ): void => {
    setData((x) => ({ ...x, [name]: option ? option.value : null }));
  };
  //#endregion
  return (
    <>
      {monedas.length > 0 && (
        <BasicKeyHandler selector="articulo-modal">
          <ModalForm
            title={`${primer.tipo} artículo`}
            className="md:max-h-[90%] md:min-w-[60%] articulo-modal"
          >
            <div className="modal-base-content">
              <div className="input-base-row">
                <div className="input-base-container-25">
                  <label htmlFor="id" className="label-base">
                    Código Producto
                  </label>
                  <input
                    ref={inputs["id"]}
                    id="id"
                    name="id"
                    placeholder="Código Producto"
                    value={data.id ?? ""}
                    disabled
                    className="input-base"
                  />
                </div>

                <div className="input-base-container-50">
                  <label htmlFor="codigoBarras" className="label-base">
                    Código Barras
                  </label>
                  <input
                    ref={inputs["codigoBarras"]}
                    id="codigoBarras"
                    name="codigoBarras"
                    placeholder="Código Barras"
                    value={data.codigoBarras ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    autoFocus
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <span className="label-base">Linea</span>
                  <SelectFilter
                    id="lineaId"
                    value={data.lineaId}
                    handleData={(e) => handleCustomSelect(e, "lineaId")}
                    data={lineas}
                    disabled={primer.tipo === "consultar"}
                    nextElementId="subLineaId"
                    nextElementType="select"
                  />
                </div>
                <div className="input-base-container-50">
                  <span className="label-base">SubLinea</span>
                  <SelectFilter
                    id="subLineaId"
                    value={data.subLineaId}
                    handleData={(e) => handleCustomSelect(e, "subLineaId")}
                    data={subLineas}
                    disabled={primer.tipo === "consultar"}
                    nextElementId="tipoExistenciaId"
                    nextElementType="select"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <span className="label-base">Tipo Existencia</span>
                  <SelectFilter
                    id="tipoExistenciaId"
                    value={data.tipoExistenciaId}
                    handleData={(e) =>
                      handleCustomSelect(e, "tipoExistenciaId")
                    }
                    data={tiposExistencia}
                    disabled={primer.tipo === "consultar"}
                    nextElementId="marcaId"
                    nextElementType="select"
                  />
                </div>
                <div className="input-base-container-50">
                  <span className="label-base">Marca</span>
                  <SelectFilter
                    id="marcaId"
                    value={data.marcaId}
                    handleData={(e) => handleCustomSelect(e, "marcaId")}
                    data={marcas}
                    disabled={primer.tipo === "consultar"}
                    nextElementId="unidadMedidaId"
                    nextElementType="select"
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
                    value={data.descripcion ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
              <div className="input-base-row">
                {/* <div className="input-base-container-50">
                  <span className="label-base">Unidad Medida Alternativa</span>
                  <SelectFilter
                    id="unidadMedidaAlternaId"
                    value={data.unidadMedidaAlternaId}
                    handleData={(e) =>
                      handleCustomSelect(e, "unidadMedidaAlternaId")
                    }
                    data={unidadesMedida}
                    disabled={primer.tipo === "consultar"}
                    nextElementId="fixed"
                  />
                </div> */}
              </div>

              <div className="input-base-row">
                <div className="input-base-container-33">
                  <span className="label-base">Unidad Medida</span>
                  <SelectFilter
                    id="unidadMedidaId"
                    value={data.unidadMedidaId}
                    handleData={(e) => handleCustomSelect(e, "unidadMedidaId")}
                    data={unidadesMedida}
                    disabled={primer.tipo === "consultar"}
                    nextElementId="unidadMedidaAlternaId"
                    nextElementType="select"
                  />
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="peso" className="label-base">
                    Peso (KG)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="peso"
                    name="peso"
                    placeholder="Peso"
                    value={data.peso ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label htmlFor="peso" className="label-base">
                    Peso (KG)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="peso"
                    name="peso"
                    placeholder="Peso"
                    value={data.stock ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="peso" className="label-base">
                    Peso (KG)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="peso"
                    name="peso"
                    placeholder="Peso"
                    value={data.peso ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="peso" className="label-base">
                    Peso (KG)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="peso"
                    name="peso"
                    placeholder="Peso"
                    value={data.peso ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
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
                {/* <div className="input-base-container-50">
                  <label htmlFor="registroSanitario" className="label-base">
                    Registro Sanitario
                  </label>
                  <input
                    id="registroSanitario"
                    name="registroSanitario"
                    placeholder="Registro Sanitario"
                    value={data.registroSanitario ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    maxLength={13}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div> */}
              </div>

              <div className="input-base-row">
                <div className="input-base-container-auto">
                  <CheckBox
                    id="isActivo"
                    value={data.isActivo}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Activo"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="precioIncluyeIgv"
                    value={data.precioIncluyeIgv}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="IGV Compra"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="percepcionCompra"
                    value={data.percepcionCompra}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Pecep Compra"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="controlStock"
                    value={data.controlStock}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Control de Stock"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="actualizarPrecioCompra"
                    value={data.actualizarPrecioCompra}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Actualizar Precio"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="detraccion"
                    value={data.detraccion}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Detracción"
                  />
                </div>
              </div>
            </div>

            <ButtonFooter data={data} inputFocus={"codigoBarras"} />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default ArticuloModal;
