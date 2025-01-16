// Legend.jsx
import React from 'react';
import styles from '../../styles/HistoryStyles'; // Import styles from HistoryStyles.js

const Legend = () => (
  <div style={styles.legend}>
    <div style={styles.legendItem}>
      <div style={{ ...styles.legendCircle, backgroundColor: '#FF5733' }}></div>
      <span style={styles.legendText}>Great</span>
    </div>
    <div style={styles.legendItem}>
      <div style={{ ...styles.legendCircle, backgroundColor: '#33FF57' }}></div>
      <span style={styles.legendText}>Good</span>
    </div>
    <div style={styles.legendItem}>
      <div style={{ ...styles.legendCircle, backgroundColor: '#3357FF' }}></div>
      <span style={styles.legendText}>Ok</span>
    </div>
    <div style={styles.legendItem}>
      <div style={{ ...styles.legendCircle, backgroundColor: '#FFC300' }}></div>
      <span style={styles.legendText}>Bad</span>
    </div>
  </div>
);

export default Legend;
