import React from "react";
import styles from "./table.module.scss";
import Row from "../Row";

function Table(props) {
  const { rows, indent, onRowDelete } = props;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          {Object.keys(rows[0].data).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <Row
            key={row.id}
            rowData={row}
            indent={indent}
            onRowDelete={onRowDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

Table.defaultProps = {
  indent: 1,
};

export default Table;
