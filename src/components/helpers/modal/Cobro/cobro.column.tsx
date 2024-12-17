// columnsConfig.ts

import { useMemo } from "react";
import { Column } from "react-table";
import { ICobroHelpTable } from "../../../../models";
import { handleFormatRowDate, handleMonedaRow, handleNumber } from "../../../../util";
import { ActionBar } from "../../../ActionBar";

const useCobroHelpColumn = (id: string, isApi: boolean): Column<ICobroHelpTable>[] => {
  return useMemo<Column<ICobroHelpTable>[]>(
    () => [
      {
        Header: "Item",
        accessor: "item",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Fecha",
        accessor: "fechaCobro",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{handleFormatRowDate(value)}</p>;
        },
      },
      {
        Header: "Tipo Cobro",
        accessor: "tipoCobroDescripcion",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      // {
      //   Header: "Cuenta Corriente",
      //   accessor: "cuentaBancariaDescripcion",
      //   Cell: ({ value }: { value: string }) => {
      //     return <p className="text-center">{value ?? "-"}</p>;
      //   },
      // },
      {
        Header: "Observación",
        accessor: "observacion",
        Cell: ({ value }: { value: string | null }) => {
          return <p className="text-center">{value ?? "-"}</p>;
        },
      },
      {
        Header: "M",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{handleMonedaRow(value)}</p>;
        },
      },
      {
        Header: "Monto",
        accessor: "montoPEN",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true)}</p>;
        },
      },
      // {
      //   Header: "Tipo Cambio",
      //   accessor: "tipoCambio",
      //   Cell: ({ value }: { value: number }) => {
      //     return <p className="table-body-td-right">{handleNumber(value, false, true)}</p>;
      //   },
      // },
      // {
      //   Header: "Monto",
      //   accessor: "montoPEN",
      //   Cell: ({ row }: { row: { original: ICobroHelpTable } }) => {
      //     const { montoPEN, montoUSD } = row.original;
      //     return (
      //       <div className="table-base-td-multiple">
      //         <div className="table-base-td-container">
      //           <p className="table-base-td-text">S/:</p>
      //           <p className="table-base-td-number">{handleNumber(montoPEN, false, true)}</p>
      //         </div>
      //         <div className="table-base-td-container">
      //           <p className="table-base-td-text">US$:</p>
      //           <p className="table-base-td-number">{handleNumber(montoUSD, false, true)}</p>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
      {
        Header: "-",
        Cell: ({ row }: { row: { original: ICobroHelpTable } }) => (
          <ActionBar
            id={id + row.original.item}
            rowData={{ ...row.original, origen: "cobroDetalle" }}
            modalProp="tercer"
            tipoModalProp="tipoModal"
            isAdminPermisos={true}
            returnRetorno={isApi ? false : true}
            showConsultar={false}
            showModificar={false}
          />
        ),
      },
    ],
    []
  );
};

export default useCobroHelpColumn;
