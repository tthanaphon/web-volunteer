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
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/user', {
        username,
        password,
      });
      console.log(response.data);
      if (response.status === 200) {
        // Save token and authentication status
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAuthenticated', 'true'); // Uncomment this if needed
        localStorage.setItem('username', username);
        
        // Assuming your response contains user_id inside `user`
        const userId = response.data.user.user_id; // ดึงค่า user_id จาก `user` object
        console.log('User logged in:', username);
        console.log('userid:', userId);
        
        onLogin(userId);  // Pass userId to the login handler
        navigate('/home');  // Redirect to the home page
      }
    } catch (error) {
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
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ marginTop: 2 }}>
          Login
        </Button>

        {/* Add "Create Account" button */}
        <Button 
          variant="outlined" 
          color="secondary" 
          fullWidth 
          onClick={handleSignUpRedirect} 
          sx={{ marginTop: 2 }}
        >
          Create Account
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
