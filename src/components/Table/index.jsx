import React from "react";
import PropTypes from "prop-types";
import Row from "../Row";
import styles from "./table.module.scss";
import constants from "../../constants";
const { DATA_KEY, KIDS_KEY } = constants;

export default function Table(props) {
  const { rows, indent, onRowDelete, caption } = props;

  function getTableHeaders() {
    return Object.keys(rows[0][DATA_KEY]).map((key) => (
      <th key={key}>{key}</th>
    ));
  }

  return (
    <table className={styles.table}>
      <caption>{caption}</caption>
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
  caption: "",
};
Table.propTypes = {
  indent: PropTypes.number,
  caption: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      [KIDS_KEY]: PropTypes.object,
      [DATA_KEY]: PropTypes.object,
    }).isRequired
  ).isRequired,
  onRowDelete: PropTypes.func.isRequired,
};
