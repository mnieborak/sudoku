import React from "react";
import PropTypes from "prop-types";

const EditingControls = ({ onClickPlay, onClear }) => (
  <div>
    <button type="button" onClick={onClickPlay}>
      Play
    </button>
    <button type="button" onClick={onClear}>
      Clear
    </button>
  </div>
);

EditingControls.propTypes = {
  onClickPlay: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default EditingControls;
