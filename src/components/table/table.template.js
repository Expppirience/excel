const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_SIZES = {
  width: 120,
  height: 25,
};

const createCell = (row, index, width, value) => {
  return `
	<div class="cell" contenteditable style="width: ${width}px" data-id="${row}:${index}" data-column-parent="${index}">
    ${value}
  </div>
  `;
};

const createCol = (index, col, width, value) => {
  return `
		<div class="column" style="width: ${width}px"  data-parent="column" data-column="${index}">
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
      .map((_, i) =>
        createCell(
          row - 1,
          i,
          getWidth(state.colState, i),
          getText(state.cellsState, row - 1, i)
        )
      )
      .join("");
    rows.push(createRow(row, cells, getHeight(state.rowState, row)));
  }

  return rows.join("");
}
