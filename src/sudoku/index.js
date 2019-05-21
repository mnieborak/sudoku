import { useReducer, useMemo } from "react";

// Board
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
  const actions = useMemo(
    () => ({
      updateCell: (id, cell) => dispatch(updateCell(id, cell))
    }),
    [dispatch, updateCell]
  );
  return [cells, actions];
};

// Selection
const extractRowAndColumn = id => {
  const [row, column] = (id || "").split("").map(i => parseInt(i));
  return { row, column };
};
const increment = i => (i && i < 9 ? i + 1 : i);
const decrement = i => (i && i > 1 ? i - 1 : i);

const SELECT_CELL = "SELECT_CELL";
export const MOVE_SELECT_UP = "MOVE_SELECT_UP";
export const MOVE_SELECT_DOWN = "MOVE_SELECT_DOWN";
export const MOVE_SELECT_LEFT = "MOVE_SELECT_LEFT";
export const MOVE_SELECT_RIGHT = "MOVE_SELECT_RIGHT";

const initialSelection = { row: null, column: null };
const selectionReducer = (state, action) => {
  switch (action.type) {
    case SELECT_CELL:
      return { ...state, ...extractRowAndColumn(action.id) };
    case MOVE_SELECT_UP:
      return { ...state, row: decrement(state.row) };
    case MOVE_SELECT_DOWN:
      return { ...state, row: increment(state.row) };
    case MOVE_SELECT_LEFT:
      return { ...state, column: decrement(state.column) };
    case MOVE_SELECT_RIGHT:
      return { ...state, column: increment(state.column) };
    default:
      return state;
  }
};

const selectCell = id => ({ type: SELECT_CELL, id });
const moveSelect = type => ({ type });

export const useSelection = () => {
  const [{ row, column }, dispatch] = useReducer(
    selectionReducer,
    initialSelection
  );
  const cell = useMemo(() => `${row || ""}${column || ""}`, [row, column]);
  const actions = useMemo(
    () => ({
      selectCell: id => dispatch(selectCell(id)),
      moveSelect: type => dispatch(moveSelect(type))
    }),
    [dispatch, selectCell]
  );
  return [{ row, column, cell }, actions];
};
