import React from "react";
import PropTypes from "prop-types";
import { useTable } from "react-table";

import tablestyles from "assets/css/table.module.css";

const Table = ({ data, definition }) => {
  const columns = React.useMemo(
    () => [
      //avoid rerendering all data on re-render
      ...definition,
    ],
    [definition]
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    // apply the table props
    <div className={tablestyles.table}>
      <table {...getTableProps()} className="table">
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              //apply the header row props
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className={tablestyles.tr}
              >
                {
                  // loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // apply the header cell props
                    <th className={tablestyles.th} {...column.getHeaderProps()}>
                      {
                        //render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props*/}
        <tbody {...getTableBodyProps()}>
          {
            //loop over the table rows
            rows.map((row) => {
              // prepare the row for display
              prepareRow(row);
              return (
                //apply the props
                <tr className={tablestyles.tr} {...row.getRowProps()}>
                  {
                    //loop over the row cells
                    row.cells.map((cell) => {
                      //apply the cell props
                      return (
                        <td className={tablestyles.td} {...cell.getCellProps()}>
                          {
                            //render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
};

export default Table;
