import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  LAST_SEEN,
} from "./types";

export function rootReducer(state, action) {
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type == "row" ? "rowState" : "colState";
      return { ...state, [field]: getValue(state, field, action) };
    case CHANGE_TEXT:
      field = "cellsState";
      return {
        ...state,
        currentText: action.data.value,
        [field]: getValue(state, field, action),
      };
    case CHANGE_STYLES:
      return { ...state, currentStyles: action.data };
    case APPLY_STYLE:
      field = "stylesState";
      const prevState = state[field] || {};
      action.data.ids.forEach(
        (id) => (prevState[id] = { ...prevState[id], ...action.data.style })
      );
      return {
        ...state,
        [field]: prevState,
      };
    case CHANGE_TITLE:
      field = "currentTitle";
      return { ...state, [field]: action.data };
    case LAST_SEEN:
      field = "lastSeen";
      return { ...state, [field]: action.data.toLocaleDateString(undefined) };
    default:
      return state;
  }
}

function getValue(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
