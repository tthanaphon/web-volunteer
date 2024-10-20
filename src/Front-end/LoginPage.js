import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { username, password }); // Debug log
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/user', {
        username,
        password,
      });
  
      console.log('Response data:', response.data); // Log the full response
  
      if (response.status === 200) {
        // Handle success
        const userId = response.data.user.user_id; 
        onLogin(userId);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message); // Enhanced error logging
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };
  
  


  const handleSignUpRedirect = () => {
    navigate('/signup');  // Redirect to sign-up page
  };

  return (
    <Box display="flex" height="100vh">
      
      {/* Left Section with Form */}
      <Box flex={1} display="flex" justifyContent="center" alignItems="center" bgcolor="#475443" p={4}>
        <Paper elevation={3} sx={{ padding: 4, width: '400px',background:'#EA9715' ,borderRadius: '30px' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Hello Volunteer!
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{ style: { fontSize: '14px', color: '#333' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // ทำให้กรอบมน
                background:'white'
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { fontSize: '14px', color: '#333' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // ทำให้กรอบมน
                background:'white'
              },
            }}
            
          
          />

          <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ marginTop: 2, background:"#475443"}}>
            Login
          </Button>

          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Already registered?{' '}
            <Button onClick={handleSignUpRedirect} variant="text" color="primary">
              Sign Up
            </Button>
          </Typography>
        </Paper>
      </Box>

      {/* Right Section with Image */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage: `url(images/volunteer.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* The image is already set as background */}
      </Box>
    </Box>
  );
};

export default LoginPage;
