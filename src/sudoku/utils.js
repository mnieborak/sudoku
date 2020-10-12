export const NUMBERS = Array.from(new Array(9), (_, idx) => idx + 1);

export const isPeer = ({ row, column }, { row: r, column: c }) =>
  row === r ||
  column === c ||
  (Math.ceil(row / 3) === Math.ceil(r / 3) &&
    Math.ceil(column / 3) === Math.ceil(c / 3));

export const extractRowAndColumn = (id) => {
  const [row, column] = (id || "").split("").map((i) => parseInt(i));
  return { row, column };
};

export const generateId = ({ row, column }) => `${row || ""}${column || ""}`;

export const inspectBoard = (cells, formatted = false) =>
  Object.values(cells).reduce(
    (str, cell, idx) =>
      `${str}${cell.value || "."}${(formatted && idx % 9 === 8 && "\n") || ""}`,
    ""
  );

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const boardFromString = (boardStr, lineSeparator = "") => {
  if (lineSeparator) {
    const lines = boardStr.split(lineSeparator);
    return lines.map((line) => line.split("").map((c) => parseInt(c)));
  } else {
    const cells = boardStr.split("").map((c) => parseInt(c));
    return chunk(cells, 9);
  }
};
