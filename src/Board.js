import React from "react";
import PropTypes from "prop-types";

import { isPeer } from "./sudoku";
import Cell from "./Cell";

const Board = ({
  cells,
  selection: { cell: selectedCell, ...selection },
  updateCell,
  selectCell,
  moveSelect
}) => {
  const selectedValue =
    (selectedCell && cells[selectedCell].value) || undefined;
  return (
    <div className="board">
      {Object.entries(cells).map(([id, { value, clue, ...cell }], index) => (
        <Cell
          key={id}
          id={id}
          value={value}
          fixed={clue}
          selected={selectedCell === id}
          peer={isPeer(selection, cell)}
          same={selectedValue === value}
          selectCell={selectCell}
          updateCell={updateCell}
          moveSelect={moveSelect}
          tabIndex={index + 1}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  cells: PropTypes.object,
  selection: PropTypes.object,
  selectCell: PropTypes.func.isRequired,
  moveSelect: PropTypes.func.isRequired,
  updateCell: PropTypes.func.isRequired
};

export default Board;
