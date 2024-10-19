import {  MenuItem, Select, InputLabel, FormControl, TextField, Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Description, Edit, Delete } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

const Myactivity = () => {
  const [requests, setRequests] = useState([]);  // เก็บข้อมูลคำร้องทั้งหมด
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [userId, setUserId] = useState(null);
  const [UserData, setUserData] = useState(null); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    event_name: '',
    type: '',
    address: '',
    province: '',
    detail: '',
    amount: '',
    startdate: '',
    enddate: '',
    timestart: '',
    date_create: new Date().toISOString().slice(0, 16),
    user: '',
  });
  const [eventImg, setEventImg] = useState(null);

  const provinces = [
    { value: 'กรุงเทพมหานคร', label: 'กรุงเทพมหานคร' },
    { value: 'กระบี่', label: 'กระบี่' },
    { value: 'กาญจนบุรี', label: 'กาญจนบุรี' },
    { value: 'กาฬสินธุ์', label: 'กาฬสินธุ์' },
    { value: 'กำแพงเพชร', label: 'กำแพงเพชร' },
    { value: 'ขอนแก่น', label: 'ขอนแก่น' },
    { value: 'จันทบุรี', label: 'จันทบุรี' },
    { value: 'ฉะเชิงเทรา', label: 'ฉะเชิงเทรา' },
    { value: 'ชลบุรี', label: 'ชลบุรี' },
    { value: 'ชัยนาท', label: 'ชัยนาท' },
    { value: 'ชัยภูมิ', label: 'ชัยภูมิ' },
    { value: 'ชุมพร', label: 'ชุมพร' },
    { value: 'เชียงราย', label: 'เชียงราย' },
    { value: 'เชียงใหม่', label: 'เชียงใหม่' },
    { value: 'ตรัง', label: 'ตรัง' },
    { value: 'ตราด', label: 'ตราด' },
    { value: 'ตาก', label: 'ตาก' },
    { value: 'นครนายก', label: 'นครนายก' },
    { value: 'นครปฐม', label: 'นครปฐม' },
    { value: 'นครพนม', label: 'นครพนม' },
    { value: 'นครราชสีมา', label: 'นครราชสีมา' },
    { value: 'นครศรีธรรมราช', label: 'นครศรีธรรมราช' },
    { value: 'นครสวรรค์', label: 'นครสวรรค์' },
    { value: 'นนทบุรี', label: 'นนทบุรี' },
    { value: 'นราธิวาส', label: 'นราธิวาส' },
    { value: 'น่าน', label: 'น่าน' },
    { value: 'บึงกาฬ', label: 'บึงกาฬ' },
    { value: 'บุรีรัมย์', label: 'บุรีรัมย์' },
    { value: 'ปทุมธานี', label: 'ปทุมธานี' },
    { value: 'ประจวบคีรีขันธ์', label: 'ประจวบคีรีขันธ์' },
    { value: 'ปราจีนบุรี', label: 'ปราจีนบุรี' },
    { value: 'ปัตตานี', label: 'ปัตตานี' },
    { value: 'พะเยา', label: 'พะเยา' },
    { value: 'พระนครศรีอยุธยา', label: 'พระนครศรีอยุธยา' },
    { value: 'พังงา', label: 'พังงา' },
    { value: 'พัทลุง', label: 'พัทลุง' },
    { value: 'พิจิตร', label: 'พิจิตร' },
    { value: 'พิษณุโลก', label: 'พิษณุโลก' },
    { value: 'เพชรบุรี', label: 'เพชรบุรี' },
    { value: 'เพชรบูรณ์', label: 'เพชรบูรณ์' },
    { value: 'แพร่', label: 'แพร่' },
    { value: 'ภูเก็ต', label: 'ภูเก็ต' },
    { value: 'มหาสารคาม', label: 'มหาสารคาม' },
    { value: 'มุกดาหาร', label: 'มุกดาหาร' },
    { value: 'แม่ฮ่องสอน', label: 'แม่ฮ่องสอน' },
    { value: 'ยโสธร', label: 'ยโสธร' },
    { value: 'ยะลา', label: 'ยะลา' },
    { value: 'ร้อยเอ็ด', label: 'ร้อยเอ็ด' },
    { value: 'ระนอง', label: 'ระนอง' },
    { value: 'ระยอง', label: 'ระยอง' },
    { value: 'ราชบุรี', label: 'ราชบุรี' },
    { value: 'ลพบุรี', label: 'ลพบุรี' },
    { value: 'ลำปาง', label: 'ลำปาง' },
    { value: 'ลำพูน', label: 'ลำพูน' },
    { value: 'เลย', label: 'เลย' },
    { value: 'ศรีสะเกษ', label: 'ศรีสะเกษ' },
    { value: 'สกลนคร', label: 'สกลนคร' },
    { value: 'สงขลา', label: 'สงขลา' },
    { value: 'สตูล', label: 'สตูล' },
    { value: 'สมุทรปราการ', label: 'สมุทรปราการ' },
    { value: 'สมุทรสงคราม', label: 'สมุทรสงคราม' },
    { value: 'สมุทรสาคร', label: 'สมุทรสาคร' },
    { value: 'สระแก้ว', label: 'สระแก้ว' },
    { value: 'สระบุรี', label: 'สระบุรี' },
    { value: 'สิงห์บุรี', label: 'สิงห์บุรี' },
    { value: 'สุโขทัย', label: 'สุโขทัย' },
    { value: 'สุพรรณบุรี', label: 'สุพรรณบุรี' },
    { value: 'สุราษฎร์ธานี', label: 'สุราษฎร์ธานี' },
    { value: 'สุรินทร์', label: 'สุรินทร์' },
    { value: 'หนองคาย', label: 'หนองคาย' },
    { value: 'หนองบัวลำภู', label: 'หนองบัวลำภู' },
    { value: 'อ่างทอง', label: 'อ่างทอง' },
    { value: 'อุดรธานี', label: 'อุดรธานี' },
    { value: 'อุทัยธานี', label: 'อุทัยธานี' },
    { value: 'อุตรดิตถ์', label: 'อุตรดิตถ์' },
    { value: 'อุบลราชธานี', label: 'อุบลราชธานี' },
    { value: 'อำนาจเจริญ', label: 'อำนาจเจริญ' },
  ];
  
  const eventTypes = [
    { value: 'ผู้พิการ', label: 'ผู้พิการ' },
    { value: 'การศึกษาและเยาวชน', label: 'การศึกษาและเยาวชน' },
    { value: 'สิ่งแวดล้อม', label: 'สิ่งแวดล้อม' },
    { value: 'ศิลปะ/กราฟฟิก/ดีไซน', label: 'ศิลปะ/กราฟฟิก/ดีไซน์' },
    { value: 'สื่อ/คอนเทนต์', label: 'สื่อ/คอนเทนต์' },
    { value: 'งานเขียน', label: 'งานเขียน' },
    { value: 'งานฝีมือ/ทำที่บ้าน', label: 'งานฝีมือ/ทำที่บ้าน' },
    { value: 'อื่นๆ', label: 'อื่นๆ' },
  ];

  const handleOpenForm = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: userId || '', // Set the user ID here if it exists
      event_name: '',
      type: '',
      address: '',
      province: '',
      detail: '',
      amount: '',
      startdate: '',
      enddate: '',
      timestart: '',
      date_create: new Date().toISOString().slice(0, 16),
    }));
    setEventImg(null);
    setOpen(true);
  };

  const handleCloseForm = () => setOpen(false); // ปิดฟอร์ม

  const handleFileChange = (e) => setEventImg(e.target.files[0]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userID');
    if (storedUserId) {
      setUserId(storedUserId);
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: storedUserId, // อัปเดตค่า user ใน formData
      }));
      // Fetch ข้อมูลผู้ใช้จาก API โดยใช้ storedUserId
      fetch(`http://127.0.0.1:8000/api/users/${storedUserId}/`)
        .then((response) => response.json())
        .then((data) => {
          setUserData({ name: data.name, tel: data.tel, email: data.email,img:data.user_img });
          console.log('User data fetched:', data);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    } else {
      console.log('No userId found in localStorage');
    }
  }, []);
 
  const listRegister = (eventID) => {
    console.log('รายชื่อถูกคลิกแล้ว, eventID:', eventID);
    navigate(`/listregister?eventID=${eventID}`);
  };

  const handleOpenDetailDialog = (id) => {
    setLoadingEvent(true);
    setError(null);
  
    // Ensure you are using eventId instead of id
    fetch(`http://127.0.0.1:8000/api/events/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        return response.json();
        
      })
      .then((data) => {
        setSelectedEvent(data);
        console.log('Selected Event:', data);
        console.log('Image Filename:', data.event_img);
        setOpenDetailDialog(true);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
        setError('Failed to load event details. Please try again later.');
      })
      .finally(() => {
        setLoadingEvent(false);
      });
  };
  // Function to close the dialog
  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedEvent(null);
  };


  const deleteEventById = (id) => {
    const confirmDelete = window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรม?`);
    
    if (confirmDelete) {
      fetch(`http://127.0.0.1:8000/api/events/${id}/`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            window.location.reload(); // Reload the page after successful deletion
          } else {
            console.error('Failed to delete event');
          }
        })
        .catch((error) => console.error('Error deleting event:', error));
    } 
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'timestart' ? `${value}:00` : value 
    });
  };
  
  // const handleSubmit = () => {
  //   console.log('User ID in formData:', formData.user);
  //   const isFormValid = Object.values(formData).every((field) => field !== '');
  //   if (!isFormValid) {
  //     alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
  //     return;
  //   }
  //   const data = new FormData();
  //   Object.keys(formData).forEach((key) => data.append(key, formData[key]));
  //   if (eventImg) data.append('event_img', eventImg);
  //   let eventId
  //   fetch('http://127.0.0.1:8000/api/events/', { method: 'POST', body: data })
  //     .then((response) => response.json().then((data) => ({ status: response.status, data })))
  //     .then(({ status, data }) => {
  //       if (status === 400) console.error('Bad Request:', data);
  //       else console.log('Event created:', data);
  //       eventId = data.event_id;
  //       console.log('Event ID:', eventId);
  //       handleCloseForm();
  //     })
  //     .catch((error) => console.error('Error creating event:', error));

  //     //สร้าง request โยน event.id เข้าไป
  //     const data_req = new FormData();
  //     data_req.append('event', eventId);
  //     data_req.append('comment', "");
  //     data_req.append('status', "รออนุมัติ");

  //     console.log("data_req",data_req)
  //     // Send request to the API
  //     fetch('http://127.0.0.1:8000/api/requests/', {
  //       method: 'POST',
  //       body: data_req,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('Request created:', data);
  //       })
  //       .catch((error) => {
  //         console.error('Error creating request:', error);
  //       });
  // };
  
  const handleSubmit = () => {
    console.log('User ID in formData:', formData.user);
    
    // Validate form fields
    const isFormValid = Object.values(formData).every((field) => field !== '');
    if (!isFormValid) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
  
    // Create form data for event submission
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (eventImg) data.append('event_img', eventImg);
  
    // POST request to create a new event
    fetch('http://127.0.0.1:8000/api/events/', {
      method: 'POST',
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create event: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Event created:', data);
        const eventId = data.event_id;
  
        // Prepare request data
        const data_req = {
          comment: "",
          status: "รออนุมัติ",
          event: eventId,
        };
  
        // POST request to create a new request
        return fetch('http://127.0.0.1:8000/api/requests/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data_req),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create request: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Request created:', data);
        handleCloseForm();
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error during form submission:', error);
        alert('An error occurred while submitting the form. Please try again.');
      });
  };
  
  // useEffect(() => {
  //   if (userId) {
  //     console.log('Current userId:', userId);
  
      // Fetch requests from the API
  //     fetch('http://127.0.0.1:8000/api/requests/')
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch requests: ' + response.statusText);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // Filter requests based on `userId`
  //         const filteredRequests = data.filter((request) => {
  //           // Check if event is an object and contains user information
  //           if (typeof request.event === 'object' && request.event.user) {
  //             return request.event.user === parseInt(userId);
  //           }
  //           return false;
  //         });
  
  //         // Set filtered requests or log if no matches are found
  //         if (filteredRequests.length > 0) {
  //           console.log('Filtered requests:', filteredRequests);
  //           setRequests(filteredRequests);
  //         } else {
  //           console.log('No matching requests for the current user.');
  //         }
  //       })
  //       .catch((error) => console.error('Error fetching requests:', error));
  //   } else {
  //     console.log('User ID is not available.');
  //   }
  // }, [userId]);
  
  useEffect(() => {
    const fetchRequestsAndEvents = async () => {
        try {
            const [requestsResponse, eventsResponse] = await Promise.all([
                fetch('http://127.0.0.1:8000/api/requests/'),
                fetch('http://127.0.0.1:8000/api/events/')
            ]);

            if (!requestsResponse.ok || !eventsResponse.ok) {
                throw new Error(`HTTP error! Status: ${requestsResponse.status} ${eventsResponse.status}`);
            }

            const requestsResult = await requestsResponse.json();
            const eventsResult = await eventsResponse.json();

            console.log('Fetched request data:', requestsResult);
            console.log('Fetched event data:', eventsResult);

            setEvents(eventsResult);

            if (userId) {
                // Map event_id to event details
                const eventMap = eventsResult.reduce((acc, event) => {
                    acc[event.event_id] = event; // Store the full event object
                    return acc;
                }, {});

                // Log eventMap to check its structure
                console.log('Event Map:', eventMap);

                // Filter requests based on userId associated with event and include event details
                const matchingRequests = requestsResult
                    .filter(request => eventMap[request.event] && eventMap[request.event].user === parseInt(userId, 10))
                    .map(request => ({
                        ...request,
                        event: eventMap[request.event] // Add full event details to each request
                    }));

                // Log matchingRequests to see what is being matched
                console.log(`Matching requests for userId ${userId}:`, matchingRequests);
                setRequests(matchingRequests);
            } else {
                console.log('UserId is not available for filtering requests.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchRequestsAndEvents();
}, [userId]);
;

  const renderTable = (title, status) => {
    const filteredRequests = requests.filter((request) => request.status === status);
  
    if (filteredRequests.length === 0) return null;
  
    return (
      <Box p={3}>
        <Typography variant="h6" mt={3}>{title}</Typography>
        {filteredRequests.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ชื่อกิจกรรม</TableCell>
                  <TableCell>ประเภท</TableCell>
                  <TableCell>วันจัดกิจกรรม</TableCell>
                  <TableCell>จำนวนคนลงทะเบียน</TableCell>
                  <TableCell> * </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.request_id}>
                    <TableCell>{request.event.event_name}</TableCell>
                    <TableCell>{request.event.type}</TableCell>
                    <TableCell>{`${request.event.startdate} - ${request.event.enddate}`}</TableCell>
                    <TableCell>
                    {request.event.amount}
                    {status === 'อนุมัติ' && (
                      <span
                        onClick={() => listRegister(request.event.event_id)}
                        style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer', marginLeft: '8px' }}
                      >
                        รายชื่อ
                      </span>
                    )}
                  </TableCell>
                    <TableCell>
                      <Description 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => handleOpenDetailDialog(request.event.event_id)}
                      />
                      <Edit style={{ cursor: 'pointer' }} />
                      <Delete 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => deleteEventById(request.event.event_id)} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" mt={2}>ไม่มีคำขอที่ตรงกับสถานะ {status}</Typography>
        )}
      </Box>
    );
  };
  return (
    <Box sx={{ display: 'flex', padding: 2 }}>
      <Sidebar />
      <Box flexGrow={1} bgcolor="#f5f5f5" p={3}>
        <Paper elevation={2} sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4, borderRadius: '50' }}>
  <Typography variant="h5" gutterBottom>โปรไฟล์</Typography>
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      {UserData ? (
        <>
          <Typography variant="body1">ชื่อ: {UserData.name}</Typography>
          <Typography variant="body1">Tel: {UserData.tel}</Typography>
          <Typography variant="body1">Email: {UserData.email}</Typography>
        </>
      ) : (
        <Typography variant="body1">กำลังโหลดข้อมูล...</Typography>
      )}
    </Grid>
  </Grid>
</Paper>


          <Button variant="contained" color="primary" onClick={handleOpenForm} startIcon={<AddIcon />}>
            เพิ่มกิจกรรม
          </Button>

    {/* Form for Adding Event */}
    <Dialog open={open} onClose={handleCloseForm} maxWidth="md" fullWidth>
      <DialogTitle>
          สร้างกิจกรรม
          <IconButton
            aria-label="close"
            onClick={handleCloseForm}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
      </DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              {/* ชื่อกิจกรรม */}
              <Grid item xs={12} md={6}>
                <TextField label="ชื่อกิจกรรม" name="event_name" fullWidth onChange={handleChange}  value={formData.event_name}/>
              </Grid>

             {/* หมวดหมู่ */}
             <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>หมวดหมู่</InputLabel>
                <Select
                  label="หมวดหมู่"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {eventTypes.map((eventType) => (
                    <MenuItem key={eventType.value} value={eventType.value}>
                      {eventType.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* สถานที่จัด */}
            <Grid item xs={12} md={6}>
              <TextField
                label="สถานที่จัด"
                name="address"
                fullWidth
                onChange={handleChange}
                value={formData.address}
              />
            </Grid>

            {/* จังหวัด */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>จังหวัด</InputLabel>
                <Select
                  label="จังหวัด"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                >
                  {provinces.map((province) => (
                    <MenuItem key={province.value} value={province.value}>
                      {province.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
                                    
            {/* รายละเอียด */}
            <Grid item xs={12}>
              <TextField
                label="รายละเอียด"
                name="detail"
                fullWidth
                multiline
                rows={4}
                onChange={handleChange}
                value={formData.detail}
              />
            </Grid>

            {/* จำนวนที่รับ */}
            <Grid item xs={12} md={6}>
              <TextField
                label="จำนวนที่รับ"
                name="amount"
                fullWidth
                onChange={handleChange}
                type="number"
                value={formData.amount}
              />
            </Grid>

            {/* วันที่เริ่มกิจกรรม */}
            <Grid item xs={12} md={6}>
              <TextField
                label="วันที่เริ่มกิจกรรม"
                name="startdate"
                type="date"
                fullWidth
                onChange={handleChange}
                value={formData.startdate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* วันสิ้นสุดกิจกรรม */}
            <Grid item xs={12} md={6}>
              <TextField
                label="วันสิ้นสุดกิจกรรม"
                name="enddate"
                type="date"
                fullWidth
                onChange={handleChange}
                value={formData.enddate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* เวลาจัดกิจกรรม */}
            <Grid item xs={12} md={6}>
              <TextField
                label="เวลาจัดกิจกรรม"
                name="timestart"
                type="time"
                fullWidth
                onChange={handleChange}  // เรียกใช้ handleChange ที่อัปเดตแล้ว
                value={formData.timestart.slice(0, 5)} // แสดงแค่ HH:MM ใน input แต่เก็บ HH:MM:SS
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

          </Grid>
          {/* วันที่สร้างกิจกรรม */}
          <Grid item xs={12} md={6}>
            <TextField
              label="วันที่สร้างกิจกรรม"
              name="date_create"
              type="datetime-local"  // รูปแบบ datetime-local สำหรับดึงวันที่และเวลา
              fullWidth
              onChange={handleChange}  // อัปเดตค่าเมื่อมีการเปลี่ยนแปลง
              value={formData.date_create}  // เก็บค่าของ date_create ใน formData
              InputLabelProps={{
                shrink: true,  // ทำให้ label ยังคงอยู่เมื่อมีค่าในช่อง TextField
              }}
            />
          </Grid>
          {/* รายชื่อผู้จัดกิจกรรม */}
          <Grid item xs={12} md={6}>
            <TextField
              label="ผู้จัดกิจกรรม"
              fullWidth
              value={UserData ? `${UserData.name} (${UserData.tel})` : ''} // ตรวจสอบว่า UserData มีค่าหรือไม่ก่อนแสดง
              InputProps={{
                readOnly: true, // ทำให้ไม่สามารถแก้ไขข้อมูลใน TextField ได้
              }}
            />
          </Grid>
                  {/* อัปโหลดไฟล์รูปภาพ */}
                  <Grid item xs={12} md={6}>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Grid>
              
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              สร้างกิจกรรม
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
    
{/* Dialog for showing event details */}
<Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          {selectedEvent?.event_name}
          <IconButton
            aria-label="close"
            onClick={handleCloseDetailDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            {selectedEvent?.event_img && ( <img src={selectedEvent.event_img}  alt={selectedEvent.event_name} style={{ width: '20%', marginTop: '10px', borderRadius: '8px' }} />)}
            <Typography variant="body1"><strong>ประเภท:</strong> {selectedEvent?.type}</Typography>
            <Typography variant="body1"><strong>สถานที่:</strong> {selectedEvent?.address}</Typography>
            <Typography variant="body1"><strong>จังหวัด:</strong> {selectedEvent?.province}</Typography>
            <Typography variant="body1"><strong>รายละเอียด:</strong> {selectedEvent?.detail}</Typography>
            <Typography variant="body1"><strong>จำนวนที่รับ:</strong> {selectedEvent?.amount}</Typography>
            <Typography variant="body1"><strong>วันที่เริ่มกิจกรรม:</strong> {selectedEvent?.startdate} </Typography>
            <Typography variant="body1"><strong>วันที่สิ้นสุดกิจกรรม:</strong> {selectedEvent?.enddate}</Typography>
            <Typography variant="body1"><strong>เวลา:</strong> {selectedEvent?.timestart}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
   

          {/* Tables for Approved, Pending, and Rejected Activities */}
          {renderTable('อนุมัติแล้ว', 'อนุมัติ')}
          {renderTable('รออนุมัติ', 'รออนุมัติ')}
          {renderTable('ไม่อนุมัติ', 'ไม่อนุมัติ')}
        </Paper>
      </Box>
    </Box>
  );
};

export default Myactivity;
