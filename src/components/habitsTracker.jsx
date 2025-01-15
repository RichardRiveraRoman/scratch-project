/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../styles/habitsTracker.css';

export default function Tabs() {
  const [active, setActive] = useState('tab-1');

  const handleClick = (event) => {
    setActive(event.target.id);
  };

  return (
    <div>
      <div className='container'>
        <div className='tabs'>
          <button
            className={`tab-button ${active === 'tab-1' ? 'active' : ''}`}
            id='tab-1'
            onClick={handleClick}
          >
            Healthy Habits
          </button>
          <button
            className={`tab-button ${active === 'tab-2' ? 'active' : ''}`}
            id='tab-2'
            onClick={handleClick}
          >
            History
          </button>
        </div>
        <div className='tabs-content'>
          <div className={`tab-page ${active === 'tab-1' ? 'active' : ''}`}>
            <h2>Exercises</h2>
            <p>Log your workouts, set goals, and monitor progress.</p>
          </div>
          <div className={`tab-page ${active === 'tab-2' ? 'active' : ''}`}>
            <h2>Results</h2>
            <p>Keep track of your workouts and the progress you've made.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
