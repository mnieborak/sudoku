import React from "react";

import { useBoard } from "./sudoku";
import Board from "./Board";

const App = () => {
  const [cells, { updateCell }] = useBoard({
    board: [[1, 0, 0, 2], [4, 0, 3]],
    fixed: true
  });
  return (
    <div className="app">
      <h1>Sudoku</h1>
      <Board cells={cells} updateCell={updateCell} />
    </div>
  );
};

export default App;
