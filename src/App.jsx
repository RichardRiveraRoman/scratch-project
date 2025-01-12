import { useState } from 'react';
import healthLogo from './assets/health_logo.png';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img src={healthLogo} className='logo health' alt='Health logo' />
      </div>
      <h1>Health App</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Log in to learn more</p>
    </>
  );
}

export default App;
