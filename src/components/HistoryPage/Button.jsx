import React from 'react';
import styles from '../../styles/HistoryStyles'; // Assuming the styles are in the HistoryStyles.js file

const Button = ({ label, onClick }) => (
  <button style={styles.button} onClick={onClick}>
    {label}
  </button>
);

export default Button;
