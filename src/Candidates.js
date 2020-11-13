import React from "react";
import PropTypes from "prop-types";

import { NUMBERS } from "./sudoku/utils";

const Candidates = ({ candidates }) => {
  return (
    <div className="candidates">
      {NUMBERS.map((n) => (
        <div key={n} className="candidate">
          {candidates.includes(n) ? n : null}
        </div>
      ))}
    </div>
  );
};

Candidates.propTypes = {
  candidates: PropTypes.array.isRequired,
};

export default Candidates;
