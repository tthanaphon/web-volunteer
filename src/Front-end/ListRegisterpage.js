import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ListRegis = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventID = searchParams.get('eventID');
  const navigate = useNavigate();
  const [registers, setRegisters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRegisters, setFilteredRegisters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    console.log('Fetching registers...');
    console.log('Current eventID:', eventID);

    const fetchRegisters = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/registers/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        const filteredData = data.filter((reg) => reg.event === Number(eventID));
        console.log('Filtered data:', filteredData);

        setRegisters(filteredData);
        setFilteredRegisters(filteredData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisters();
  }, [eventID]);

  useEffect(() => {
    console.log('Registers updated:', registers);
  }, [registers]);

  const handleBack = () => {
    navigate(-1); // ย้อนกลับไปยังหน้าก่อนหน้า
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = registers.filter((reg) =>
      reg.register_firstname.toLowerCase().includes(query) ||
      reg.register_lastname.toLowerCase().includes(query) ||
      reg.register_nickname.toLowerCase().includes(query)
    );
    setFilteredRegisters(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const displayedRegisters = filteredRegisters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ display: 'flex', padding: 2 }}>
      <Sidebar />
            <Box sx={{ flex: 1, marginLeft: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <IconButton onClick={handleBack} sx={{ marginRight: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">รายชื่อคนลงทะเบียน</Typography>
      </Box>
        <Box sx={{ marginY: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="ค้นหา..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </Box>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            {console.log('Rendering table...')}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ชื่อ</TableCell>
                    <TableCell>นามสกุล</TableCell>
                    <TableCell>ชื่อเล่น</TableCell>
                    <TableCell>เพศ</TableCell>
                    <TableCell>วันเกิด</TableCell>
                    <TableCell>ศาสนา</TableCell>
                    <TableCell>โรคประจำตัว</TableCell>
                    <TableCell>เบอร์โทร</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedRegisters.length > 0 ? (
                    displayedRegisters.map((reg) => (
                      <TableRow key={reg.register_id}>
                        <TableCell>{reg.register_firstname}</TableCell>
                        <TableCell>{reg.register_lastname}</TableCell>
                        <TableCell>{reg.register_nickname}</TableCell>
                        <TableCell>{reg.register_gender}</TableCell>
                        <TableCell>{reg.register_birthday}</TableCell>
                        <TableCell>{reg.register_religion}</TableCell>
                        <TableCell>{reg.register_disease}</TableCell>
                        <TableCell>{reg.register_tel}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography>ไม่มีข้อมูลที่ตรงกับการค้นหา</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Pagination
                count={Math.ceil(filteredRegisters.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ListRegis;
