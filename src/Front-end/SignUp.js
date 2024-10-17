import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, CardActions } from '@mui/material';
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
    e.preventDefault(); // Prevent the default form submission behavior

    const formDataToSend = new FormData(); // Create a FormData object
    for (const key in formData) {
      formDataToSend.append(key, formData[key]); // Append each form field to the FormData object
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
      });
      alert('Registration successful');
      navigate('/login'); // Redirect to login page after successful sign-up
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Error during sign-up: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  // Redirect to login page
  const handleSignUpRedirect = () => {
    navigate('/login');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
        <Typography variant="h5" gutterBottom>
          SIGN UP
        </Typography>
        {/* Form element for capturing input */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            fullWidth
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
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Tel"
            name="tel"
            variant="outlined"
            type="tel"
            fullWidth
            margin="normal"
            value={formData.tel}
            onChange={handleChange}
          />
          {/* Submit button for the form */}
          <Button variant="contained" color="primary" fullWidth type="submit">
            CREATE ACCOUNT
          </Button>
        </form>
        <CardActions>
          <Button
            size="small"
            color="#d9e139"
            onClick={handleSignUpRedirect}
            sx={{
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#d9e139',
              },
            }}
          >
            Login
          </Button>
        </CardActions>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
