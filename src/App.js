import React, { Component } from "react";

import { initializeBoard } from "./sudoku";
import Board from "./Board";

class App extends Component {
  state = { cells: initializeBoard([[1, 2]]) };

  render() {
    const { cells } = this.state;

    return (
      <div className="app">
        <h1>Sudoku</h1>
        <Board cells={cells} />
      </div>
    );
  }
}

export default App;
