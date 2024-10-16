
import {  MenuItem, Select, InputLabel, FormControl,TextField,Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Dialog, DialogTitle, DialogContent,IconButton,List, ListItem, ListItemText } from '@mui/material';
import { Description, Edit, Delete } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

const Myactivity = () => {
  const [requests, setRequests] = useState([]);  // เก็บข้อมูลคำร้องทั้งหมด
  const users = [
    { user_id: 1, name: 'John Doe', tel: '0812345678' },
    {user_id: 2, name: 'Jane Smith', tel: '0897654321'},
  ];
  const [open, setOpen] = useState(false);
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
    setFormData({
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
    setEventImg(null);
    setOpen(true); // เปิดฟอร์ม
  };
  const handleCloseForm = () => {
    setOpen(false); // ปิดฟอร์ม
  };
  const handleFileChange = (e) => {
    setEventImg(e.target.files[0]); // ตรวจสอบว่าค่าไฟล์ถูกเก็บ
    console.log(e.target.files[0]); // ดูว่ามีไฟล์ถูกอัปโหลดจริงหรือไม่
  };
  

    const handleChange = (e) => {
      const { name, value } = e.target;
    
      // ตรวจสอบว่าช่องที่กำลังเปลี่ยนคือ timestart
      if (name === 'timestart') {
        const timeWithSeconds = `${value}:00`; // เพิ่มวินาทีเป็น 00 เพื่อให้ได้รูปแบบ HH:MM:SS
        setFormData({ ...formData, [name]: timeWithSeconds });
      } else {
        setFormData({ ...formData, [name]: value });
      }
      if (name === 'user') {
        console.log('User selected:', value);  // แสดงค่า user_id ที่ถูกเลือก
      }
    };
    


  const handleSubmit = () => {
    // ตรวจสอบว่าฟิลด์ทุกฟิลด์ไม่เป็นค่าว่าง
    const isFormValid = Object.values(formData).every(field => field !== '');
    if (!isFormValid) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    console.log('Submitting form data:', formData.user);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    console.log('Submitting form data with user_id:', formData.user);  // ตรวจสอบว่ามี user_id
    
    if (eventImg) {
      data.append('event_img', eventImg);
    }
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    } 
    fetch('http://127.0.0.1:8000/api/events/', {
      method: 'POST',
      body: data,
    })
    .then((response) => response.json().then((data) => ({status: response.status, data})))
    .then(({status, data}) => {
      if (status === 400) {
        console.error('Bad Request:', data);
      } else {
        console.log('Event created:', data);
      }
    })
    .catch((error) => console.error('Error creating event:', error));
    
  };
  
  
  useEffect(() => {
    // ดึงข้อมูลคำร้องจาก API
    fetch('http://127.0.0.1:8000/api/requests/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Requests :', data);  // ตรวจสอบข้อมูลคำร้อง
        setRequests(data);  // เก็บคำร้องใน state
      })
      .catch((error) => console.error('Error fetching requests:', error));
  }, []);


  return (
    <Box sx={{ display: 'flex', padding: 2 }}>
      {/* Sidebar */}
      <Sidebar />
      <Box flexGrow={1} bgcolor="#f5f5f5" p={3}>
        <Paper elevation={2} sx={{ padding: 3 }}>
          
               {/* Profile Section with Paper (raised box) */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4, borderRadius: '50'}}>
        <Typography variant="h5" gutterBottom>โปรไฟล์</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">อาสาบ้านดินไทย</Typography>
            <Typography variant="body1">Tel: 369 258 147</Typography>
            <Typography variant="body1">Email: guyhawkins@gmail.com</Typography>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
          </Grid>
        </Grid>
      </Paper>
      <Button variant="contained" color="primary" onClick={handleOpenForm} startIcon={<AddIcon />}>เพิ่มกิจกรรม</Button>

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
    <FormControl fullWidth>
      <InputLabel>ผู้จัดกิจกรรม</InputLabel>
      <Select
        label="ผู้จัดกิจกรรม"
        name="user"
        value={formData.user}
        onChange={handleChange} // เมื่อเลือกผู้ใช้ จะอัปเดตค่า user_id ใน formData
      >
        {users.map((user) => (
          <MenuItem key={user.user_id} value={user.user_id}>
            {user.name} ({user.tel}) {/* แสดงชื่อและเบอร์โทรของผู้ใช้ */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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

          {/* Approved Activities */}
          <Typography variant="h6" mt={3}>อนุมัติแล้ว</Typography>
          <Box p={3}>
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
                  {requests
                    .filter((request) => request.status === 'อนุมัติ') 
                    .map((request) => (
                      <TableRow key={request.request_id}>
                        <TableCell>{request.event.event_name}</TableCell>
                        <TableCell>{request.event.type}</TableCell>
                        <TableCell>{`${request.event.startdate} - ${request.event.enddate}`}</TableCell>
                        <TableCell>{request.event.amount}
                          <Typography component="span" sx={{ color: 'blue', cursor: 'pointer', marginLeft: 1 }}> รายชื่อ </Typography>
                        </TableCell>
                        <TableCell>
                          <Description style={{ cursor: 'pointer' }} />
                          <Edit style={{ cursor: 'pointer' }} />
                          <Delete style={{ cursor: 'pointer' }} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
  
          {/* Pending Activities */}
          <Typography variant="h6" mt={3}>รออนุมัติ</Typography>
          <Box p={3}>
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
                  {requests
                    .filter((request) => request.status === 'รออนุมัติ')  
                    .map((request) => (
                      <TableRow key={request.request_id}>
                        <TableCell>{request.event.event_name}</TableCell>
                        <TableCell>{request.event.type}</TableCell>
                        <TableCell>{`${request.event.startdate} - ${request.event.enddate}`}</TableCell>
                        <TableCell>{request.event.amount}
                          <Typography component="span" sx={{ color: 'blue', cursor: 'pointer', marginLeft: 1 }}> รายชื่อ </Typography>
                        </TableCell>
                        <TableCell>
                          <Description style={{ cursor: 'pointer' }} />
                          <Edit style={{ cursor: 'pointer' }} />
                          <Delete style={{ cursor: 'pointer' }} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
  
          {/* Rejected Activities */}
          <Typography variant="h6" mt={3}>ไม่อนุมัติ</Typography>
          <Box p={3}>
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
                  {requests
                    .filter((request) => request.status === 'ไม่อนุมัติ')  
                    .map((request) => (
                      <TableRow key={request.request_id}>
                        <TableCell>{request.event.event_name}</TableCell>
                        <TableCell>{request.event.type}</TableCell>
                        <TableCell>{`${request.event.startdate} - ${request.event.enddate}`}</TableCell>
                        <TableCell>{request.event.amount}
                          <Typography component="span" sx={{ color: 'blue', cursor: 'pointer', marginLeft: 1 }}> รายชื่อ </Typography>
                        </TableCell>
                        <TableCell>
                          <Description style={{ cursor: 'pointer' }} />
                          <Edit style={{ cursor: 'pointer' }} />
                          <Delete style={{ cursor: 'pointer' }} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>
    </Box>
  );  
};

export default Myactivity;
