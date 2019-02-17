import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Cell extends Component {
  captureKey = key => {
    switch (key) {
      case "q":
      case "1":
        return 1;
      case "w":
      case "2":
        return 2;
      case "e":
      case "3":
        return 3;
      case "a":
      case "4":
        return 4;
      case "s":
      case "5":
        return 5;
      case "d":
      case "6":
        return 6;
      case "z":
      case "7":
        return 7;
      case "x":
      case "8":
        return 8;
      case "c":
      case "9":
        return 9;
    }
  };

  handleKeyDown = ev => {
    const { fixed, id, updateCell, value } = this.props;
    const newValue = this.captureKey(ev.key);
    if (!fixed && newValue) {
      updateCell(id, { value: newValue === value ? null : newValue });
    }
  };

  render() {
    const { value, fixed, tabIndex } = this.props;

    return (
      <div className="cell" tabIndex={tabIndex} onKeyDown={this.handleKeyDown}>
        <div className={classNames("value", { input: !fixed })}>{value}</div>
      </div>
    );
  }
}

Cell.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  fixed: PropTypes.bool.isRequired,
  updateCell: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired
};

Cell.defaultProps = {
  value: null
};

export default Cell;
