import { useReducer, useMemo } from "react";
import { NUMBERS } from "./utils";

const initializeBoard = (prefill, fixed = true) => {
  return NUMBERS.reduce(
    (board, r, i) =>
      NUMBERS.reduce((cells, c, j) => {
        const value = (prefill && prefill[i] && prefill[i][j]) || null;
        const clue = value ? fixed : false;
        cells[`${r}${c}`] = {
          row: r,
          column: c,
          value,
          clue,
          candidates: [],
        };
        return cells;
      }, board),
    {}
  );
};

const UPDATE_CELL = "UPDATE_CELL";
const CLEAR_BOARD = "CLEAR_BOARD";
const RESET_BOARD = "RESET_BOARD";
const FIX_BOARD = "FIX_BOARD";
const UNFIX_BOARD = "UNFIX_BOARD";

const boardReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CELL:
      return { ...state, [action.id]: { ...state[action.id], ...action.cell } };
    case CLEAR_BOARD:
      return Object.entries(state).reduce((board, [id, cell]) => {
        board[id] = { ...cell, value: null, clue: false, candidates: [] };
        return board;
      }, {});
    case RESET_BOARD:
      return Object.entries(state).reduce((board, [id, cell]) => {
        board[id] = cell.clue
          ? cell
          : { ...cell, value: null, clue: false, candidates: [] };
        return board;
      }, {});
    case FIX_BOARD:
      return Object.entries(state).reduce((board, [id, cell]) => {
        board[id] = cell.value ? { ...cell, clue: true } : cell;
        return board;
      }, {});
    case UNFIX_BOARD:
      return Object.entries(state).reduce((board, [id, cell]) => {
        board[id] = cell.clue ? { ...cell, clue: false } : cell;
        return board;
      }, {});
    default:
      return state;
  }
};

const updateCell = (id, cell) => ({ type: UPDATE_CELL, id, cell });
const clearBoard = () => ({ type: CLEAR_BOARD });
const resetBoard = () => ({ type: RESET_BOARD });
const fixBoard = () => ({ type: FIX_BOARD });
const unfixBoard = () => ({ type: UNFIX_BOARD });

export const useBoard = ({ board, fixed = true } = {}) => {
  const [cells, dispatch] = useReducer(boardReducer, board, (b) =>
    initializeBoard(b, fixed)
  );
  const actions = useMemo(
    () => ({
      updateCell: (id, cell) => dispatch(updateCell(id, cell)),
      clearBoard: () => dispatch(clearBoard()),
      resetBoard: () => dispatch(resetBoard()),
      fixBoard: () => dispatch(fixBoard()),
      unfixBoard: () => dispatch(unfixBoard()),
    }),
    [dispatch]
  );
  return [cells, actions];
};
