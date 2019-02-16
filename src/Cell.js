import React, { Component } from "react";
import PropTypes from "prop-types";

class Cell extends Component {
  render() {
    const { value } = this.props;

    return (
      <div className="cell">
        <div className="value">{value}</div>
      </div>
    );
  }
}

Cell.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  fixed: PropTypes.bool.isRequired
};

Cell.defaultProps = {
  value: null
};

export default Cell;
