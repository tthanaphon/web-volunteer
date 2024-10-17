import React  from 'react';
import { Box, Typography,  CardContent, CardActions, Button } from '@mui/material';
import Sidebar from '../Front-end/Sidebar';// Assuming Sidebar is in the same directory
import dayjs from 'dayjs'; // import dayjs
import 'dayjs/locale/th';  // import locale ภาษาไทย
import { useLocation ,useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

dayjs.locale('th'); // ตั้งค่า locale เป็นภาษาไทย

const Detailpage = () => {
    const location = useLocation();
    const { event,currentCount  } = location.state || {};
    const navigate = useNavigate();


    if (!event) {
        return <Typography variant="h6">ไม่มีข้อมูลกิจกรรม</Typography>; // ถ้าไม่มีข้อมูลให้แสดงข้อความ
    }
    const handleRegister = (eventID,event_name) => {
        console.log('id:',eventID)
        navigate('/event-register',{state:{eventID,event_name}});
      }
    const formatDate = (dateString) => {
        const date = dayjs(dateString);
        return date.format('D MMM YYYY'); // รูปแบบ: วัน เดือน ปี
    };
    const handleBackClick = () => {
        navigate('/home');
    };

    return (
        <Box display="flex" height="100vh">
            {/* Sidebar */}
            <Sidebar />
            <Box sx={{ flexGrow: 1 , p: 3}}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">รายละเอียดกิจกรรม</Typography>
                    <Button
                        size="large"
                        color="primary"
                        endIcon={<ArrowBackIosIcon />}
                        onClick={() => handleBackClick()} // ใช้ฟังก์ชันเพื่อทำการนำทาง
                        sx={{ backgroundColor: '#f0f0f0' }}>
                    </Button>
                </Box>
                <Typography variant="subtitle1">{event.event_name}</Typography>
                <Typography variant="subtitle1">ผู้จัด: {event.user.name}</Typography>
                <Typography variant="subtitle2">หมวดหมู่: {event.type}</Typography>
                <Typography variant="subtitle2">สถานที่: {event.address} จังหวัด: {event.province}</Typography>
                <Typography variant="subtitle2">รายละเอียด: {event.detail}</Typography>
                <Typography variant="subtitle2">วันที่จัด: {formatDate(event.startdate)} - {formatDate(event.enddate)}</Typography>
                <Typography variant="subtitle2">เวลา: {event.timestart}</Typography>
                <Typography variant="subtitle2">จำนวนที่รับ: {event.amount}</Typography>

                <Box sx={{ mt: 1 }}> {/* เพิ่มระยะห่างระหว่างส่วน */}
                    <Typography variant="subtitle2">ช่องทางติดต่อ:</Typography>
                    <Typography variant="subtitle2">Tel: {event.user.tel}</Typography>
                    <Typography variant="subtitle2">Email: {event.user.email}</Typography>
                </Box>
            </CardContent>


            <CardActions  sx={{ justifyContent: 'flex-start' }}>
                <Button type="submit" variant="contained" color="primary" 
                sx={{ backgroundColor: currentCount >= event.amount ? '#ccc' : '#032b03' }} // ปรับสีปุ่มถ้าเต็ม
                disabled={currentCount >= event.amount} // ปิดการกดถ้าเต็ม
                onClick={() => handleRegister(event.event_id, event.event_name)}
                >
                    {currentCount >= event.amount ? 'เต็มแล้ว' : 'ลงทะเบียน'}
                </Button>
            </CardActions>
            </Box>
     </Box>
    );
};

export default Detailpage;