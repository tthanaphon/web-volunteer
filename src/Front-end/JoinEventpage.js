import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Tabs,
  Tab,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import Sidebar from './Sidebar';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';

dayjs.locale('th');

const JoinEvent = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('ทั้งหมด');
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState({});
  const eventsPerPage = 3; // Number of events per page


  // State for confirmation dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [registerIdToCancel, setRegisterIdToCancel] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userID'); // Get the logged-in user's 
  useEffect(() => {
    const userId = localStorage.getItem('userID');
    if (!userId) {
      navigate('/login');  // นำผู้ใช้ไปหน้า login ถ้าไม่พบ userID
    } else {
      window.history.replaceState(null, null, window.location.href); // เก็บสถานะ URL ปัจจุบัน
    }
  }, [navigate]);
  

  // Fetch events and registrations
  useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch events and registrations in parallel for better performance
      const [eventResponse, registrationResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/events/'),
        axios.get('http://127.0.0.1:8000/api/registers/'),
      ]);
      
      const eventList = eventResponse.data;
      setEvents(eventList);
      
      console.log('Events:', eventList);
      console.log('Registrations:', registrationResponse.data);
      
      setRegistrations(registrationResponse.data);

      // Fetch user details for each event in parallel
      const userPromises = eventList.map((event) =>
        axios.get(`http://127.0.0.1:8000/api/users/${event.user}/`)
      );
      const userResponses = await Promise.all(userPromises);

      // Create a map of users by their ID
      const userMap = {};
      userResponses.forEach((response, index) => {
        userMap[eventList[index].user] = response.data;
      });
      
      console.log('Users:', userMap);
      setUsers(userMap);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);  // You can add dependencies here if needed




  // Count registrations for a specific event
  const countRegistrationsForEvent = (eventID) => {
    return registrations.filter((registration) => 
      registration.event === eventID && registration.status === 'active'  // ตรวจสอบเฉพาะ status = 'active'
    ).length; // นับจำนวนคนลงทะเบียนที่มี status = 'active'
  };
  

  const update = () => {
    axios.get(`http://127.0.0.1:8000/api/registers/`) // Assuming a GET endpoint to fetch all appointments
      .then((response) => {
        setRegistrations(response.data); 
        console.log('setRegistrations', response.data); // Move this inside the 'then' block
      })
      .catch((error) => console.error('Error fetching updated:', error));
  }
  
  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    return date.format('D MMM YYYY');
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  // Handle cancellation of registration
  const handleCancel = (registerId) => {
    setRegisterIdToCancel(registerId);
    setOpenDialog(true); // Open dialog for confirmation
  };

  // Confirm cancellation
  const confirmCancel = async () => {
    if (registerIdToCancel) {
      try {
        await axios.patch(`http://127.0.0.1:8000/api/registers/${registerIdToCancel}/`, {
          status: 'inactive'
        });
        setRegistrations((prevRegistrations) =>
          prevRegistrations.map((reg) =>
            reg.register_id === registerIdToCancel ? { ...reg, status: 'inactive' } : reg
          )
        );
      } catch (error) {
        console.error('Error cancelling registration:', error);
      } finally {
        update();
        setOpenDialog(false); // Close dialog after confirming
        setRegisterIdToCancel(null); // Reset the register ID
      }
    }
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
    setRegisterIdToCancel(null); // Reset the register ID if canceled
  };

  // Filter events based on the active tab
  useEffect(() => {
    const filterEvents = () => {
      const today = dayjs().startOf('day');
      let filtered;
  
      if (activeTab === 'ดำเนินการ') {
        // Filter events that have started but not yet ended for the current user
        filtered = events
          .filter(event => {
            const userRegistration = registrations.find(registration => 
              String(registration.user) === String(userId) && 
              registration.event === event.event_id && 
              registration.status === 'active'
            );
  
            return userRegistration ;
          })
          .map(event => {
            const userRegistration = registrations.find(reg => reg.event === event.event_id && String(reg.user) === String(userId));
            return { ...event, register_id: userRegistration ? userRegistration.register_id : null };
          });
      } else if (activeTab === 'สิ้นสุด') {
        // Filter events that have ended for the current user
        filtered = events
          .filter(event => {
            const userRegistration = registrations.find(registration => 
              String(registration.user) === String(userId) && 
              registration.event === event.event_id && 
              registration.status === 'active'
            );
  
            return userRegistration && dayjs(event.enddate).isBefore(today);
          })
          .map(event => {
            const userRegistration = registrations.find(reg => reg.event === event.event_id && String(reg.user) === String(userId));
            return { ...event, register_id: userRegistration ? userRegistration.register_id : null };
          });
      }  else if (activeTab === 'ยกเลิก') {
        // Filter events that have been cancelled for the current user
        filtered = registrations
          .filter(registration => 
            String(registration.user) === String(userId) &&
            registration.status === 'inactive'
          )
          .map(cancelledRegistration => {
            const event = events.find(event => event.event_id === cancelledRegistration.event);
            return { ...event, register_id: cancelledRegistration.register_id };
          });
      } else {
        // Filter events where the current user is actively registered
        filtered = events
          .filter(event => {
            const userRegistration = registrations.find(registration => 
              String(registration.user) === String(userId) && 
              registration.event === event.event_id && 
              registration.status === 'active'
            );
            return userRegistration;
          })
          .map(event => {
            const userRegistration = registrations.find(reg => reg.event === event.event_id && String(reg.user) === String(userId));
            return { ...event, register_id: userRegistration ? userRegistration.register_id : null };
          });
      }
  
      setFilteredEvents(filtered);
    };
  
    filterEvents();
  }, [events, registrations, activeTab, userId]);
  

  // Calculate total pages from filtered events
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice((page - 1) * eventsPerPage, page * eventsPerPage);

  // Handle navigation to event detail
  const handleDetailsClick = (event) => {
    if (event && users[event.user]) {
      const currentCount = countRegistrationsForEvent(event.event_id); // คำนวณจำนวนการลงทะเบียน
      navigate('/event-detail', { state: { event, currentCount, user: users[event.user] } });
    } else {
      console.error('Event or user data is missing');
    }
  };
  

  return (
    <Box sx={{ display: 'flex', padding: 2 }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mt: 4 }}>กิจกรรมที่เข้าร่วม</Typography>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="ทั้งหมด" value="ทั้งหมด" />
          <Tab label="ดำเนินการ" value="ดำเนินการ" />
          <Tab label="สิ้นสุด" value="สิ้นสุด" />
          <Tab label="ยกเลิก" value="ยกเลิก" />
        </Tabs>

        {currentEvents.length === 0 ? (
          <Typography variant="subtitle1" color="textSecondary">ไม่มีกิจกรรม</Typography>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3
          }}>
            {currentEvents.map((event, index) => {
              const registrationsForEvent = registrations.filter(reg => reg.event === event.event_id);
              return (
                <Card key={index} sx={{ border: '2px solid green',  height: '530px',borderRadius: '16px' , display: 'flex'  ,width: '400px', // กำหนดความกว้างคงที่
                  flexDirection: 'column',
                  justifyContent: 'space-between' ,  }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{bgcolor: '#ffdef2'}} variant="subtitle2">Post: {formatDate(event.date_create)}</Box>
                      <Box 
                        display="flex" alignItems="center"  border="1px solid #ccc" // กำหนดเส้นกรอบ
                        padding="8px" 
                        borderRadius="8px" 
                        width="fit-content" >
                      <PeopleAltIcon sx={{ marginRight: '8px', color: '#1976d2' }} />
                        <Typography>{countRegistrationsForEvent(event.event_id)}/{event.amount}</Typography>
                      </Box>
                    </Box>
                  {event.event_img && (  // ตรวจสอบว่ามี URL ของรูปภาพ
                      <img 
                        src={event.event_img} 
                        alt={event.event_name} 
                        style={{ width: '100%', height: '200px', borderRadius: '16px',objectFit: 'cover', }} // ทำให้รูปภาพมีขนาดพอดีกับ Card
                      />
                    )}
                    <Typography variant="subtitle1">{event.event_name}</Typography>
                    <Typography variant="subtitle1">ผู้จัด: {users[event.user]?.name || 'Loading...'}</Typography>
                    <Typography variant="subtitle2">สถานที่: {event.address}</Typography>
                    <Typography variant="subtitle2">วันที่จัด: {formatDate(event.startdate)} - {formatDate(event.enddate)}</Typography>

                    <Typography variant="subtitle2">Register ID: {event.register_id}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" endIcon={<ArrowForwardIosIcon />} onClick={() => handleDetailsClick(event)}>เพิ่มเติม</Button>
                  </CardActions>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                  {registrationsForEvent
                    .filter(reg => String(reg.user) === String(userId) && reg.status === 'active') // กรองเฉพาะการลงทะเบียนของผู้ใช้ที่ล็อกอินอยู่
                    .map(reg => (
                  <Button key={reg.register_id} variant="contained" 
                  color={activeTab === 'สิ้นสุด' || activeTab === 'ยกเลิก' ? "inherit" : "error"}
                  onClick={() => handleCancel(reg.register_id)}
                  disabled={activeTab === 'สิ้นสุด' || activeTab === 'ยกเลิก'}
                  >
                    ยกเลิก
                 </Button>
                ))
             }

                  </CardActions>
                </Card>
              );
            })}
          </Box>
        )}

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)} // Change page when pagination clicked
          />
        </Box>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>ยืนยันการยกเลิก</DialogTitle>
          <DialogContent>
            <Typography>คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการลงทะเบียนนี้?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              ยกเลิก
            </Button>
            <Button onClick={confirmCancel} color="error">
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default JoinEvent;
