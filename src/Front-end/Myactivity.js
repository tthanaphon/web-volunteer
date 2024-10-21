import {  DialogActions,MenuItem, Select, InputLabel, FormControl, TextField, Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';


const Myactivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editEventData, setEditEventData] = useState(null);
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
  const [registrations, setRegistrations] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
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
    { value: 'ศิลปะ/กราฟฟิก/ดีไซน์', label: 'ศิลปะ/กราฟฟิก/ดีไซน์' },
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
          setUserData({ name: data.name, tel: data.tel, email: data.email,img:data.user_img,passwords:data.passwords,username:data.username });
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

  const handleOpenEditForm = (event, request) => {
    setEditEventData({ ...event, requestStatus: request.status });
    setFormData({
      ...formData,
      event_name: event.event_name,
      type: event.type,
      address: event.address,
      province: event.province,
      detail: event.detail,
      amount: event.amount,
      startdate: event.startdate,
      enddate: event.enddate,
      timestart: event.timestart,
      date_create: new Date().toISOString().slice(0, 16),
      user: event.user,
    });
    setEventImg(null);
    setOpenEditForm(true);
  };
  
  const handleCloseEditForm = () => {
    setOpenEditForm(false);
    setEditEventData(null);
  };
  const handleUpdate = () => {
    if (formData.amount <= 0) {
      alert('กรุณากรอกจำนวนที่รับมากกว่า 0');
      return;
    }
  
    if (!editEventData) return;
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (eventImg) data.append('event_img', eventImg);
  
    fetch(`http://127.0.0.1:8000/api/events/${editEventData.event_id}/`, {
      method: 'PUT',
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update event: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Event updated:', data);
        handleCloseEditForm();
        window.location.reload(); // Reload the page to see the updated list
      })
      .catch((error) => {
        console.error('Error updating event:', error);
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      });
  };
  const handleOpenDeleteDialog = (id) => {
    setEventIdToDelete(id);
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setEventIdToDelete(null);
    setOpenDeleteDialog(false);
  };
  
  const confirmDeleteEvent = () => {
    if (eventIdToDelete) {
      fetch(`http://127.0.0.1:8000/api/events/${eventIdToDelete}/`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            window.location.reload();
          } else {
            console.error('Failed to delete event');
          }
        })
        .catch((error) => console.error('Error deleting event:', error))
        .finally(() => {
          handleCloseDeleteDialog();
        });
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'timestart' ? `${value}:00` : value 
    });
  };
  
  const fetchRegistrations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/registers/');
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };
  
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/events/');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  
  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);
  
  const countRegistrationsForEvent = (eventID) => {
    return registrations.filter((registration) => registration.event === eventID).length; // Count registrations per event
  };
  
  // Map each event to its registration count
  const eventsWithRegistrationCount = events.map((event) => ({
    ...event,
    registrationCount: countRegistrationsForEvent(event.id),
  }));
  
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
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    tel: '',
    user_image: '',
    password: '',
    username: '',
  });
  const defaultImage = 'http://127.0.0.1:8000/media/default_user.png';
  const userImageUrl = userProfile.user_image || defaultImage;

  useEffect(() => {
    if (userId) {
      console.log('Fetching user data for userId:', userId); // ตรวจสอบว่าค่า userId ถูกต้อง
      fetch(`http://127.0.0.1:8000/api/users/${userId}/`)
        .then((response) => {
          console.log('Response status:', response.status); // ตรวจสอบสถานะของการตอบกลับ
          return response.json();
        })
        .then((data) => {
          console.log('Fetched user data:', data); // ตรวจสอบข้อมูลที่ได้รับ
          setUserProfile({
            name: data.name,
            email: data.email,
            tel: data.tel,
            user_image: data.user_img,
            password: data.password,
            username: data.username,
          });
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [userId]);
  

  const handleOpenProfileEdit = () => {
    setIsProfileEditOpen(true);
  };

  const handleCloseProfileEdit = () => {
    setIsProfileEditOpen(false);
  };

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    let errorMessage = "";
  
    // ตรวจสอบฟิลด์ที่ต้องไม่ว่าง ยกเว้น user_image
    if (name !== "user_image" && !value) {
      errorMessage = "กรุณากรอกข้อมูลให้ครบถ้วน";
    }
  
    if (name === "email") {
      // ตรวจสอบรูปแบบอีเมล
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorMessage = "กรุณากรอกอีเมลให้ถูกต้อง";
      }
    }
  
    if (name === "tel" && value.length > 10) return;
  
    if (name === 'user_image' && files && files.length > 0) {
      // ถ้ามีการเลือกไฟล์ใหม่ ให้ใช้ไฟล์นั้น
      setUserProfile({
        ...userProfile,
        [name]: files[0],
      });
    } else {
      setUserProfile({
        ...userProfile,
        [name]: value,
      });
    }
    setFormError({
      ...formError,
      [name]: errorMessage,
    });
  };
  
  const handleProfileSave = () => {
    const data = new FormData();
    data.append('name', userProfile.name);
    data.append('email', userProfile.email);
    data.append('tel', userProfile.tel);
    data.append('username', userProfile.username);
    data.append('password', userProfile.password);
  
    // ตรวจสอบว่ามีการเลือกไฟล์รูปภาพใหม่หรือไม่
    if (userProfile.user_image && userProfile.user_image instanceof File) {
      data.append('user_img', userProfile.user_image); // ถ้ามีไฟล์ใหม่ ให้ใช้ไฟล์นั้น
    }
  
    fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
      method: 'PUT',
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Profile updated successfully:', data);
        setUserProfile(data);
        handleCloseProfileEdit();
  
        // Reload the page after successful update
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };
  
  const handleSubmit = () => {
    // Validate that no fields are empty (except 'event_img' since it's optional)
    const isFormValid = Object.entries(formData).every(
      ([key, value]) => key === 'event_img' || (value && value !== '')
    );
    if (!eventImg) {
      alert('กรุณาอัปโหลดรูปภาพก่อนสร้างกิจกรรม');
      return;
    }
  
    // Additional validation: ensure 'amount' is greater than zero
    if (formData.amount <= 0) {
      alert('กรุณากรอกข้อมูลให้ถูกต้อง');
      return;
    }
  
    if (!isFormValid) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
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
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
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
const renderEditForm = () => {
  if (!editEventData) return null;
  const { requestStatus } = editEventData;
{/* Dialog for edit details */}
  return (
    <Dialog open={openEditForm} onClose={handleCloseEditForm} maxWidth="md" fullWidth>
      <DialogTitle>
        แก้ไขกิจกรรม 
        <IconButton
          aria-label="close"
          onClick={handleCloseEditForm}
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
            {/* แสดงฟิลด์ตามสถานะคำร้อง */}
            {requestStatus === 'อนุมัติ' ? (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="วันที่เริ่มกิจกรรม"
                    name="startdate"
                    type="date"
                    fullWidth
                    onChange={handleChange}
                    value={formData.startdate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="วันสิ้นสุดกิจกรรม"
                    name="enddate"
                    type="date"
                    fullWidth
                    onChange={handleChange}
                    value={formData.enddate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
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
                <Grid item xs={12} md={6}>
                  <TextField
                    label="เวลาจัดกิจกรรม"
                    name="timestart"
                    type="time"
                    fullWidth
                    onChange={handleChange}
                    value={formData.timestart.slice(0, 5)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="ชื่อกิจกรรม"
                    name="event_name"
                    fullWidth
                    onChange={handleChange}
                    value={formData.event_name}
                  />
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
          {/* วันที่สร้างกิจกรรม */}
          <Grid item xs={12} md={6}>
          <TextField
            label="วันที่สร้างกิจกรรม"
            name="date_create"
            type="datetime-local"  // รูปแบบ datetime-local สำหรับดึงวันที่และเวลา
            fullWidth
            value={formData.date_create}  // เก็บค่าของ date_create ใน formData
            InputProps={{
              readOnly: true,  // ทำให้ไม่สามารถแก้ไขข้อมูลใน TextField ได้
            }}
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
              </>
            )}
          </Grid>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              แก้ไขกิจกรรม
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
{/* showTable */}
const renderTable = (title, status) => {
  const filteredRequests = requests.filter((request) => 
    request.status === status &&
    (request.event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     request.event.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (filteredRequests.length === 0) {
    return null;
  }
  let statusColor = '#999999'; // Default color
  if (status === 'อนุมัติ') statusColor = '#2EBDBD';
  else if (status === 'รออนุมัติ') statusColor = '#FFCC33';
  else if (status === 'ไม่อนุมัติ') statusColor = '#CC0000';
  return (
<Box p={3}>
      <Typography
        variant="h6"
        mt={3}
        sx={{
          backgroundColor: statusColor,
          color: 'white',
          borderRadius: '16px', // ทำให้กรอบมีขอบโค้ง
          padding: '8px 16px', // เพิ่มช่องว่างด้านในเพื่อให้ข้อความดูดีขึ้น
          display: 'inline-block', // ทำให้ขนาดพอดีกับข้อความ
          width: '10%',
          marginBottom: '16px', // เพิ่มระยะห่างด้านล่างจากตาราง
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell
          align="center"
          sx={{ backgroundColor: 'gray', color: 'white', width: '20%' }}
        >
          ชื่อกิจกรรม
        </TableCell>
        <TableCell
          align="center"
          sx={{ backgroundColor: 'gray', color: 'white', width: '20%' }}
        >
          ประเภท
        </TableCell>
        <TableCell
          align="center"
          sx={{ backgroundColor: 'gray', color: 'white', width: '20%' }}
        >
          วันจัดกิจกรรม
        </TableCell>
        <TableCell
          align="center"
          sx={{ backgroundColor: 'gray', color: 'white', width: '20%' }}
        >
          จำนวนคนลงทะเบียน
        </TableCell>
        <TableCell
          align="center"
          sx={{ backgroundColor: 'gray', color: 'white', width: '20%' }}
        >
          *
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredRequests.map((request) => {
        const registrationCount = countRegistrationsForEvent(request.event.event_id);
        return (
          <TableRow key={request.request_id}>
            <TableCell align="center" sx={{ width: '20%' }}>
              {request.event.event_name}
            </TableCell>
            <TableCell align="center" sx={{ width: '20%' }}>
              {request.event.type}
            </TableCell>
            <TableCell align="center" sx={{ width: '20%' }}>
              {`${request.event.startdate} - ${request.event.enddate}`}
            </TableCell>
            <TableCell align="center" sx={{ width: '20%' }}>
              {registrationCount}/{request.event.amount}
              {status === 'อนุมัติ' && (
                <span
                  onClick={() => listRegister(request.event.event_id)}
                  style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer', marginLeft: '8px' }}
                >
                  รายชื่อ
                </span>
              )}
            </TableCell>
            <TableCell align="center" sx={{ width: '20%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <IconButton
                  sx={{
                    backgroundColor: '#E0E0E0',
                    borderRadius: '8px',
                    padding: '8px',
                    '&:hover': {
                      backgroundColor: '#D3D3D3',
                    },
                  }}
                  onClick={() => handleOpenDetailDialog(request.event.event_id)}
                >
                  <DescriptionIcon sx={{ color: 'blue' }} />
                </IconButton>

                {status !== 'ไม่อนุมัติ' && (
                  <IconButton
                    sx={{
                      backgroundColor: '#E0E0E0',
                      borderRadius: '8px',
                      padding: '8px',
                      '&:hover': {
                        backgroundColor: '#D3D3D3',
                      },
                    }}
                    onClick={() => handleOpenEditForm(request.event, request)}
                  >
                    <EditIcon sx={{ color: 'orange' }} />
                  </IconButton>
                )}

                <IconButton
                  sx={{
                    backgroundColor: '#E0E0E0',
                    borderRadius: '8px',
                    padding: '8px',
                    '&:hover': {
                      backgroundColor: '#D3D3D3',
                    },
                  }}
                  onClick={() => handleOpenDeleteDialog(request.event.event_id)}
                >
                  <DeleteIcon sx={{ color: 'red' }} />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>

    </Box>
    
  );
};

{/*profile */}
return (
  <Box sx={{ display: 'flex', padding: 2 }}>
    <Sidebar />
    <Box flexGrow={1} bgcolor="#f5f5f5" p={3}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 10, borderRadius: '50' }}>
      <Box
        sx={{
          borderRadius: '16px',
          padding: 2,
          backgroundColor: '#f5f5f5',
          boxShadow: 3,
          position: 'relative', // ทำให้สามารถจัดตำแหน่งไอคอนได้
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 8, // ระยะจากขอบด้านบนของกล่อง
            right: 8, // ระยะจากขอบด้านขวาของกล่อง
          }}
          onClick={handleOpenProfileEdit}// ใส่ฟังก์ชันที่ต้องการเรียกใช้เมื่อกดปุ่มแก้ไข
        >
          <EditIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          {UserData ? (
              <Box display="flex" alignItems="center" gap={2}>
                {/* รูปภาพ */}
                <img
                  src={userImageUrl}
                  alt="User Profile"
                  style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                />
                {/* ข้อมูลผู้ใช้ */}
                <Box>
                  <Typography variant="body1">ชื่อ: {UserData.name}</Typography>
                  <Typography variant="body1">เบอร์โทร: {UserData.tel}</Typography>
                  <Typography variant="body1">อีเมล: {UserData.email}</Typography>
                </Box>
              </Box>
            ) : (
              <Typography variant="body1">กำลังโหลดข้อมูล...</Typography>
            )}

          </Grid>
        </Grid>
      </Box>
            {/* Dialog สำหรับแก้ไขโปรไฟล์ */}
      <Dialog open={isProfileEditOpen} onClose={handleCloseProfileEdit} maxWidth="sm" fullWidth>
        <DialogTitle  >
          แก้ไขโปรไฟล์
          <IconButton
            aria-label="close"
            onClick={handleCloseProfileEdit}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                label="ชื่อ"
                name="name"
                margin="normal" 
                fullWidth
                value={userProfile.name}
                onChange={handleProfileChange}
                error={!!formError.name}
                helperText={formError.name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="อีเมล"
                type="email"
                name="email"
                fullWidth
                value={userProfile.email}
                onChange={handleProfileChange}
                error={!!formError.email}
                helperText={formError.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="เบอร์โทร"
                type="number"
                name="tel"
                fullWidth
                value={userProfile.tel}
                onChange={handleProfileChange}
                error={!!formError.tel}
                helperText={formError.tel}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="username"
                name="username"
                fullWidth
                value={userProfile.username}
                onChange={handleProfileChange}
                error={!!formError.username}
                helperText={formError.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="password"
                name="password"
                fullWidth
                value={userProfile.password}
                onChange={handleProfileChange}
                error={!!formError.password}
                helperText={formError.password}
              />
            </Grid>
            {/* อัปโหลดไฟล์รูปภาพ */}
            <Grid item xs={12}>
            <input
            accept="image/*"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setUserProfile({
                ...userProfile,
                user_image: file,
              });
            }}
          />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileEdit} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={handleProfileSave} color="primary" variant="contained">
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
          <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2, // เพิ่มช่องว่างระหว่าง TextField และ Button
          marginY: 2, // เพิ่มระยะห่างบน-ล่าง
        }}
      >
        <TextField
          label="ค้นหากิจกรรม"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flex: 1 }} // ใช้ flex เพื่อให้ TextField ขยายได้เต็มที่
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenForm}
          startIcon={<AddIcon />}
        >
          เพิ่มกิจกรรม
        </Button>
      </Box>
      {/* Form for Delete Event */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        maxWidth="xs" // ขนาดเล็กกว่าปกติเพื่อให้เหมือนตัวอย่าง
        fullWidth
        sx={{ 
          '& .MuiDialog-paper': { 
            width: '500px', 
            height: '300px', 
            maxWidth: 'none', 
            borderRadius: '16px' // ปรับขอบให้มนขึ้น
          } 
        }}
      >
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            height="100%"
          >
            <WarningIcon sx={{ color: 'orange', fontSize: 60, marginBottom: 2 }} />
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              ลบกิจกรรม ?
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 3 }}>
              คุณแน่ใจใช่ไหมว่าต้องการลบกิจกรรม
            </Typography>
            <Box display="flex" gap={2}>
              <Button 
                onClick={confirmDeleteEvent} 
                color="primary" 
                variant="contained"
                sx={{ paddingX: 3 }}
              >
            ยืนยัน
              </Button>
              <Button 
                onClick={handleCloseDeleteDialog} 
                color="error" 
                variant="outlined"
                sx={{ paddingX: 3 }}
              >
                ยกเลิก
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>


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
            {/* วันที่สร้างกิจกรรม */}
            <Grid item xs={12} md={6}>
            <TextField
              label="วันที่สร้างกิจกรรม"
              name="date_create"
              type="datetime-local"  // รูปแบบ datetime-local สำหรับดึงวันที่และเวลา
              fullWidth
              value={formData.date_create}  // เก็บค่าของ date_create ใน formData
              InputProps={{
                readOnly: true,  // ทำให้ไม่สามารถแก้ไขข้อมูลใน TextField ได้
              }}
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
    <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="lg" fullWidth
    sx={{
    '& .MuiDialog-paper': {
      width: '50%', // Adjusts the dialog width, you can set this to a desired percentage or value like '600px'
      maxWidth: 'none', // This ensures the custom width is applied
    },
  }}>
  <DialogTitle>
  <Typography variant="h10" fontWeight="bold">
      รายละเอียดกิจกรรม
    </Typography>
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
    <Typography variant="body1" >
      <strong>ชื่อกิจกรรม:</strong> {selectedEvent?.event_name}
      </Typography>
      <Typography variant="body1">
        <strong>ประเภท:</strong> {selectedEvent?.type}
      </Typography>
      <Typography variant="body1">
        <strong>สถานที่:</strong> {selectedEvent?.address}
      </Typography>
      {selectedEvent?.event_img && (
        <img
          src={selectedEvent.event_img}
          alt={selectedEvent.event_name}
          style={{ width: '20%', marginTop: '10px', borderRadius: '8px' }}
        />
      )}
      <Typography variant="body1">
        <strong>รายละเอียด:</strong> {selectedEvent?.detail}
      </Typography>
      <Typography variant="body1">
        <strong>จำนวนที่รับ:</strong> {selectedEvent?.amount}
      </Typography>
      <Typography variant="body1">
        <strong>วันที่เริ่มกิจกรรม:</strong> {selectedEvent?.startdate}
      </Typography>
      <Typography variant="body1">
        <strong>วันที่สิ้นสุดกิจกรรม:</strong> {selectedEvent?.enddate}
      </Typography>
      <Typography variant="body1">
        <strong>เวลา:</strong> {selectedEvent?.timestart}
      </Typography>
    </Box>
  </DialogContent>
</Dialog>

    

        {renderTable('อนุมัติ', 'อนุมัติ')}
        {renderTable('รออนุมัติ', 'รออนุมัติ')}
        {renderTable('ไม่อนุมัติ', 'ไม่อนุมัติ')}
        {renderEditForm()}
      </Paper>
    </Box>
  </Box>
  
);

};

export default Myactivity;