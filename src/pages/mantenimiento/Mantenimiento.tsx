import { Navigate, Route } from "react-router-dom";
import { mantenimientoRoutes } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { Departamento } from "./Departamento";
import { Distrito } from "./Distrito";
import { Provincia } from "./Provincia";
import { Linea } from "./Linea";
import { TipoCambio } from "./TipoCambio";
import { Marca } from "./Marca";
import { UnidadMedida } from "./UnidadMedida";
import { EntidadBancaria } from "./EntidadBancaria";

const Mantenimiento = () => {
  return (
    <RoutesWithNotFound>
      <>
        <Route path="/" element={<Navigate to={mantenimientoRoutes.LINEA} />} />
        <Route path={mantenimientoRoutes.LINEA} element={<Linea />} />
        <Route path={mantenimientoRoutes.MARCA} element={<Marca />} />
        <Route
          path={mantenimientoRoutes.UNIDADESMEDIDA}
          element={<UnidadMedida />}
        />
        <Route
          path={mantenimientoRoutes.DEPARTAMENTO}
          element={<Departamento />}
        />
        <Route path={mantenimientoRoutes.PROVINCIA} element={<Provincia />} />
        <Route path={mantenimientoRoutes.DISTRITO} element={<Distrito />} />
        <Route path={mantenimientoRoutes.TIPOCAMBIO} element={<TipoCambio />} />
        <Route
          path={mantenimientoRoutes.ENTIDADBANCARIA}
          element={<EntidadBancaria />}
        />
      </>
    </RoutesWithNotFound>
  );
};

export default Mantenimiento;
