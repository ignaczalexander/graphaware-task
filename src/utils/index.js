import constants from "../constants";
const { KIDS_KEY, RECORDS_KEY } = constants;

export function isEmpty(object) {
  return Object.keys(object).length === 0;
}
export function addId(data) {
  function recursiveAdd(data, getId) {
    return data.map((row) => {
      row.id = getId();
      // map through the kids in the row and add IDs recursively
      const kidsKeys = Object.keys(row[KIDS_KEY]);
      if (kidsKeys.length > 0) {
        kidsKeys.forEach((key) => {
          row[KIDS_KEY][key] = {
            [RECORDS_KEY]: recursiveAdd(row[KIDS_KEY][key][RECORDS_KEY], getId),
          };
        });
      }
      return row;
    });
  }
  let startId = 0;
  return recursiveAdd(data, () => startId++);
}
export function removeRow(rows, id) {
  return rows
    .filter((subRow) => subRow.id !== id)
    .map((subRow) => {
      if (!isEmpty(subRow[KIDS_KEY])) {
        Object.keys(subRow[KIDS_KEY]).forEach((key) => {
          const kidNode = subRow[KIDS_KEY][key];
          const newRecords = removeRow(kidNode[RECORDS_KEY], id);
          if (newRecords.length === 0) {
            delete subRow[KIDS_KEY][key];
          } else {
            subRow[KIDS_KEY][key][RECORDS_KEY] = newRecords;
          }
        });
      }
      return subRow;
    });
}
