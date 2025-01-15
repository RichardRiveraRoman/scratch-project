// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import '../styles/tabs.css';

// export default function Tabs() {
//   const [active, setActive] = useState('tab-1');

//   const handleClick = (event) => {
//     setActive(event.target.id);
//   };

//   return (
//     <div>
//       <div className="container">
//         <div className="tabs">
//           <button
//             className={`tab-button ${active === 'tab-1' ? 'active' : ''}`}
//             id="tab-1"
//             onClick={handleClick}
//           >
//             Exercises
//           </button>
//           <button
//             className={`tab-button ${active === 'tab-2' ? 'active' : ''}`}
//             id="tab-2"
//             onClick={handleClick}
//           >
//             Medications
//           </button>
//           <button
//             className={`tab-button ${active === 'tab-3' ? 'active' : ''}`}
//             id="tab-3"
//             onClick={handleClick}
//           >
//             User Statistics
//           </button>
//         </div>
//         <div className="tabs-content">
//           <div className={`tab-page ${active === 'tab-1' ? 'active' : ''}`}>
//             <h2>Exercises</h2>
//             <p>Track your exercises here. Log your workouts, set goals, and monitor progress.</p>
//           </div>
//           <div className={`tab-page ${active === 'tab-2' ? 'active' : ''}`}>
//             <h2>Medications</h2>
//             <p>Keep track of your medications, dosages, and schedules.</p>
//           </div>
//           <div className={`tab-page ${active === 'tab-3' ? 'active' : ''}`}>
//             <h2>User Statistics</h2>
//             <p>View your overall health statistics and analyze trends over time.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
