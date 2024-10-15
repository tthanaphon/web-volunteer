import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, MenuItem, Select } from '@mui/material';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory
import axios from 'axios';
import dayjs from 'dayjs'; // import dayjs
import 'dayjs/locale/th';  // import locale ภาษาไทย
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';


dayjs.locale('th'); // ตั้งค่า locale เป็นภาษาไทย

const activities = [
  'ผู้พิการ', 'การศึกษาและเยาวชน', 'สิ่งแวดล้อม', 
  'ศิลปะ/กราฟฟิก/ดีไซน์', 'สื่อ/คอนเทนต์', 'งานเขียน', 
  'งานฝีมือ/ทำที่บ้าน', 'อื่นๆ'
];
const provinceChoices = [
    'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 
    'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 
    'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 
    'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 
    'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 
    'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พะเยา', 'พระนครศรีอยุธยา', 
    'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 
    'แพร่', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 
    'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 
    'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 
    'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 
    'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 
    'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 'อุตรดิตถ์', 
    'อุบลราชธานี', 'อำนาจเจริญ'
  ];
  
const typedate =['ทั้งหมด','ค้างคืน','ระหว่างวัน']

const HomePage = () => {
  const [province, setProvince] = useState('');
  const [typedateActivity, setTypedateActivity] = useState('ทั้งหมด');
  const [selectedActivity, setSelectedActivity] = useState('ทั้งหมด');
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  
  
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
    return registrations.filter((registration) => registration.event === eventID).length; //นับจำนวนคนลงทะเบียน
  };



  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    return date.format('D MMM YYYY'); // รูปแบบ: วัน เดือน ปี พ.ศ.
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(selectedActivity === activity ? 'ทั้งหมด' : activity);
  };

  // Filter events based on both selected activity and province
  const filteredEvents = events.filter(event => {
    const typedate = event.startdate === event.enddate ? 'ระหว่างวัน' : 'ค้างคืน';

    const matchesActivity = selectedActivity === 'ทั้งหมด' || event.type === selectedActivity;
    const matchesProvince = !province || event.province === province;
    const matchesTypeDate = typedateActivity === 'ทั้งหมด' || typedate === typedateActivity;

    return matchesActivity && matchesProvince && matchesTypeDate;
  });

  const handleDetailsClick = (event) => {
    const currentCount = countRegistrationsForEvent(event.event_id); // คำนวณจำนวนการลงทะเบียน
    navigate('/event-detail', { state: { event, currentCount } }); 
  };

  const handleRegister = (eventID,event_name) => {
    console.log('id:',eventID)
    navigate('/event-register',{state:{eventID,event_name}});
  }


  return (
    <Box sx={{ display: 'flex', padding: 2 }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>กิจกรรมอาสา</Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 , }}>
            <> 
            <Typography variant="subtitle1">จังหวัด:</Typography>
            <Select
            value={province}
            onChange={handleProvinceChange}
            displayEmpty
            sx={{
                width: '250px',
                borderRadius: '12px', // ทำให้กล่องเป็นมน
                bgcolor: 'background.paper', // สีพื้นหลังของกล่อง
                '& .MuiSelect-select': {
                padding: '5px', // ระยะห่างภายใน
                },
            }}
            >
            <MenuItem value="">
                <em>ทั้งหมด</em>
            </MenuItem>
            {provinceChoices.map((prov, index) => (
                <MenuItem key={index} value={prov}>
                {prov}
                </MenuItem>
            ))}
            </Select>

            <Typography variant="subtitle1">ประเภท:</Typography>
            <Select
            value={typedateActivity}
            onChange={(e) => setTypedateActivity(e.target.value)}
            displayEmpty
            sx={{
                width: '250px',
                borderRadius: '12px', // ทำให้กล่องเป็นมน
                bgcolor: 'background.paper', // สีพื้นหลังของกล่อง
                '& .MuiSelect-select': {
                padding: '5px', // ระยะห่างภายใน
                },
            }}
            >
            {typedate.map((prov, index) => (
                <MenuItem key={index} value={prov}>
                {prov}
                </MenuItem>
            ))}
            </Select>
            </>
        </Box>

        {/* Activity Categories */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2 }}>
          {activities.map((activity, index) => (
            <Box key={index}>
              <Card
                sx={{ 
                  minHeight: '150px', 
                  cursor: 'pointer',
                  backgroundColor: selectedActivity === activity ? '#d1c4e9' : 'white',
                  transition: 'background-color 0.3s',
                }}
                onClick={() => handleActivityClick(activity)}
              >
                <CardContent>
                  <Typography variant="h6">{activity}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Recommended activities */}
        <Typography variant="h6" sx={{ mt: 4 }}>กิจกรรม</Typography>

        {filteredEvents.length === 0 ? (
          <Typography variant="subtitle1" color="textSecondary">ไม่มีกิจกรรม</Typography>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            {filteredEvents.map((event, index) => (
              <Box key={index}>
                <Card key={index}  sx={{ border: '2px solid green', borderRadius: '16px' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{bgcolor: '#ffdef2'}}><Typography variant="subtitle2" >Post: {formatDate(event.date_create)}</Typography></Box>
                    <Box 
                            display="flex" 
                            alignItems="center" 
                            border="1px solid #ccc" // กำหนดเส้นกรอบ
                            padding="8px" // เพิ่มระยะห่างจากขอบ
                            borderRadius="8px" // ทำให้ขอบโค้งมน
                            width="fit-content" // กำหนดให้กว้างพอดีกับเนื้อหา
                    > 
                    <PeopleAltIcon sx={{ marginRight: '8px', color: '#1976d2' }} />
                    <Typography> {countRegistrationsForEvent(event.event_id)}/{event.amount}</Typography>
                    </Box>
                    </Box>
                    
                    <Typography variant="subtitle1">{event.event_name}</Typography>
                    <Typography variant="subtitle1">ผู้จัด: {event.user.name}</Typography>
                    <Typography variant="subtitle2">สถานที่: {event.address}</Typography>
                    <Typography variant="subtitle2">วันที่จัด: {formatDate(event.startdate)} - {formatDate(event.enddate)}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="#d9e139"
                      endIcon={<ArrowForwardIosIcon />}
                      onClick={() => handleDetailsClick(event)}
                      sx={{fontWeight: 'bold',
                        bgcolor: '',
                        '&:hover': {
                          bgcolor: "#d9e139",
                        }, }}
                    >
                      เพิ่มเติม
                    </Button>
                  </CardActions>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx = {{backgroundColor :"#032b03"}}
                        color={countRegistrationsForEvent(event.event_id) >= event.amount ? 'error' : 'primary'} // เปลี่ยนสีปุ่มเป็นสีแดงถ้าจำนวนเต็ม
                        onClick={() => handleRegister(event.event_id, event.event_name)}
                        disabled={countRegistrationsForEvent(event.event_id) >= event.amount} // ปุ่มจะคลิกไม่ได้ถ้าจำนวนผู้ลงทะเบียนเต็ม
                    >
                        {countRegistrationsForEvent(event.event_id) >= event.amount ? 'เต็มแล้ว' : 'ลงทะเบียน'} {/* เปลี่ยนข้อความในปุ่ม */}
                    </Button>
                </CardActions>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
