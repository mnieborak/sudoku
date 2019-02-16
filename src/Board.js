import React from "react";
import PropTypes from "prop-types";

import Cell from "./Cell";

const Board = ({ cells }) => (
  <div className="board">
    {Object.entries(cells).map(([id, { value, clue }]) => (
      <Cell key={id} id={id} value={value} fixed={clue} />
    ))}
  </div>
);

Board.propTypes = {
  cells: PropTypes.object
};

export default Board;
