export const initializeBoard = (prefill, fixed = true) => {
  const numbers = Array.from(new Array(9), (_, idx) => idx + 1);
  return numbers.reduce(
    (board, r, i) =>
      numbers.reduce((cells, c, j) => {
        const value = (prefill && prefill[i] && prefill[i][j]) || null;
        const clue = value ? fixed : false;
        cells[`${r}${c}`] = { value, clue };
        return cells;
      }, board),
    {}
  );
};
