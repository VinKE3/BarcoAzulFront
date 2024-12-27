import { Navigate, Route } from "react-router-dom";
import { comprasRoutes } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { DocumentoCompra } from "./DocumentoCompra";
const Compras = () => {
  return (
    <RoutesWithNotFound>
      <>
        <Route
          path="/"
          element={<Navigate to={comprasRoutes.TODASLASCOMPRAS} />}
        />
        <Route
          path={comprasRoutes.TODASLASCOMPRAS}
          element={<DocumentoCompra />}
        />
      </>
    </RoutesWithNotFound>
  );
};

export default Compras;
