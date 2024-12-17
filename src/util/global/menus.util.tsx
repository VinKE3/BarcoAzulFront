import { WrenchScrewdriverIcon } from "@heroicons/react/20/solid";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdBarcode } from "react-icons/io";
import { mantenimientoRoutes } from "../../common/routes/mantenimiento.routes";
import { privateRoutes } from "../../common/routes/routes";
import { IMenuElement, ISubMenuElement } from "../../models";

//#region Variables
const { MANTENIMIENTO } = privateRoutes;
const {
  CLIENTE,
  PROVEEDOR,
  VENDEDOR,
  TRANSPORTISTA,
  MEDICO,
  LINEA,
  MARCA,
  UNIDADESMEDIDA,
  ENTIDADBANCARIA,
  DEPARTAMENTO,
  PROVINCIA,
  DISTRITO,
  ARTICULO,
  GRUPOFARMACOLOGICO,
  FARMACOLOGIA,
  PRESENTACIONGENERAL,
  PRECIOMAYORISTA,
  LOTE,
  CONFIGURACIONLOTE,
  TIPOCAMBIO,
} = mantenimientoRoutes;
const createSubMenu = (items: ISubMenuElement[]) => items;
//#endregion

export function navbarMenu(): IMenuElement[] {
  return [
    {
      id: "entidades",
      text: "Entidades",
      icon: <FaUsers className="size-full" />,
      subMenus: createSubMenu([
        { text: "Cliente", path: `${MANTENIMIENTO}/${CLIENTE}` },
        { text: "Proveedor", path: `${MANTENIMIENTO}/${PROVEEDOR}` },
        { text: "Vendedor", path: `${MANTENIMIENTO}/${VENDEDOR}` },
        {
          text: "Conductor / Transportista",
          path: `${MANTENIMIENTO}/${TRANSPORTISTA}`,
        },
        { text: "Médico", path: `${MANTENIMIENTO}/${MEDICO}` },
      ]),
    },
    {
      id: "mantenimiento",
      text: "Mantenimiento",
      icon: <WrenchScrewdriverIcon className="w-full h-full" />,
      subMenus: createSubMenu([
        { text: "Tipo de Cambio", path: `${MANTENIMIENTO}/${TIPOCAMBIO}` },
        { text: "Línea", path: `${MANTENIMIENTO}/${LINEA}` },
        { text: "Marca", path: `${MANTENIMIENTO}/${MARCA}` },
        {
          text: "Unidades de Medida",
          path: `${MANTENIMIENTO}/${UNIDADESMEDIDA}`,
        },
        {
          text: "Entidad Bancaria",
          path: `${MANTENIMIENTO}/${ENTIDADBANCARIA}`,
        },
        { text: "Departamento", path: `${MANTENIMIENTO}/${DEPARTAMENTO}` },
        { text: "Provincia", path: `${MANTENIMIENTO}/${PROVINCIA}` },
        { text: "Distrito", path: `${MANTENIMIENTO}/${DISTRITO}` },
      ]),
    },
    {
      id: "productos",
      text: "Productos",
      icon: <AiFillMedicineBox className="w-full h-full" />,
      subMenus: createSubMenu([
        {
          text: "Artículo",
          path: `${MANTENIMIENTO}/${ARTICULO}`,
          icon: <IoMdBarcode className="size-full" />,
        },
        {
          text: "Grupo Farmacológico",
          path: `${MANTENIMIENTO}/${GRUPOFARMACOLOGICO}`,
        },
        { text: "Farmacología", path: `${MANTENIMIENTO}/${FARMACOLOGIA}` },
        {
          text: "Presentación General",
          path: `${MANTENIMIENTO}/${PRESENTACIONGENERAL}`,
        },
        {
          text: "Precio Mayorista",
          path: `${MANTENIMIENTO}/${PRECIOMAYORISTA}`,
        },
        { text: "Lote", path: `${MANTENIMIENTO}/${LOTE}` },
        {
          text: "Lote por Vender",
          path: `${MANTENIMIENTO}/${CONFIGURACIONLOTE}`,
        },
      ]),
    },
    {
      id: "informe",
      text: "Informes",
      icon: <HiOutlineDocumentReport size={"2rem"} className="w-full h-full" />,
      subMenus: createSubMenu([]), // Sin submenús definidos
    },
  ] as IMenuElement[];
}
