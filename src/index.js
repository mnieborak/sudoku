import "./index.scss";

import ReactDOM from "react-dom";
import React from "react";

import App from "./App";

const reactRoot = document.createElement("div");
reactRoot.setAttribute("id", "react-root");
document.body.appendChild(reactRoot);

ReactDOM.render(<App />, reactRoot);
