import React, { useState } from "react";
import styles from "./row.module.scss";
import classnames from "classnames";
import Table from "../Table";

function Row(props) {
  const { rowData, indent, onRowDelete } = props;
  const { data, kids } = rowData;
  const [isOpen, setIsOpen] = useState(false);
  const hasKids = Object.keys(kids).length > 0;

  function handleDelete(e) {
    e.stopPropagation();
    console.log("delete", rowData);
    onRowDelete(rowData);
  }
  function handleOpen(e) {
    console.log("!!open clicked");
    console.log(e.currentTarget);
    setIsOpen(!isOpen);
  }

  let kidsElement;
  if (hasKids) {
    const kidsElementTitle = Object.keys(kids)[0];
    kidsElement = (
      <tr
        className={classnames(styles.nested_row, { [styles.is_open]: isOpen })}
      >
        <td colSpan="100%" style={{ paddingLeft: indent * 20 }}>
          <div>
            <div>{kidsElementTitle.toUpperCase()}</div>
            <Table
              rows={kids[kidsElementTitle].records}
              indent={indent + 1}
              onRowDelete={onRowDelete}
            />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <React.Fragment>
      <tr className={hasKids ? styles.pointer : ""} onClick={handleOpen}>
        <td className={styles.control}>
          {hasKids && (
            <i
              className={`${styles.arrow} ${
                isOpen ? styles.arrow_down : styles.arrow_right
              }`}
            ></i>
          )}
        </td>
        {Object.keys(data).map((key) => {
          return <td key={key}>{data[key]}</td>;
        })}
        <td className={styles.control}>
          <button onClick={handleDelete} className={styles.plain}>
            <div className={styles.delete}></div>
          </button>
        </td>
      </tr>
      {isOpen && kidsElement}
    </React.Fragment>
  );
}

export default Row;
