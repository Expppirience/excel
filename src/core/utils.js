export function capitalize(str) {
  if (typeof str !== "string") {
    return;
  }
  return str[0].toUpperCase() + str.slice(1);
}

export function range(start, end) {
  start > end ? ([end, start] = [start, end]) : "";

  return new Array(++end - start).fill("").map((_, index) => {
    return start + index;
  });
}

export function storage(key, shouldDelete, data = null) {
  if (!data) return JSON.parse(localStorage.getItem(key));
  !shouldDelete
    ? localStorage.setItem(key, JSON.stringify(data))
    : localStorage.removeItem(key);
}

export function isEqual(a, b) {
  if (typeof a === "object" && typeof b === "object") {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
