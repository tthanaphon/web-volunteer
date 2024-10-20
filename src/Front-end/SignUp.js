import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    username: '',
    email: '',
    password: '',
    user_img: 'null', // Add a state for the image file
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key !== 'user_img') {
        formDataToSend.append(key, formData[key]); // Append other form fields.
      }
    }
  
    // Only append 'user_img' if it is not 'null' and is defined (meaning a file was selected)
    if (formData.user_img !== 'null' && formData.user_img) {
      formDataToSend.append('user_img', formData.user_img);
    }
  
    try {
      await axios.post('http://127.0.0.1:8000/api/users/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Registration successful');
      navigate('/login'); // Redirect to the login page after successful sign-up
    } catch (error) {
      console.error('Error during sign-up:', error.response?.data || error);
      alert('Error during sign-up: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };
  

  // Redirect to login page
  const handleSignUpRedirect = () => {
    navigate('/login');
  };

  return (
  <Box display="flex" height="100vh">
    <Box flex={1} display="flex" justifyContent="center" alignItems="center" bgcolor="#475443" p={4}>
      <Paper elevation={3} 
        sx={{   
          padding: 4, width: '400px', background:'#EA9715' ,borderRadius: '30px', 
          boxShadow: '20px'}}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          SIGN UP
        </Typography>
        {/* Form element for capturing input */}
        <form onSubmit={handleSubmit} >
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { fontSize: '14px', color: '#333' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // ทำให้กรอบมน
                background:'white'
              },
            }}
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { fontSize: '14px', color: '#333' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // ทำให้กรอบมน
                background:'white'
              },
            }}
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            fullWidth
            InputLabelProps={{ style: { fontSize: '14px', color: '#333' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // ทำให้กรอบมน
                background:'white'
              },
            }}
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { fontSize: '14px', color: '#333' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // ทำให้กรอบมน
                background:'white'
              },
            }}
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Tel"
            name="tel"
            variant="outlined"
            type="tel"
            maxRows={10}
            fullWidth
            InputLabelProps={{ style: { fontSize: '14px', color: '#333' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // ทำให้กรอบมน
                background:'white'
              },
            }}
            margin="normal"
            value={formData.tel}
            onChange={handleChange}
          />
          {/* Submit button for the form */}
          <Button variant="contained" color="primary" fullWidth type="submit" sx={{background: '#475443'}}>
            CREATE ACCOUNT
          </Button>
        </form>
  
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Already registered?{' '}
          <Button onClick={handleSignUpRedirect} variant="text" color="primary">
          Login
          </Button>
        </Typography>
        
      </Paper>
    </Box>
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
      </Box>
    </Box>
  );
};

export default SignUpPage;
