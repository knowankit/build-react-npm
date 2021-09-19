import React from "react";
import ReactDom from "react-dom";
import ReactComponent from "./react-component";

ReactDom.render(
  <ReactComponent text="hello" />,
  document.getElementById("app")
);
