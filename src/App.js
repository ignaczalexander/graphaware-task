import React, { useState } from "react";
import source from "./data/example-data.json";
import Table from "./components/Table";
import { addId, removeRow } from "./utils";

export default function App() {
  const [data, setData] = useState(addId(source));
  console.log("initial data", data);

  function handleDelete(id) {
    const newData = removeRow(data, id);
    setData(newData);
    console.log("newData", newData);
  }

  return (
    <div style={{ padding: "1em" }}>
      <Table rows={data} onRowDelete={handleDelete} />
    </div>
  );
}
