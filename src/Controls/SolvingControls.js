import React from "react";
import PropTypes from "prop-types";

const SolvingControls = ({
  onClickEdit,
  onReset,
  onFindCandidates,
  onFindAllCandidates,
}) => (
  <div>
    <button type="button" onClick={onClickEdit}>
      Edit
    </button>
    <button type="button" onClick={onReset}>
      Reset
    </button>
    <button type="button" onClick={onFindCandidates}>
      Find candidates
    </button>
    <button type="button" onClick={onFindAllCandidates}>
      Find all candidates
    </button>
  </div>
);

SolvingControls.propTypes = {
  onClickEdit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onFindCandidates: PropTypes.func.isRequired,
  onFindAllCandidates: PropTypes.func.isRequired,
};

export default SolvingControls;
