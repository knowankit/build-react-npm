import React from "react";
import ReactDom from "react-dom";
import ExampleComponent from "./example-component";

ReactDom.render(
  <ExampleComponent text="hello" />,
  document.getElementById("app")
);
