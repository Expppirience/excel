import { storage } from "./../core/utils";

const defaultState = {
  rowState: {},
  colState: {},
  cellsState: {},
  currentText: "",
};

export const initialState = storage("excel-state", false)
  ? storage("excel-state", false)
  : defaultState;
