import React from "react";
import PropTypes from "prop-types";

import { isPeer, MODES } from "./sudoku";
import Cell from "./Cell";

const Board = ({
  mode,
  cells,
  selection: { cell: selectedCell, ...selection },
  updateCell,
  selectCell,
  moveSelect,
  conflicts,
}) => {
  const selectedValue =
    (selectedCell && cells[selectedCell].value) || undefined;
  return (
    <div className="board">
      {Object.entries(cells).map(
        ([id, { value, clue, candidates, ...cell }], index) => (
          <Cell
            key={id}
            mode={mode}
            id={id}
            value={value}
            fixed={clue}
            candidates={candidates}
            selected={selectedCell === id}
            peer={isPeer(selection, cell)}
            same={selectedValue === value}
            selectCell={selectCell}
            updateCell={updateCell}
            moveSelect={moveSelect}
            conflict={conflicts[id] || false}
            tabIndex={index + 1}
          />
        )
      )}
    </div>
  );
};

Board.propTypes = {
  mode: PropTypes.oneOf(MODES).isRequired,
  cells: PropTypes.object,
  selection: PropTypes.object,
  selectCell: PropTypes.func.isRequired,
  moveSelect: PropTypes.func.isRequired,
  updateCell: PropTypes.func.isRequired,
  conflicts: PropTypes.object,
};

export default Board;
