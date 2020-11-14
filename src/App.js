import React from "react";

import {
  useBoard,
  useSelection,
  useMode,
  useConflicts,
  useCellCandidates,
  useAllCandidates,
} from "./sudoku";
import Board from "./Board";
import Controls from "./Controls";

const App = () => {
  const [
    cells,
    { updateCell, clearBoard, resetBoard, fixBoard, unfixBoard, updateCells },
  ] = useBoard();
  const conflicts = useConflicts(cells);
  const [selection, { selectCell, moveSelect }] = useSelection();
  const [mode, setMode] = useMode();
  const { updateCellCandidates } = useCellCandidates(
    selection,
    cells,
    updateCell
  );
  const { updateAllCandidates } = useAllCandidates(cells, updateCells);
  return (
    <div className="app">
      <h1>Sudoku</h1>
      <Board
        mode={mode}
        cells={cells}
        selection={selection}
        selectCell={selectCell}
        updateCell={updateCell}
        moveSelect={moveSelect}
        conflicts={conflicts}
      />
      <Controls
        mode={mode}
        setMode={setMode}
        clearBoard={clearBoard}
        resetBoard={resetBoard}
        fixBoard={fixBoard}
        unfixBoard={unfixBoard}
        updateCellCandidates={updateCellCandidates}
        updateAllCandidates={updateAllCandidates}
      />
    </div>
  );
};

export default App;
