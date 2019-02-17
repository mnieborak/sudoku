import React from "react";
import PropTypes from "prop-types";

import Cell from "./Cell";

const Board = ({ cells, updateCell }) => (
  <div className="board">
    {Object.entries(cells).map(([id, { value, clue }], index) => (
      <Cell
        key={id}
        id={id}
        value={value}
        fixed={clue}
        updateCell={updateCell}
        tabIndex={index}
      />
    ))}
  </div>
);

Board.propTypes = {
  cells: PropTypes.object,
  updateCell: PropTypes.func.isRequired
};

export default Board;
