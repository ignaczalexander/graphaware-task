import React, { useState } from "react";
import source from "./data/example-data.json";
import Table from "./components/Table";

function App() {
  function prepareData(data) {
    let id = 0;
    function addId(data) {
      return data.map((row) => {
        let newRow = {};

        newRow = { id, data: row.data, kids: {} };
        id++;

        if (Object.keys(row.kids).length === 0) {
          return newRow;
        }
        const keyName = Object.keys(row.kids)[0];
        newRow.kids[keyName] = { records: addId(row.kids[keyName].records) };
        return newRow;
      });
    }
    return addId(data);
  }
  const [data, setData] = useState(prepareData(source));
  console.log("initial data", data);

  function handleDelete(rowToDelete) {
    console.log("delete in app", rowToDelete);
    const updatedData = data.filter((row) => row.id !== rowToDelete.id);
    console.log(updatedData);
    setData(updatedData);
  }

  return (
    <div>
      <Table rows={data} onRowDelete={handleDelete} />
    </div>
  );
}

export default App;
