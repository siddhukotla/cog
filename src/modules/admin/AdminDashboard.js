import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  IconButton,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility'; // Corrected import

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [highlightPreferences, setHighlightPreferences] = useState({});

  const getCommunicationStatus = (lastCommunicationDate) => {
    const today = new Date();
    const lastCommDate = new Date(lastCommunicationDate);
    const diffTime = Math.abs(today - lastCommDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) return 'overdue';
    if (diffDays === 0) return 'due-today';
    return 'upcoming';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'overdue': return 'error.main';
      case 'due-today': return 'warning.main';
      default: return 'text.secondary';
    }
  };

  const toggleHighlightPreference = (company) => {
    setHighlightPreferences(prev => ({
      ...prev,
      [company]: !prev[company]
    }));
    // Store preferences in local storage
    localStorage.setItem('highlightPreferences', JSON.stringify({
      ...highlightPreferences,
      [company]: !highlightPreferences[company]
    }));
  };

  const features = [
    {
      title: 'Company Management',
      description: 'Manage and configure company profiles and settings',
      icon: <BusinessIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/admin/company-management',
      lastCommunication: '2024-01-10',
      highlightEnabled: true
    },
    {
      title: 'Communication Method Management',
      description: 'Configure and manage communication methods and templates',
      icon: <ChatIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/admin/communication-methods',
      lastCommunication: new Date().toISOString().split('T')[0],
      highlightEnabled: true
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            mb: 4,
            color: 'primary.main',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
          }}
        >
          Admin Dashboard
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  background: feature.highlightEnabled 
                    ? getStatusColor(getCommunicationStatus(feature.lastCommunication))
                    : 'background.paper',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    background: feature.highlightEnabled 
                      ? getStatusColor(getCommunicationStatus(feature.lastCommunication))
                      : 'background.paper'
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(feature.path)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: 4
                  }}
                >
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'primary.dark',
                        mb: 2
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: feature.highlightEnabled ? 'background.paper' : 'text.secondary',
                        lineHeight: 1.6
                      }}
                    >
                      {feature.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Tooltip title={feature.highlightEnabled ? "Disable highlight" : "Enable highlight"}>
                        <IconButton 
                          onClick={() => toggleHighlightPreference(feature.title)}
                          sx={{ color: feature.highlightEnabled ? 'background.paper' : 'text.secondary' }}
                        >
                          {feature.highlightEnabled 
                            ? <VisibilityOffIcon /> 
                            : <Visibility />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
