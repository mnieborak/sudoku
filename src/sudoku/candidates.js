import { useCallback, useMemo } from "react";
import { isPeer, generateId, inspectBoard, NUMBERS } from "./utils";

const findCandidates = (cell, filledCells) => {
  if (cell.value) {
    return [];
  } else {
    let candidates = new Set(NUMBERS);
    filledCells
      .filter((c) => isPeer(cell, c))
      .forEach((c) => candidates.delete(c.value));
    return Array.from(candidates);
  }
};

const findAllCandidates = (board) => {
  let filledCells = [];
  let emptyCells = [];
  Object.values(board).forEach((cell) => {
    if (cell.value) {
      filledCells.push(cell);
    } else {
      emptyCells.push(cell);
    }
  });
  return emptyCells.reduce((candidates, cell) => {
    candidates[generateId(cell)] = {
      candidates: findCandidates(cell, filledCells),
    };
    return candidates;
  }, {});
};

export const useCellCandidates = (selectedCell, board, updateCell) => {
  const boardString = inspectBoard(board);
  const filledCells = useMemo(
    () => Object.values(board).filter((c) => c.value),
    [boardString]
  );
  const updateCellCandidates = useCallback(
    () =>
      updateCell(generateId(selectedCell), {
        candidates: findCandidates(selectedCell, filledCells),
      }),
    [selectedCell, filledCells, updateCell]
  );
  return {
    updateCellCandidates,
  };
};

export const useAllCandidates = (board, updateCells) => {
  const boardString = inspectBoard(board);
  const updateAllCandidates = useCallback(
    () => updateCells(findAllCandidates(board)),
    [boardString, updateCells]
  );
  return {
    updateAllCandidates,
  };
};
