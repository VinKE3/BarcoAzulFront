import { Navigate, Route } from "react-router-dom";
import { comprasRoutes } from "../../common";
import { RoutesWithNotFound } from "../../util";
import { DocumentoCompra  } from "./DocumentoCompra";
import DocumentoCompraForm from "./DocumentoCompra/components/Form/DocumentoCompra.form";
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
        <Route
          path={comprasRoutes.TODASLASCOMPRAS_FORMULARIO}
          element={<DocumentoCompraForm />}
        />
      </>
    </RoutesWithNotFound>
  );
};

export default Compras;
