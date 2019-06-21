export const isPeer = ({ row, column }, { row: r, column: c }) =>
  row === r ||
  column === c ||
  (Math.ceil(row / 3) === Math.ceil(r / 3) &&
    Math.ceil(column / 3) === Math.ceil(c / 3));
