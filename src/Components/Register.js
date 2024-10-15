import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography,
     Dialog, DialogTitle, DialogContent, DialogActions,Snackbar, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Sidebar from '../Front-end/Sidebar';


const GENDER_CHOICES = ['ชาย', 'หญิง', 'อื่นๆ'];
const RELIGION_CHOICES = ['พุทธ', 'คริสต์', 'อิสลาม', 'ฮินดู', 'ซิกข์', 'ไม่มีศาสนา', 'อื่นๆ'];

const RegistrationForm = () => {
  const location = useLocation();
  const { eventID, event_name } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();
  
//  console.log('id',eventID)
//  console.log('name',event_name)
 
  const [formData, setFormData] = useState({
    register_firstname: '',
    register_lastname: '',
    register_nickname: '',
    register_gender: '',
    register_birthday: '',
    register_age: '',
    register_religion: '',
    register_tel: '',
    register_disease: '',
    register_allergy: '',
    etc: '',
  });

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRegisterClick = (e) => {
    e.preventDefault();
    setOpenDialog(true); // Open the dialog
};

  const handleSubmit = async (e) => {
    setLoading(true);

    // Include eventId and other necessary fields in the formData
    const dataToSubmit = { 
        register_firstname: formData.register_firstname,
        register_lastname: formData.register_lastname,
        register_nickname: formData.register_nickname,
        register_gender: formData.register_gender,
        register_birthday: formData.register_birthday,
        register_age: formData.register_age,
        register_religion: formData.register_religion,
        register_tel: formData.register_tel,
        register_disease: formData.register_disease,
        register_allergy: formData.register_allergy,
        etc: formData.etc,
        status: 'active', // Set status to active
        event: eventID, // Use the received eventId
        user: 3 // Replace with actual user ID or remove if not needed
    };
    console.log('data:', dataToSubmit)

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/registers/', dataToSubmit);
        console.log('Form submitted successfully:', response.data);
        setFormData({
            register_firstname: '',
            register_lastname: '',
            register_nickname: '',
            register_gender: '',
            register_birthday: '',
            register_age: '',
            register_religion: '',
            register_tel: '',
            register_disease: '',
            register_allergy: '',
            etc: '',
        });
        setLoading(false);
        setOpenDialog(false);
        setSnackbarOpen(true);
    } catch (error) {
        console.error('Error submitting form:', error);
        console.error('Response data:', error.response?.data); // Log detailed error response
        setLoading(false);
    }
};


  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box sx={{ flexGrow: 1 , p: 3}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">
            ลงทะเบียนกิจกรรม: {event_name || 'ไม่ระบุชื่อกิจกรรม'}
          </Typography>
          <Button
            size="large"
            color="primary"
            endIcon={<ArrowBackIosIcon />}
            onClick={handleBackClick}
            sx={{ backgroundColor: '#f0f0f0' }}
          >
          </Button>
        </Box>

        <form onSubmit={handleRegisterClick}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, ml: 2 }}>

            <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="ชื่อจริง"
              name="register_firstname"
              value={formData.register_firstname}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="นามสกุล"
              name="register_lastname"
              value={formData.register_lastname}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="ชื่อเล่น"
              name="register_nickname"
              value={formData.register_nickname}
              onChange={handleChange}
              fullWidth
              required
            />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>เพศ</InputLabel>
              <Select
                name="register_gender"
                value={formData.register_gender}
                onChange={handleChange}
              >
                {GENDER_CHOICES.map((gender, index) => (
                  <MenuItem key={index} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              label="วันเกิด"
              name="register_birthday"
              type="date"
              value={formData.register_birthday}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              label="อายุ"
              name="register_age"
              type="number"
              value={formData.register_age}
              onChange={handleChange}
              fullWidth
              required
            />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>ศาสนา</InputLabel>
              <Select
                name="register_religion"
                value={formData.register_religion}
                onChange={handleChange}
              >
                {RELIGION_CHOICES.map((religion, index) => (
                  <MenuItem key={index} value={religion}>
                    {religion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="เบอร์โทร"
              name="register_tel"
              value={formData.register_tel}
              onChange={handleChange}
              fullWidth
              required
            />
            </Box>

            <TextField
              label="โรคประจำตัว"
              name="register_disease"
              value={formData.register_disease}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="แพ้ยา"
              name="register_allergy"
              value={formData.register_allergy}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="อื่นๆ"
              name="etc"
              value={formData.etc}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Submitting...' : 'ลงทะเบียน'}
            </Button>
          </Box>
        </form>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>ยืนยันการลงทะเบียน</DialogTitle>
        <DialogContent>
            <Typography>คุณแน่ใจหรือว่าต้องการลงทะเบียนกิจกรรมนี้?</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">ยกเลิก</Button>
            <Button onClick={handleSubmit} color="primary">ยืนยัน</Button>
        </DialogActions>
        </Dialog>
        <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}>
                    <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                        <AlertTitle>สำเร็จ</AlertTitle>
                        ลงทะเบียนเสร็จสิ้น!
                    </Alert>
                </Snackbar>

      </Box>
    </Box>
  );
};

export default RegistrationForm; 
