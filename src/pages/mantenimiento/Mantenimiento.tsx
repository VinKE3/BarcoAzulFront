import { Navigate, Route } from "react-router-dom";
import { mantenimientoRoutes } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { Linea } from "./Linea";

const Mantenimiento = () => {
  return (
    <RoutesWithNotFound>
      <>
        <Route path="/" element={<Navigate to={mantenimientoRoutes.LINEA} />} />
        <Route path={mantenimientoRoutes.LINEA} element={<Linea />} />
      </>
    </RoutesWithNotFound>
  );
};

export default Mantenimiento;
