import React from "react";

import { useBoard, useSelection, useMode } from "./sudoku";
import Board from "./Board";
import Controls from "./Controls";

const App = () => {
  const [
    cells,
    { updateCell, clearBoard, resetBoard, fixBoard, unfixBoard }
  ] = useBoard();
  const [selection, { selectCell, moveSelect }] = useSelection();
  const [mode, setMode] = useMode();
  return (
    <div className="app">
      <h1>Sudoku</h1>
      <Board
        cells={cells}
        selection={selection}
        selectCell={selectCell}
        updateCell={updateCell}
        moveSelect={moveSelect}
      />
      <Controls
        mode={mode}
        setMode={setMode}
        clearBoard={clearBoard}
        resetBoard={resetBoard}
        fixBoard={fixBoard}
        unfixBoard={unfixBoard}
      />
    </div>
  );
};

export default App;
