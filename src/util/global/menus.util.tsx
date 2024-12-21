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
  VEHICULOS,
  LINEA,
  SUBLINEA,
  MARCA,
  UNIDADESMEDIDA,
  CUENTASCORRIENTES,
  ENTIDADBANCARIA,
  DEPARTAMENTO,
  PROVINCIA,
  DISTRITO,
  ARTICULO,
  MOVIMIENTOARTICULO,
  CUADRESTOCK,
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
          text: "Vehículos",
          path: `${MANTENIMIENTO}/${VEHICULOS}`,
        },
        {
          text: "Conductor / Transportista",
          path: `${MANTENIMIENTO}/${TRANSPORTISTA}`,
        },
      ]),
    },
    {
      id: "mantenimiento",
      text: "Mantenimiento",
      icon: <WrenchScrewdriverIcon className="w-full h-full" />,
      subMenus: createSubMenu([
        { text: "Tipo de Cambio", path: `${MANTENIMIENTO}/${TIPOCAMBIO}` },
        { text: "Línea", path: `${MANTENIMIENTO}/${LINEA}` },
        { text: "SubLínea", path: `${MANTENIMIENTO}/${SUBLINEA}` },
        { text: "Marca", path: `${MANTENIMIENTO}/${MARCA}` },
        {
          text: "Unidades de Medida",
          path: `${MANTENIMIENTO}/${UNIDADESMEDIDA}`,
        },
        {
          text: "Entidad Bancaria",
          path: `${MANTENIMIENTO}/${ENTIDADBANCARIA}`,
        },
        {
          text: "Cuenta Corriente",
          path: `${MANTENIMIENTO}/${CUENTASCORRIENTES}`,
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
          text: "Movimiento Artículo",
          path: `${MANTENIMIENTO}/${MOVIMIENTOARTICULO}`,
          icon: <IoMdBarcode className="size-full" />,
        },
        {
          text: "Cuadre Stock",
          path: `${MANTENIMIENTO}/${CUADRESTOCK}`,
          icon: <IoMdBarcode className="size-full" />,
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
