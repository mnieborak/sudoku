import { useMemo } from "react";
import { isPeer, generateId, inspectBoard } from "./utils";

const findSamePeers = (cells) => {
  if (cells.length <= 1) return [];
  let unchecked = [...cells];
  let conflicted = [];
  while (unchecked.length > 0) {
    let first = unchecked.shift();
    let peers = [first];
    let queue = [first];
    while (queue.length > 0) {
      let shifted = queue.shift();
      let rest = [];
      while (unchecked.length > 0) {
        let cell = unchecked.shift();
        if (isPeer(shifted, cell)) {
          queue.push(cell);
          peers.push(cell);
        } else {
          rest.push(cell);
        }
      }
      unchecked = rest;
    }
    if (peers.length > 1) {
      conflicted = conflicted.concat(peers);
    }
  }
  return conflicted;
};

const findConflicts = (board) => {
  const cells = Object.values(board);
  const filledPerValue = {};
  cells.forEach((cell) => {
    if (cell.value) {
      const sames = filledPerValue[cell.value];
      if (sames) {
        sames.push(cell);
      } else {
        filledPerValue[cell.value] = [cell];
      }
    }
  });
  const conflicted = Object.values(filledPerValue).reduce(
    (all, sames) => all.concat(findSamePeers(sames)),
    []
  );
  return conflicted.reduce((conflicts, cell) => {
    conflicts[generateId(cell)] = true;
    return conflicts;
  }, {});
};

export const useConflicts = (board) => {
  const boardString = inspectBoard(board);
  const conflicts = useMemo(() => findConflicts(board), [boardString]);
  return conflicts;
};
