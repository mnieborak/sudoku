import "./index.scss";
import ReactDOM from "react-dom";
import React from "react";

const reactRoot = document.createElement("div");
reactRoot.setAttribute("id", "react-root");
document.body.appendChild(reactRoot);

const App = (props) => <div><h1>Sudoku</h1></div>;

ReactDOM.render(<App />, reactRoot);

