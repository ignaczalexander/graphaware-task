import React from "react";
import Row from "../Row";
import styles from "./table.module.scss";
import constants from "../../constants";

export default function Table(props) {
  const { rows, indent, onRowDelete } = props;
  const { DATA_KEY } = constants;

  function getTableHeaders() {
    return Object.keys(rows[0][DATA_KEY]).map((key) => (
      <th key={key}>{key}</th>
    ));
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          {getTableHeaders()}
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
