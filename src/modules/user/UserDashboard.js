import React, { useState } from 'react';
import { Box, Button, Typography, Tabs, Tab, TextField, Badge, FormControl, InputLabel, Select, MenuItem, Tooltip, Modal } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { DataGrid } from '@mui/x-data-grid';
import EnhancedCalendar from './EnhancedCalendar';
import 'date-fns';

// Define the missing components

const DashboardContent = ({ addEvent, companies, setCompanies }) => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCommunication, setNewCommunication] = useState({
    type: '',
    date: new Date(),
    notes: ''
  });

  const handleCommunicationSubmit = () => {
    // Add logic to handle new communication
    setIsModalOpen(false);
  };

  const columns = [
    {
      field: 'name', 
      headerName: 'Company Name', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon fontSize="small" />
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'lastCommunications',
      headerName: 'Last Communications',
      width: 350,
      renderCell: (params) => (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1.5,
          py: 1
        }}>
          {params.row.communications.slice(-5).map((comm, index) => (
            <Tooltip key={index} title={comm.notes || 'No notes available'} arrow>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                p: 1,
                borderRadius: 1,
                backgroundColor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transition: 'background-color 0.2s ease'
                }
              }}>
                <EventNoteIcon fontSize="small" sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {comm.type} 
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ({new Date(comm.date).toLocaleDateString()})
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
      )
    },
    {
      field: 'nextCommunication',
      headerName: 'Next Communication',
      width: 250,
      renderCell: (params) => {
        const nextComm = params.row.nextCommunication;
        const today = new Date();
        const commDate = new Date(nextComm.date);
        const isOverdue = commDate < today;
        const isDueToday = commDate.toDateString() === today.toDateString();
        
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: params.row.highlightDisabled ? 'transparent' : 
                isOverdue ? 'error.light' : isDueToday ? 'warning.light' : 'transparent',
              p: 1,
              borderRadius: 1
            }}
          >
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">
              {nextComm.type} ({commDate.toLocaleDateString()})
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={(e) => {
            e.stopPropagation(); // Prevent row selection
            const updatedCompanies = companies.map(company => 
              company.id === params.row.id ? 
              { ...company, highlightDisabled: !company.highlightDisabled } : 
              company
            );
            // Update the companies state
            setCompanies(updatedCompanies);
          }}
        >
          {params.row.highlightDisabled ? 'Enable Highlight' : 'Disable Highlight'}
        </Button>
      )
    }
  ];

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setIsModalOpen(true)}
          disabled={selectedCompanies.length === 0}
        >
          Communication Performed
        </Button>
      </Box>
      
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={companies}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedCompanies(newSelection);
          }}
        />
      </Box>

      {/* Communication Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Log New Communication
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type of Communication</InputLabel>
            <Select
              value={newCommunication.type}
              label="Type of Communication"
              onChange={(e) => setNewCommunication(prev => ({
                ...prev,
                type: e.target.value
              }))}
            >
              <MenuItem value="LinkedIn Post">LinkedIn Post</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Phone Call">Phone Call</MenuItem>
              <MenuItem value="Conference Call">Conference Call</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="date"
            label="Date of Communication"
            value={newCommunication.date}
            onChange={(e) => setNewCommunication(prev => ({
              ...prev,
              date: e.target.value
            }))}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Notes"
            value={newCommunication.notes}
            onChange={(e) => setNewCommunication(prev => ({
              ...prev,
              notes: e.target.value
            }))}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleCommunicationSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const NotificationsContent = ({ companies }) => {
  const today = new Date();
  
  // Get overdue and due communications
  const overdueCommunications = companies.filter(company => {
    const commDate = new Date(company.nextCommunication.date);
    return commDate < today && !company.highlightDisabled;
  });

  const dueCommunications = companies.filter(company => {
    const commDate = new Date(company.nextCommunication.date);
    return commDate.toDateString() === today.toDateString() && !company.highlightDisabled;
  });

  const notificationCount = overdueCommunications.length + dueCommunications.length;

  const columns = [
    {
      field: 'name',
      headerName: 'Company Name',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon fontSize="small" />
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'nextCommunication',
      headerName: 'Next Communication',
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarTodayIcon fontSize="small" />
          <Typography variant="body2">
            {params.value.type} ({new Date(params.value.date).toLocaleDateString()})
          </Typography>
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Notifications
        <Badge 
          badgeContent={notificationCount} 
          color="error" 
          sx={{ ml: 2 }}
        />
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Overdue Communications
        </Typography>
        <Box sx={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={overdueCommunications}
            columns={columns}
            getRowId={(row) => row.id}
            disableSelectionOnClick
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Today's Communications
        </Typography>
        <Box sx={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={dueCommunications}
            columns={columns}
            getRowId={(row) => row.id}
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  );
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'ENTNT',
      location: 'Abu Dhabi',
      communications: [
        { type: 'LinkedIn Post', date: '2024-12-20', notes: 'Initial outreach' },
        { type: 'Email', date: '2024-12-15', notes: 'Follow-up email' },
        { type: 'LinkedIn Post', date: '2024-12-20', notes: 'Company update' }
      ],
      nextCommunication: { type: 'Phone Call', date: '2024-12-30' },
      highlightDisabled: false
    },
    {
      id: 2,
      name: 'GOOGLE',
      location: 'California, US',
      communications: [
        { type: 'Email', date: '2024-12-25', notes: 'Holiday greetings' },
        { type: 'Webinar', date: '2024-12-20', notes: 'Tech trends webinar' },
        { type: 'Email', date: '2024-12-25', notes: 'Follow-up email' }
      ],
      nextCommunication: { type: 'Newsletter', date: '2024-12-28' },
      highlightDisabled: false
    },
    {
      id: 3,
      name: 'MICROSOFT',
      location: 'Washington, US',
      communications: [
        { type: 'Email', date: '2024-12-26', notes: 'Product update' },
        { type: 'Conference Call', date: '2024-12-19', notes: 'Quarterly review' },
        { type: 'Email', date: '2024-12-26', notes: 'Follow-up email' }
      ],
      nextCommunication: { type: 'Webinar', date: '2024-12-29' },
      highlightDisabled: false
    },
    {
      id: 4,
      name: 'AMAZON',
      location: 'Seattle, US',
      communications: [
        { type: 'Email', date: '2024-12-28', notes: 'Holiday schedule' },
        { type: 'Newsletter', date: '2024-12-21', notes: 'Monthly newsletter' },
        { type: 'Phone Call', date: '2024-12-17', notes: 'Support follow-up' },
        { type: 'Email', date: '2024-12-28', notes: 'Year-end review' }
      ],
      nextCommunication: { type: 'Webinar', date: '2024-12-31' },
      highlightDisabled: false
    }
  ]);

  const [events, setEvents] = useState([
    {
      title: 'LinkedIn Post - ENTNT',
      date: '2024-12-20',
      type: 'LinkedIn Post',
      company: 'ENTNT'
    },
    {
      title: 'Email - GOOGLE',
      date: '2024-12-25',
      type: 'Email',
      company: 'GOOGLE'
    },
    {
      title: 'Conference Call - MICROSOFT',
      date: '2024-12-19',
      type: 'Conference Call',
      company: 'MICROSOFT'
    },
    {
      title: 'Phone Call - AMAZON',
      date: '2024-12-17',
      type: 'Phone Call',
      company: 'AMAZON'
    }
  ]);


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const addEvent = (event) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              color: 'text.secondary',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              px: 3,
              py: 1.5,
              minHeight: 'auto',
              '&.Mui-selected': {
                color: '#ffffff',
                backgroundColor: '#1976d2',
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              },
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                borderRadius: 2
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DashboardIcon fontSize="small" />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Dashboard
                </Typography>
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Calendar
                </Typography>
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <NotificationsIcon fontSize="small" />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Notifications
                </Typography>
              </Box>
            }
          />
        </Tabs>
      </Box>
      <Box sx={{ p: 2 }}>
        {activeTab === 0 && <DashboardContent addEvent={addEvent} companies={companies} setCompanies={setCompanies} />}
        {activeTab === 1 && <EnhancedCalendar events={events} addEvent={addEvent} />}
        {activeTab === 2 && <NotificationsContent companies={companies} />}
      </Box>
    </Box>
  );
};

export default UserDashboard;
