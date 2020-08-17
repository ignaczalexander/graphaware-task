import React, { useEffect } from "react";
import Table from "../Table";
import { connect } from "react-redux";
import { loadData, removeData } from "../../redux/modules/data";
import styles from "./app.module.scss";

function App(props) {
  const { data, loadData, removeData } = props;

  useEffect(() => {
    loadData();
  }, [loadData]);

  function handleDelete(id) {
    removeData(id);
  }

  if (data.length === 0) return null;

  return (
    <div className={styles.container}>
      <Table rows={data} onRowDelete={handleDelete} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data.data,
});

export default connect(mapStateToProps, {
  loadData,
  removeData,
})(App);
