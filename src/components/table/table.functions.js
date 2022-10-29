import { $ } from "../../core/dom";
import { range } from "../../core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.closest("[data-column-parent]");
}

export function renderMatrix(targetID, currentID) {
  const cols = range(currentID.col, targetID.col);
  const rows = range(currentID.row, targetID.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(event) {
  const keyMap = {
    ArrowLeft: (col, row) => [row, col - 1],
    ArrowRight: (col, row) => [row, col + 1],
    ArrowUp: (col, row) => [row - 1, col],
    ArrowDown: (col, row) => [row + 1, col],
    Enter: (col, row) => [row + 1, col],
    Tab: (col, row) => [row, col + 1],
  };

  const currentKey = keyMap[event.key];
  if (currentKey && !event.shiftKey) {
    event.preventDefault();
    const $cell = $(event.target);
    const { col, row } = $cell.id(true);
    const deltaID = currentKey(col, row);
    return deltaID;
  }
  return;
}
