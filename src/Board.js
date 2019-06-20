import React from "react";
import PropTypes from "prop-types";

import Cell from "./Cell";

const isPeer = ({ row, column }, { row: r, column: c }) =>
  row === r ||
  column === c ||
  (Math.ceil(row / 3) === Math.ceil(r / 3) &&
    Math.ceil(column / 3) === Math.ceil(c / 3));

const Board = ({
  cells,
  selection: { cell: selectedCell, ...selection },
  updateCell,
  selectCell,
  moveSelect
}) => (
  <div className="board">
    {Object.entries(cells).map(([id, { value, clue, ...cell }], index) => (
      <Cell
        key={id}
        id={id}
        value={value}
        fixed={clue}
        selected={selectedCell === id}
        highlighted={isPeer(selection, cell)}
        selectCell={selectCell}
        updateCell={updateCell}
        moveSelect={moveSelect}
        tabIndex={index + 1}
      />
    ))}
  </div>
);

Board.propTypes = {
  cells: PropTypes.object,
  selection: PropTypes.object,
  selectCell: PropTypes.func.isRequired,
  moveSelect: PropTypes.func.isRequired,
  updateCell: PropTypes.func.isRequired
};

export default Board;
