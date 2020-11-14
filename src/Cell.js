import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {
  MOVE_SELECT_UP,
  MOVE_SELECT_DOWN,
  MOVE_SELECT_LEFT,
  MOVE_SELECT_RIGHT,
  MODES,
  MODE_SOLVING,
} from "./sudoku";
import Candidates from "./Candidates";

class Cell extends PureComponent {
  constructor(props) {
    super(props);
    this.focusRef = React.createRef();
  }

  focus = () => {
    const elem = this.focusRef.current;
    elem && elem.focus();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.selected && this.props.selected) {
      this.focus();
    }
  }

  handleKeyDown = (ev) => {
    const { moveSelect } = this.props;
    switch (ev.key) {
      case " ":
      case "0":
      case "Backspace":
        return this.handleValueInput(null);
      case "q":
      case "1":
        return this.handleValueInput(1);
      case "w":
      case "2":
        return this.handleValueInput(2);
      case "e":
      case "3":
        return this.handleValueInput(3);
      case "a":
      case "4":
        return this.handleValueInput(4);
      case "s":
      case "5":
        return this.handleValueInput(5);
      case "d":
      case "6":
        return this.handleValueInput(6);
      case "z":
      case "7":
        return this.handleValueInput(7);
      case "x":
      case "8":
        return this.handleValueInput(8);
      case "c":
      case "9":
        return this.handleValueInput(9);
      case "Q":
      case "!":
        return this.handleCandidateInput(1);
      case "W":
      case "@":
        return this.handleCandidateInput(2);
      case "E":
      case "#":
        return this.handleCandidateInput(3);
      case "A":
      case "$":
        return this.handleCandidateInput(4);
      case "S":
      case "%":
        return this.handleCandidateInput(5);
      case "D":
      case "^":
        return this.handleCandidateInput(6);
      case "Z":
      case "&":
        return this.handleCandidateInput(7);
      case "X":
      case "*":
        return this.handleCandidateInput(8);
      case "C":
      case "(":
        return this.handleCandidateInput(9);
      case "ArrowUp":
        return moveSelect(MOVE_SELECT_UP);
      case "ArrowDown":
        return moveSelect(MOVE_SELECT_DOWN);
      case "ArrowLeft":
        return moveSelect(MOVE_SELECT_LEFT);
      case "ArrowRight":
        return moveSelect(MOVE_SELECT_RIGHT);
    }
  };

  handleValueInput = (newValue) => {
    const { fixed, id, updateCell, value } = this.props;
    if (!fixed) {
      updateCell(id, {
        value: newValue === value ? null : newValue,
        candidates: [],
      });
    }
  };

  handleCandidateInput = (newValue) => {
    const { mode, fixed, id, updateCell, candidates } = this.props;
    if (!fixed && mode == MODE_SOLVING) {
      let newCandidates;
      if (candidates.includes(newValue)) {
        newCandidates = candidates.filter((n) => n !== newValue);
      } else {
        newCandidates = candidates.concat(newValue);
      }
      updateCell(id, {
        value: null,
        candidates: newCandidates,
      });
    }
  };

  handleFocus = () => {
    const { selectCell, id } = this.props;
    selectCell(id);
  };

  render() {
    const {
      value,
      fixed,
      candidates,
      selected,
      peer,
      same,
      conflict,
      tabIndex,
    } = this.props;

    return (
      <div
        ref={this.focusRef}
        className={classNames("cell", { selected, peer, same, conflict })}
        tabIndex={tabIndex}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
      >
        {value ? (
          <div className={classNames("value", { input: !fixed })}>{value}</div>
        ) : (
          <Candidates candidates={candidates} />
        )}
      </div>
    );
  }
}

Cell.propTypes = {
  mode: PropTypes.oneOf(MODES).isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  fixed: PropTypes.bool.isRequired,
  candidates: PropTypes.array.isRequired,
  selected: PropTypes.bool.isRequired,
  peer: PropTypes.bool.isRequired,
  same: PropTypes.bool.isRequired,
  selectCell: PropTypes.func.isRequired,
  updateCell: PropTypes.func.isRequired,
  moveSelect: PropTypes.func.isRequired,
  conflict: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

Cell.defaultProps = {
  value: null,
};

export default Cell;
