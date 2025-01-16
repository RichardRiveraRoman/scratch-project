// History.jsx
import React, { useState } from 'react';
import HistoryBox from './HistoryBox'; // Import HistoryBox component
import Legend from './Legend'; // Import Legend component
import styles from '../../styles/HistoryStyles'; // Import styles from HistoryStyles.js

const History = () => {
  const [history, setHistory] = useState([
    { day: 'Monday', circleColor: '#FF5733', ratio: '4/4' },
    { day: 'Tuesday', circleColor: '#33FF57', ratio: '3/4' },
    { day: 'Wednesday', circleColor: '#3357FF', ratio: '2/4' },
    { day: 'Thursday', circleColor: '#FFC300', ratio: '1/4' },
    { day: 'Friday', circleColor: '#FF5733', ratio: '4/4' },
    { day: 'Saturday', circleColor: '#33FF57', ratio: '3/4' },
    { day: 'Sunday', circleColor: '#3357FF', ratio: '2/4' },
  ]);

  const handleDelete = (index) => {
    setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    console.log(`Edit button clicked for ${history[index].day}`);
  };

  return (
    <div style={styles.container}>
      <Legend />
      <div style={styles.historyContainer}>
        {history.map((item, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (date.getDay() - index));
          const dayDate = date.toLocaleDateString();

          return (
            <HistoryBox
              key={index}
              day={item.day}
              date={dayDate}
              circleColor={item.circleColor}
              ratio={item.ratio}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default History;
