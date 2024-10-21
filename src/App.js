import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'; 
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import HomePage from './Front-end/Homepage';
import LoginPage from './Front-end/LoginPage';
import Myactivity from './Front-end/Myactivity';
import ListRegis from './Front-end/ListRegisterpage';
import SignUpPage from './Front-end/SignUp';
import Detailpage from './Components/Detailpage';
import RegistrationForm from './Components/Register';
import JoinEvent from './Front-end/JoinEventpage';
import Navbar from './Front-end/Navbar';

const theme = createTheme();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const location = useLocation();


  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedUserId = localStorage.getItem('userID');
  
  
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (userId) => {
    setIsAuthenticated(true);
    setUserId(userId);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userID', userId);
    
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove authentication status
    localStorage.removeItem('userID'); // Remove user ID
    setIsAuthenticated(false); // Update state
    setUserId(null); // Clear user ID from state
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        {location.pathname !== '/login' && location.pathname !== '/signup' && isAuthenticated && (
          <button onClick={handleLogout}>Logout</button>
        )}
        <Box className='Content' sx={{ marginTop: '20px' }}> {/* Adjust margin for Navbar height */}
          {isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar onLogout={handleLogout} />}
          <Routes>
            <Route 
              path="/login" 
              element={<LoginPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/signup" 
              element={<SignUpPage />}  // Route for Sign Up page
            />
            <Route 
            path="/activity-owner" 
            element={isAuthenticated ? <Myactivity  userId={userId} /> : <Navigate to="/login" />}
            />
            <Route 
              path="/home" 
              element={isAuthenticated ? <HomePage onLogout={handleLogout} userId={userId} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/event-detail" 
              element={isAuthenticated ? <Detailpage userId={userId} /> : <Navigate to="/login" />} 
            /> 
            <Route 
              path="/event-register" 
              element={isAuthenticated ? <RegistrationForm userId={userId} /> : <Navigate to="/login" />} 
            /> 
            <Route 
              path="/activity-attend" 
              element={isAuthenticated ? <JoinEvent userId={userId} /> : <Navigate to="/login" />} 
            /> 
             <Route 
            path="/listregister" 
            element={isAuthenticated ? <ListRegis userId={userId}/> : <Navigate to="/login" />} 
            
          />
            <Route 
              path="*" 
              element={<Navigate to="/login" />} 
            />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
