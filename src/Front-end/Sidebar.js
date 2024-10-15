import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { text: 'หน้าหลัก', path: '/home', icon: <HomeIcon /> },
    { text: 'กิจกรรมของฉัน', path: '/activity-owner', icon: <EventIcon /> },
    { text: 'กิจกรรมที่ลงทะเบียน', path: '/activity-attend', icon: <InfoIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
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
          backgroundColor: '#032b03',
        },
      }}
    >
      <Box sx={{ textAlign: 'center', padding: 1, backgroundColor: '#d8de28' }}>
        <Typography variant="h6" align="center" gutterBottom sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
          Volunteer
        </Typography>
      </Box>

      <List>
        {menu.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              color: '#ffffff',
              backgroundColor: location.pathname === item.path ? '#42823c' : 'transparent', // Background when selected
              '&:hover': {
                backgroundColor: '#ffffff',
                color: '#000',
                '& .MuiListItemIcon-root': {
                  color: '#42823c',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        <ListItem
          button
          onClick={handleLogout}
          sx={{
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#ff5555',
              color: '#ffffff',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ffffff' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="ออกจากระบบ" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
