import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import HabitsTracker from './components/HabitsTracker';
import healthLogo from './assets/health_logo.png';
import History from './components/HistoryPage/History';
function App() {
  return (
    <Router>
      {/* Define Routes */}
      <Routes>
        {/* Route for the logo page */}
        <Route
          path='/'
          element={
            <div>
              <div>
                <img
                  src={healthLogo}
                  className='logo health'
                  alt='Health logo'
                />
              </div>
              <h1>Health App</h1>
              <Link to='/login' className='read-the-docs'>
                Log in to learn more
              </Link>
            </div>
          }
        />
        {/* Route for the login page */}
        <Route path='/login' element={<Login />} />
        {/* Route for the signup page */}
        <Route path='/signup' element={<Signup />} />
        {/* Route for the habits component */}
        <Route path='/habits' element={<HabitsTracker />} />
        {/* Route for the History component */}
        <Route path='/history' element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
