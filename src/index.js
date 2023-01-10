import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
console.log(
  "process.env.REACT_APP_PUBLIC_URL",
  process.env.REACT_APP_PUBLIC_URL
);
ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>,
  // <div>hello</div>,
  document.getElementById("root")
);
