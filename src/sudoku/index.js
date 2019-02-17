import { useReducer } from "react";

const initializeBoard = (prefill, fixed = true) => {
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

const UPDATE_CELL = "UPDATE_CELL";

const boardReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CELL:
      return { ...state, [action.id]: { ...state[action.id], ...action.cell } };
    default:
      return state;
  }
};

const updateCell = (id, cell) => ({ type: UPDATE_CELL, id, cell });

export const useBoard = ({ board, fixed = true } = {}) => {
  const [cells, dispatch] = useReducer(boardReducer, board, b =>
    initializeBoard(b, fixed)
  );
  return [cells, { updateCell: (id, cell) => dispatch(updateCell(id, cell)) }];
};
