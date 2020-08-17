import React, { useEffect } from "react";
import Table from "./components/Table";
import { connect } from "react-redux";
import { loadData, removeData } from "./redux/modules/data";

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
    <div style={{ padding: "1em" }}>
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
