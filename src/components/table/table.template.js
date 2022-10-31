import { stringifyStyle } from "../../core/utils";
import { defaultStyles } from "./../../constants";
import { parse } from "./../../core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_SIZES = {
  width: 120,
  height: 25,
};

const createCell = (state, row, index) => {
  const id = `${row}:${index}`;
  const width = getWidth(state.colState, index);
  const value = state.cellsState[id] ? state.cellsState[id] : "";
  const styles = {
    ...defaultStyles,
    ...state.stylesState[id],
  };

  return `
	<div class="cell" contenteditable data-value="${value}" style="${stringifyStyle(
    styles
  )} width: ${width}px" data-id="${id}" data-column-parent="${index}">
    ${parse(value)}
  </div>
  `;
};
const createCol = (index, col, width, value) => {
  return `
		<div class="column" style=" width: ${width}px"   data-parent="column" data-column="${index}">
			${col}
      <span class="col-resize" data-resize="col">${value || ""}</span>
    </div>
	`;
};

const createRow = (index, cells, height) => {
  const resize = index
    ? '<span class="row-resize" data-resize="row"></span>'
    : "";
  return `
		<div class="row" data-parent="row" style="height: ${height}px" data-row="${
    index ? index : ""
  }">
			<div class="row-info">
        ${index ? index : ""}
        ${resize}
      </div>
			<div class="row-data">${cells}</div>
		</div>
	
	`;
};

const getWidth = (state, index) => state[index] || DEFAULT_SIZES.width;

const getHeight = (state, index) => state[index] || DEFAULT_SIZES.height;

const getText = (state, row, column) => state[`${row}:${column}`] || "";

const toChar = (i) => {
  return String.fromCharCode(CODES.A + i);
};

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = ++CODES.Z - CODES.A;
  const colsArray = new Array(colsCount).fill("");
  const rows = [];

  const cols = colsArray
    .map((_, i) => createCol(i, toChar(i), getWidth(state.colState, i)))
    .join("");
  rows.push(createRow(null, cols, DEFAULT_SIZES.height));
  for (let row = 1; row < rowsCount + 1; row++) {
    const cells = colsArray
      .map((_, i) => createCell(state, row - 1, i))
      .join("");
    rows.push(createRow(row, cells, getHeight(state.rowState, row)));
  }

  return rows.join("");
}
