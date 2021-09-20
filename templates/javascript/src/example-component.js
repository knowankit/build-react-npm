import React from "react";
import styles from "./index.module.css";

const ExampleComponent = ({ text }) => {
  return <h1 className={styles.test}>{text}</h1>;
};

export default ExampleComponent;
