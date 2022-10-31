import { storage } from "./../core/utils";
import { defaultStyles, defaultTitle } from "./../constants";

const defaultState = {
  currentTitle: defaultTitle,
  rowState: {},
  colState: {},
  cellsState: {},
  stylesState: {},
  currentText: "",
  currentStyles: defaultStyles,
};

export const initialState = storage("excel-state", false)
  ? storage("excel-state", false)
  : defaultState;

