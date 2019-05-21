import React from "react";
import PropTypes from "prop-types";

import Cell from "./Cell";

const Board = ({
  cells,
  selectedCellId,
  updateCell,
  selectCell,
  moveSelect
}) => (
  <div className="board">
    {Object.entries(cells).map(([id, { value, clue }], index) => (
      <Cell
        key={id}
        id={id}
        value={value}
        fixed={clue}
        selected={selectedCellId === id}
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
  selectedCellId: PropTypes.string,
  selectCell: PropTypes.func.isRequired,
  moveSelect: PropTypes.func.isRequired,
  updateCell: PropTypes.func.isRequired
};

export default Board;
