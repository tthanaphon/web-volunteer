import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'; 
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomePage from './Front-end/Homepage';
import LoginPage from './Front-end/LoginPage';
import Detailpage from './Components/Detailpage';
import RegistrationForm from './Components/Register';
import JoinEvent from './Front-end/JoinEventpage';


const theme = createTheme();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const location = useLocation();

  useEffect(() => {
    // Check if the user is authenticated when the app loads
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {location.pathname !== '/login' && isAuthenticated }
        <div className='Content'>
          <Routes>
            <Route 
              path="/login" 
              element={<LoginPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/home" 
              element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/event-detail" 
              element={<Detailpage />} /> 
            <Route 
              path="/event-register" 
              element={<RegistrationForm />} /> 
            <Route 
              path="/activity-attend" 
              element={<JoinEvent />} /> 
            <Route 
              path="*" 
              element={<Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
