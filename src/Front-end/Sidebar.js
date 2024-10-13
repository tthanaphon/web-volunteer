import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // Logout Icon from Material UI

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { text: 'หน้าหลัก', path: '/home' },
    { text: 'กิจกรรมของฉัน', path: '/activity-owner' },
    { text: 'กิจกรรมที่ลงทะเบียน', path: '/activity-attend' },
  ];

  const handleLogout = () => {
    // Clear authentication token and navigate to login page
    localStorage.removeItem('authToken');
    navigate('/login'); // Navigate to login page
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#032b03', // Sidebar background color
        },
      }}
    >
      <Box sx={{ textAlign: 'center', padding: 1, backgroundColor: '#d8de28' }}>
        {/* App Name or Logo */}
        <Typography variant="h6" align="center" gutterBottom sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
          Volunteer
        </Typography>
      </Box>

      {/* Menu Items */}
      <List>
        {menu.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              color: '#ffffff', // Default text color
              '&.Mui-selected': {
                backgroundColor: '#ffffff', // Background when selected
                color: '#000', // Text color when selected
              },
              '&:hover': {
                backgroundColor: '#ffffff', // Background when hover
                color: '#000', // Text color when hover
                '& .MuiListItemIcon-root': {
                  color: '#ffffff', // Icon color when hover
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        {/* Logout Option */}
        <ListItem
          button
          onClick={handleLogout} // Call the handleLogout function
          sx={{
            '&:hover': {
              backgroundColor: '#ff5555', // Background when hover
              color: '#ffffff', // Text color when hover
              '& .MuiListItemIcon-root': {
                color: '#ffffff', // Icon color when hover
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <LogoutIcon /> {/* Logout Icon */}
          </ListItemIcon>
          <ListItemText primary="ออกจากระบบ" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
