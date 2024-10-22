import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Typography, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [UserData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const menu = [
    { text: 'หน้าหลัก', path: '/home', icon: <HomeIcon /> },
    { text: 'กิจกรรมของฉัน', path: '/activity-owner', icon: <EventIcon /> },
    { text: 'กิจกรรมที่ลงทะเบียน', path: '/activity-attend', icon: <InfoIcon /> },
  ];

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userID');
    if (storedUserId) {
      setUserId(storedUserId);
      fetch(`http://127.0.0.1:8000/api/users/${storedUserId}/`)
        .then((response) => response.json())
        .then((data) => {
          setUserData({
            username: data.username,
            name: data.name,
            tel: data.tel,
            email: data.email,
            user_img: data.user_img,
          });
          console.log(data)
        })
        .catch((error) => console.error('Error fetching user data:', error));
    } else {
      console.log('No userId found in localStorage');
    }
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userId');
    console.log('Navigating to login...');
    navigate('/login');
  };
  
  
  

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 300,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 300,
          boxSizing: 'border-box',
          backgroundColor: '#475443',
        },
      }}
    >
      <Box sx={{ textAlign: 'center', padding: 1, backgroundColor: '#475443' }}>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFEFA' }}
        >
          Volunteer
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menu.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              color: 'black',
              backgroundColor: location.pathname === item.path ? 'white' : 'transparent',
              '&:hover': {
                backgroundColor: '#ffffff',
                color: '#475443',
                '& .MuiListItemIcon-root': {
                  color: '#475443',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      {/* User info and logout button section */}
      <Box
        sx={{
          
          padding: 1.5,
          backgroundColor: '#F6BE00', // Yellow background
          display: 'flex',
          alignItems: 'center',
          marginBottom: 1,
          borderRadius: '15px',
          width: '90%', // กำหนดความยาวเต็มที่
          maxWidth: '600px', // กำหนดความกว้างสูงสุดให้แคบลง
          margin: '0 auto', // จัดตรงกลางในแนวนอน
        }}
      >
        {UserData ? (
          <>
            <Avatar
              alt={UserData.name}
              src={UserData.user_img || '/default-avatar.png'}
              sx={{ width: 40, height: 40, marginRight: 1 }}
            />
            <Box>
              <Typography variant="h8" sx={{ color: '#000' }}>
                {UserData.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#000', fontSize: '0.8rem' }}>
                {UserData.email}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{ color: '#000' }}>
            No user data available
          </Typography>
        )}
      </Box>

      <ListItem
        button
        onClick={handleLogout}
        sx={{
          color: '#ffffff',
          marginBottom: 1,
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
    </Drawer>
  );
};

export default Sidebar;
