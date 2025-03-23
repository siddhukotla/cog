import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Box, Typography, Paper, Chip, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, ListItemIcon, Tabs, Tab } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FilterListIcon from '@mui/icons-material/FilterList';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventStyleGetter = (event) => {
  const backgroundColor = new Date(event.start) < new Date() ? '#f0f0f0' : '#e3f2fd';
  const borderColor = new Date(event.start) < new Date() ? '#bdbdbd' : '#90caf9';
  return {
    style: {
      backgroundColor,
      borderRadius: '4px',
      border: `1px solid ${borderColor}`,
      color: '#000',
      padding: '2px 4px'
    }
  };
};

const EnhancedCalendar = ({ events: initialEvents, addEvent }) => {
  const [socket, setSocket] = useState(null);
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    type: '',
    company: '',
    notes: ''
  });
  const [filter, setFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // WebSocket connection setup
  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket'],
      withCredentials: true
    });

    // Connection status logging
    newSocket.on('connect', () => {
      console.log('WebSocket connected successfully');
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    newSocket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err.message);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // WebSocket event listeners
  useEffect(() => {
    if (!socket) return;

    // Handle new events from server
    socket.on('newEvent', (event) => {
      setEvents(prevEvents => [...prevEvents, event]);
    });

    // Handle updated events from server
    socket.on('updatedEvent', (updatedEvent) => {
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    });

    // Handle deleted events from server
    socket.on('deletedEvent', (deletedEventId) => {
      setEvents(prevEvents => 
        prevEvents.filter(event => event.id !== deletedEventId)
      );
    });

    // Handle connection errors
    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    // Cleanup listeners
    return () => {
      socket.off('newEvent');
      socket.off('updatedEvent');
      socket.off('deletedEvent');
      socket.off('connect_error');
    };
  }, [socket]);

  // Filter events based on selected filter
  useEffect(() => {
    const now = new Date();
    const filtered = events.filter(event => {
      const eventDate = new Date(event.date);
      if (filter === 'past') return eventDate < now;
      if (filter === 'upcoming') return eventDate >= now;
      return true;
    });
    setFilteredEvents(filtered);
  }, [events, filter]);

  const calendarEvents = filteredEvents.map(event => ({
    title: `${event.type} - ${event.company}`,
    start: new Date(event.date),
    end: new Date(event.date),
    allDay: true,
    ...event
  }));

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = (slotInfo) => {
    setNewEvent({
      ...newEvent,
      start: slotInfo.start,
      end: slotInfo.end
    });
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    const eventWithId = {
      ...newEvent,
      id: Date.now().toString() // Generate unique ID
    };
    
    // Emit event to server
    if (socket) {
      socket.emit('addEvent', eventWithId);
    }

    // Update local state
    setEvents(prevEvents => [...prevEvents, eventWithId]);
    setIsModalOpen(false);
    setNewEvent({
      title: '',
      start: new Date(),
      end: new Date(),
      type: '',
      company: '',
      notes: ''
    });
  };

  const pastEvents = events.filter(event => new Date(event.date) < new Date());
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
        Communication Calendar
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Calendar View */}
      <Box sx={{ flex: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {Array.from({ length: 11 }, (_, i) => 2020 + i).map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              label="Month"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {[
                'January', 'February', 'March', 'April', 
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'
              ].map((month, index) => (
                <MenuItem key={month} value={index}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ height: '75vh', borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              defaultView="month"
              date={new Date(selectedYear, selectedMonth)}
              views={['month', 'week', 'day']}
              eventPropGetter={eventStyleGetter}
            />
          </Box>
        </Box>

        {/* Side Panel */}
        <Box sx={{ flex: 1 }}>
          {/* Filter Tabs */}
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterListIcon color="action" />
              Filter Communications
            </Typography>
            <Tabs
              value={filter}
              onChange={(e, newValue) => setFilter(newValue)}
              variant="fullWidth"
            >
              <Tab label="All" value="all" />
              <Tab label="Past" value="past" />
              <Tab label="Upcoming" value="upcoming" />
            </Tabs>
          </Paper>

          {/* Past Communications */}
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon color="action" />
              Past Communications
            </Typography>
            <List sx={{ maxHeight: '35vh', overflow: 'auto' }}>
              {pastEvents.map((event, index) => (
                <ListItem key={index} sx={{ p: 1, mb: 1, borderRadius: 1, bgcolor: 'background.paper' }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <EventNoteIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {event.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.type}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(event.date), 'MMM dd, yyyy')}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Upcoming Communications */}
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScheduleIcon color="action" />
              Upcoming Communications
            </Typography>
            <List sx={{ maxHeight: '35vh', overflow: 'auto' }}>
              {upcomingEvents.map((event, index) => (
                <ListItem key={index} sx={{ p: 1, mb: 1, borderRadius: 1, bgcolor: 'background.paper' }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <EventNoteIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {event.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.type}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(event.date), 'MMM dd, yyyy')}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {selectedEvent.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Date: {format(new Date(selectedEvent.start), 'MMM dd, yyyy')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Notes: {selectedEvent.notes || 'No notes available'}
          </Typography>
          <Chip 
            label={selectedEvent.type} 
            color="primary" 
            sx={{ mr: 1 }}
          />
          <Chip 
            label={selectedEvent.company} 
            color="secondary" 
          />
        </Paper>
      )}

      {/* Add Event Modal */}
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
            Add New Communication
          </Typography>

          <TextField
            fullWidth
            label="Company"
            value={newEvent.company}
            onChange={(e) => setNewEvent(prev => ({
              ...prev,
              company: e.target.value
            }))}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type of Communication</InputLabel>
            <Select
              value={newEvent.type}
              label="Type of Communication"
              onChange={(e) => setNewEvent(prev => ({
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
            label="Date"
            value={format(newEvent.start, 'yyyy-MM-dd')}
            onChange={(e) => setNewEvent(prev => ({
              ...prev,
              start: new Date(e.target.value),
              end: new Date(e.target.value)
            }))}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Notes"
            value={newEvent.notes}
            onChange={(e) => setNewEvent(prev => ({
              ...prev,
              notes: e.target.value
            }))}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddEvent}>
              Add Communication
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EnhancedCalendar;
