import { addId, removeRow } from "../../utils";

// action types
const LOAD_DATA = "LOAD_DATA";
const REMOVE_DATA = "REMOVE_DATA";

//reducer
const defaultState = {
  data: [],
};
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        data: addId(action.payload),
      };
    case REMOVE_DATA:
      return {
        ...state,
        data: removeRow(state.data, action.payload),
      };
    default:
      return state;
  }
}

//action creators
export function loadData() {
  const jsonData = require("../../data/example-data.json");
  return { type: LOAD_DATA, payload: jsonData };
}
export function removeData(dataId) {
  return { type: REMOVE_DATA, payload: dataId };
}
