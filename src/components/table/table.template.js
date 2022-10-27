const CODES = {
  A: 65,
  Z: 90,
};

const createCell = () => {
  return `
	<div class="cell" contenteditable></div>
  `;
};

const createCol = (col) => {
  return `
		<div class="column">
			${col}
		</div>
	`;
};

const createRow = (content, cells) => {
  return `
		<div class="row">
			<div class="row-info">${content ? content : ""}</div>
			<div class="row-data">${cells}</div>
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

  const cols = colsArray.map((_, i) => createCol(toChar(i))).join("");
  const cells = colsArray.map((_, i) => createCell()).join("");

  rows.push(createRow(null, cols));
  for (let i = 1; i < rowsCount + 1; i++) {
    rows.push(createRow(i, cells));
  }

  return rows.join("");
}
