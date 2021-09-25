import React from 'react';
import styles from './index.module.css';

type IProps = {
  text: string;
};

const ExampleComponent = ({ text }: IProps): JSX.Element => {
  return <h1 className={styles.test}>{text}</h1>;
};

export default ExampleComponent;
