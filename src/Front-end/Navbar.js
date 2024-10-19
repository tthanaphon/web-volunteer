import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#F6BE00' ,height: '4rem' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Volunteer
        </Typography>
        <Button color="inherit" onClick={onLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
