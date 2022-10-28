export function capitalize(str) {
  if (typeof str !== "string") {
    return;
  }
  return str[0].toUpperCase() + str.slice(1);
}

export function range(start, end) {
  start > end ? ([end, start] = [start, end]) : "";

  return new Array(++end - start).fill("").map((_, index) => {
    console.log(index, "INDEX");
    return start + index;
  });
}
