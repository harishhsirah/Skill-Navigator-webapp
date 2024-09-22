import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route path="/signup" element={<SignupPage />} />
        {/* Conditionally render dashboard only if logged in */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? (
            <DashboardPage />
          ) : (
            <Navigate to="/login" />
          )}
        />
        {/* Redirect to login if the root URL is accessed */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
