import React, { useState } from "react";
import styles from "./row.module.scss";
import classnames from "classnames";
import Table from "../Table";
import { isEmpty } from "../../utils";
import constants from "../../constants";

export default function Row(props) {
  const { DATA_KEY, KIDS_KEY, RECORDS_KEY } = constants;
  const { rowData, indent, onRowDelete } = props;
  const { [DATA_KEY]: data, [KIDS_KEY]: kids } = rowData;

  const [isOpen, setIsOpen] = useState(false);

  const hasKids = !isEmpty(kids);

  function handleDelete(e) {
    e.stopPropagation();
    onRowDelete(rowData.id);
  }

  function getNestedTable() {
    if (!hasKids) return null;
    return Object.keys(kids).map((key) => (
      <tr
        key={key}
        className={classnames(styles.nested_row, {
          [styles.is_open]: isOpen,
        })}
      >
        <td colSpan="100%" style={{ paddingLeft: indent * 20 }}>
          <div>
            <Table
              rows={kids[key][RECORDS_KEY]}
              indent={indent + 1}
              onRowDelete={onRowDelete}
              caption={key.toUpperCase()}
            />
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <React.Fragment>
      <tr
        className={classnames({ [styles.pointer]: hasKids })}
        onClick={() => setIsOpen(hasKids && !isOpen)}
      >
        <td className={styles.control}>
          {hasKids && (
            <i
              className={classnames(styles.arrow, {
                [styles.arrow_down]: isOpen,
                [styles.arrow_right]: !isOpen,
              })}
            ></i>
          )}
        </td>

        {Object.keys(data).map((key) => (
          <td key={key}>{data[key]}</td>
        ))}

        <td className={styles.control}>
          <button
            aria-label="Delete row"
            onClick={handleDelete}
            className={styles.delete}
          >
            <div className={styles.delete_icon}></div>
          </button>
        </td>
      </tr>

      {isOpen && getNestedTable()}
    </React.Fragment>
  );
}
