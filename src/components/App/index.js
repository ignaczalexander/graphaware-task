import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "../Table";
import { loadData, removeData } from "../../redux/modules/data";
import constants from "../../constants";
import styles from "./app.module.scss";
const { KIDS_KEY, DATA_KEY } = constants;

function App(props) {
  const { data, loadData, removeData } = props;

  useEffect(() => {
    loadData();
  }, [loadData]);

  function handleDelete(id) {
    removeData(id);
  }

  if (data.length === 0)
    return <div className={styles.empty}>There is no data to display</div>;

  return (
    <div className={styles.container}>
      <Table rows={data} onRowDelete={handleDelete} caption="JSON TABLE" />
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data.data,
});

App.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      [KIDS_KEY]: PropTypes.object,
      [DATA_KEY]: PropTypes.object,
    }).isRequired
  ).isRequired,
  loadData: PropTypes.func.isRequired,
  removeData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  loadData,
  removeData,
})(App);
