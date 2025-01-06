import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IConceptoFind,
  IConceptoFindFilter,
  IConceptoFindModal,
  IConceptoFindTable,
  defaultConceptoFindFilter,
} from "../../../../models";
import {
  getListar,
  handleFocus,
  handleInputType,
  handleSetErrorMensaje,
  handleSetRetorno,
} from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import useConceptoFindModalColumn from "./conceptoFindModal.column";

const ConceptoFindModal: React.FC<IConceptoFindModal> = ({ inputFocus }) => {
  //#region useState
  const menu: string = "Mantenimiento/Proveedor";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IConceptoFindFilter>(
    defaultConceptoFindFilter
  );
  const search = useDebounce(filter);
  const [data, setData] = useState<IConceptoFindTable[]>([]);
  const columns = useConceptoFindModalColumn(inputFocus);
  //#endregion
  return <div></div>;
};

export default ConceptoFindModal;
