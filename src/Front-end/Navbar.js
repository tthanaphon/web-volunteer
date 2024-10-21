import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#F6BE00' ,height: '4rem' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Volunteer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
