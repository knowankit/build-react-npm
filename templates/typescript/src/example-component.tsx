import React from "react";
import "./index.css";

type IProps = {
  text: string;
};

const ExampleComponent = ({ text }: IProps) => {
  return <h1>{text}</h1>;
};

export default ExampleComponent;
