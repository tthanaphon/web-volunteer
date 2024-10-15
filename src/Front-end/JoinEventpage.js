import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Tabs, Tab, Pagination } from '@mui/material';
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
  const eventsPerPage = 3; // กำหนดจำนวนกิจกรรมต่อหน้า
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponse = await axios.get('http://127.0.0.1:8000/api/events/');
        setEvents(eventResponse.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchRegistrations = async () => {
      try {
        const registrationResponse = await axios.get('http://127.0.0.1:8000/api/registers/');
        setRegistrations(registrationResponse.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };

    fetchEvents();
    fetchRegistrations();
  }, []);

  const countRegistrationsForEvent = (eventID) => {
    return registrations.filter((registration) => registration.event === eventID).length;
  };

  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    return date.format('D MMM YYYY');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  useEffect(() => {
    const filterEvents = () => {
      const today = dayjs().startOf('day');
      let filtered;
  
      if (activeTab === 'ดำเนินการ') {
        filtered = events.filter(event => 
          dayjs(event.startdate).isSame(today, 'day') && dayjs(event.enddate).isAfter(today)
        );
      } else if (activeTab === 'สิ้นสุด') {
        filtered = events.filter(event => 
          dayjs(event.enddate).isBefore(today)
        );
      } else {
        filtered = events;
      }
  
      setFilteredEvents(filtered);
    };
  
    filterEvents();
  }, [events, activeTab]);

  // คำนวณจำนวนหน้าจากจำนวนกิจกรรมทั้งหมดที่กรองแล้ว
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice((page - 1) * eventsPerPage, page * eventsPerPage);

  const handleDetailsClick = (event) => {
    const currentCount = countRegistrationsForEvent(event.event_id);
    navigate('/event-detail', { state: { event, currentCount } });
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
        </Tabs>

        {currentEvents.length === 0 ? (
          <Typography variant="subtitle1" color="textSecondary">ไม่มีกิจกรรม</Typography>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {currentEvents.map((event, index) => (
              <Card key={index}  sx={{ border: '2px solid green', borderRadius: '16px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle2">Post: {formatDate(event.date_create)}</Typography>
                    <Box display="flex" alignItems="center">
                      <PeopleAltIcon sx={{ marginRight: '8px', color: '#1976d2' }} />
                      <Typography>{countRegistrationsForEvent(event.event_id)}/{event.amount}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle1">{event.event_name}</Typography>
                  <Typography variant="subtitle1">ผู้จัด: {event.user.name}</Typography>
                  <Typography variant="subtitle2">สถานที่: {event.address}</Typography>
                  <Typography variant="subtitle2">วันที่จัด: {formatDate(event.startdate)} - {formatDate(event.enddate)}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" endIcon={<ArrowForwardIosIcon />} onClick={() => handleDetailsClick(event)}>เพิ่มเติม</Button>
                </CardActions>
                <CardActions  sx={{ justifyContent: 'flex-end' }}>
                  <Button variant="contained" color="error" >ยกเลิก</Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)} // เปลี่ยนหน้าเมื่อคลิก Pagination
          />
        </Box>
      </Box>
    </Box>
  );
};

export default JoinEvent;
