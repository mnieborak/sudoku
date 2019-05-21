import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {
  MOVE_SELECT_UP,
  MOVE_SELECT_DOWN,
  MOVE_SELECT_LEFT,
  MOVE_SELECT_RIGHT
} from "./sudoku";

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

  handleKeyDown = ev => {
    const { moveSelect } = this.props;
    switch (ev.key) {
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

  handleValueInput = newValue => {
    const { fixed, id, updateCell, value } = this.props;
    if (!fixed && newValue) {
      updateCell(id, { value: newValue === value ? null : newValue });
    }
  };

  handleFocus = () => {
    const { selectCell, id } = this.props;
    selectCell(id);
  };

  handleBlur = () => this.props.selectCell(null);

  render() {
    const { value, fixed, selected, tabIndex } = this.props;

    return (
      <div
        ref={this.focusRef}
        className={classNames("cell", { selected })}
        tabIndex={tabIndex}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <div className={classNames("value", { input: !fixed })}>{value}</div>
      </div>
    );
  }
}

Cell.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  fixed: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  selectCell: PropTypes.func.isRequired,
  updateCell: PropTypes.func.isRequired,
  moveSelect: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired
};

Cell.defaultProps = {
  value: null
};

export default Cell;
