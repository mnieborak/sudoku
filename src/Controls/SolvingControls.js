import React from "react";
import PropTypes from "prop-types";

const SolvingControls = ({ onClickEdit, onReset }) => (
  <div>
    <button type="button" onClick={onClickEdit}>
      Edit
    </button>
    <button type="button" onClick={onReset}>
      Reset
    </button>
  </div>
);

SolvingControls.propTypes = {
  onClickEdit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default SolvingControls;
