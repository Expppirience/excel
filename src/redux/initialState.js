import { clone, storage } from "./../core/utils";
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

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  curentText: "",
});

export const initialState = storage("excel-state", false)
  ? storage("excel-state", false)
  : defaultState;

export function normalizeIntitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
