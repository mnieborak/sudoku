import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { MODE_EDITING, MODE_SOLVING, MODES } from "../sudoku";
import EditingControls from "./EditingControls";
import SolvingControls from "./SolvingControls";

const Controls = ({
  mode,
  setMode,
  fixBoard,
  unfixBoard,
  clearBoard,
  resetBoard,
}) => {
  const handleClickPlay = useCallback(() => {
    setMode(MODE_SOLVING);
    fixBoard();
  }, [setMode, fixBoard]);
  const handleClickEdit = useCallback(() => {
    resetBoard();
    setMode(MODE_EDITING);
    unfixBoard();
  }, [setMode, resetBoard, unfixBoard]);
  const handleClear = useCallback(() => clearBoard(), [clearBoard]);
  const handleReset = useCallback(() => resetBoard(), [resetBoard]);

  switch (mode) {
    case MODE_EDITING:
      return (
        <EditingControls onClickPlay={handleClickPlay} onClear={handleClear} />
      );
    case MODE_SOLVING:
      return (
        <SolvingControls onClickEdit={handleClickEdit} onReset={handleReset} />
      );
    default:
      return null;
  }
};

Controls.propTypes = {
  mode: PropTypes.oneOf(MODES).isRequired,
  setMode: PropTypes.func.isRequired,
  fixBoard: PropTypes.func.isRequired,
  unfixBoard: PropTypes.func.isRequired,
  clearBoard: PropTypes.func.isRequired,
  resetBoard: PropTypes.func.isRequired,
};

export default Controls;
