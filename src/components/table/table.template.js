const CODES = {
  A: 65,
  Z: 90,
};

const createCell = (row, index) => {
  return `
	<div class="cell" contenteditable data-id="${row}:${index}" data-column-parent="${index}"></div>
  `;
};

const createCol = (index, col) => {
  return `
		<div class="column" data-parent="column" data-column="${index}">
			${col}
      <span class="col-resize" data-resize="col"></span>
    </div>
	`;
};

const createRow = (index, cells) => {
  const resize = index
    ? '<span class="row-resize" data-resize="row"></span>'
    : "";
  return `
		<div class="row" data-parent="row">
			<div class="row-info">
        ${index ? index : ""}
        ${resize}
      </div>
			<div class="row-data" data-row="${index ? index : ""}">${cells}</div>
		</div>
	
	`;
};

const toChar = (i) => {
  return String.fromCharCode(CODES.A + i);
};

export function createTable(rowsCount = 15) {
  const colsCount = ++CODES.Z - CODES.A;
  const colsArray = new Array(colsCount).fill("");
  const rows = [];

  const cols = colsArray.map((_, i) => createCol(i, toChar(i))).join("");
  rows.push(createRow(null, cols));
  for (let row = 1; row < rowsCount + 1; row++) {
    const cells = colsArray.map((_, i) => createCell(row - 1, i)).join("");
    rows.push(createRow(row, cells));
  }

  return rows.join("");
}
