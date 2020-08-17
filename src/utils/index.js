import constants from "../constants";
const { KIDS_KEY, RECORDS_KEY } = constants;

export function isEmpty(object) {
  return Object.keys(object).length === 0;
}
export function addId(data, id = 0) {
  return data.map((row) => {
    row.id = id;
    id++;
    // map through the kids in the row and add IDs recursively
    const kidsKeys = Object.keys(row[KIDS_KEY]);
    if (kidsKeys.length > 0) {
      kidsKeys.forEach((key) => {
        row[KIDS_KEY][key] = {
          [RECORDS_KEY]: addId(row[KIDS_KEY][key][RECORDS_KEY], id),
        };
        id++;
      });
    }
    return row;
  });
}
export function removeRow(rows, id) {
  return rows
    .filter((subRow) => subRow.id !== id)
    .map((subRow) => {
      if (isEmpty(subRow[KIDS_KEY])) return subRow;
      Object.keys(subRow[KIDS_KEY]).forEach((key) => {
        const kidNode = subRow[KIDS_KEY][key];
        const newRecords = removeRow(kidNode[RECORDS_KEY], id);
        if (newRecords.length === 0) {
          delete subRow[KIDS_KEY][key];
        } else {
          subRow[KIDS_KEY][key][RECORDS_KEY] = newRecords;
        }
      });
      return subRow;
    });
}
