import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, MenuItem, Select } from '@mui/material';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory

const activities = ['ผู้พิการ', 'การศึกษาและเยาวชน', 'สิ่งแวดล้อม', 'ศิลปะ/กราฟฟิก/ดีไซน์', 'สื่อ/คอนเทนต์', 'งานเขียน', 'งานฝีมือ/ทำที่บ้าน', 'อื่นๆ'];

const HomePage = () => {
    const [province, setProvince] = useState('');
    const [category, setCategory] = useState('');
    const [selectedActivity, setSelectedActivity] = useState('');

    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleActivityClick = (activity) => {
        if (selectedActivity === activity) {
            setSelectedActivity('');
        } else {
            setSelectedActivity(activity);
        }
    };

    return (
        <Box sx={{ display: 'flex', padding: 2 }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>กิจกรรมอาสา</Typography>
                
                {/* Filters */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Select value={province} onChange={handleProvinceChange} displayEmpty>
                        <MenuItem value="">
                            <em>กรุงเทพมหานคร</em>
                        </MenuItem>
                        <MenuItem value="กรุงเทพมหานคร">กรุงเทพมหานคร</MenuItem>
                        {/* Add more provinces here */}
                    </Select>

                    <Select value={category} onChange={handleCategoryChange} displayEmpty>
                        <MenuItem value="">
                            <em>ทั้งหมด</em>
                        </MenuItem>
                        {activities.map((activity, index) => (
                            <MenuItem key={index} value={activity}>{activity}</MenuItem>
                        ))}
                    </Select>

                    {/* Search Bar can go here */}
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
                <Typography variant="h6" sx={{ mt: 4 }}>แนะนำ</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                    {/* Example Card */}
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1">เก็บขยะที่บางปู</Typography>
                                <Typography variant="subtitle2">วันที่จัด: 5 ธ.ค. 67 - 6 ธ.ค. 67</Typography>
                                <Typography variant="subtitle2">สถานที่: บางปู</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">ลงทะเบียน</Button>
                            </CardActions>
                        </Card>
                    </Box>
                    {/* Add more cards similarly */}
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;
