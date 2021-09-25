import styles from './index.module.css';
import PropTypes from 'prop-types';

const ExampleComponent = ({ text }) => {
  return <h1 className={styles.test}>{text}</h1>;
};

ExampleComponent.propTypes = {
  text: PropTypes.string
};

export default ExampleComponent;
