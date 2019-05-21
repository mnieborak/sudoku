import React from "react";

import { useBoard, useSelection } from "./sudoku";
import Board from "./Board";

const App = () => {
  const [cells, { updateCell }] = useBoard();
  const [{ cell }, { selectCell, moveSelect }] = useSelection();
  return (
    <div className="app">
      <h1>Sudoku</h1>
      <Board
        cells={cells}
        selectedCellId={cell}
        selectCell={selectCell}
        updateCell={updateCell}
        moveSelect={moveSelect}
      />
    </div>
  );
};

export default App;
