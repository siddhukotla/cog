import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { CustomThemeProvider } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Link } from 'react-router-dom';
import AdminDashboard from './modules/admin/AdminDashboard';
import UserDashboard from './modules/user/UserDashboard';
import ReportingDashboard from './modules/reporting/ReportingDashboard';
import CompanyManagement from './modules/admin/CompanyManagement';
import CommunicationMethodManagement from './modules/admin/CommunicationMethodManagement';

const drawerWidth = 240;

const App = () => {
  return (
    <CustomThemeProvider>
      {({ isDarkTheme, toggleTheme } = {}) => (
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ 
          zIndex: (t) => t.zIndex.drawer + 1
        }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              Vth_ENTNT
            </Typography>
            <Typography variant="h6" component="div" sx={{ 
              flexGrow: 1, 
              textAlign: 'center'
            }}>
              COMMUNICATION TRACKING
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {[
                { 
                  text: 'Admin', 
                  path: '/admin',
                  icon: <AdminPanelSettingsIcon sx={{ color: 'primary.main' }} />
                },
                { 
                  text: 'User', 
                  path: '/user',
                  icon: <PersonIcon sx={{ color: 'secondary.main' }} />
                },
                { 
                  text: 'Reporting & Analytics', 
                  path: '/reporting',
                  icon: <AnalyticsIcon sx={{ color: 'success.main' }} />
                }
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton 
                    component={Link} 
                    to={item.path}
                    sx={{
                      borderRadius: '8px',
                      margin: '8px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        transform: 'translateX(4px)'
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(25, 118, 210, 0.12)',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.16)'
                        }
                      }
                    }}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ 
          flexGrow: 1, 
          p: 3,
          minHeight: '100vh',
          background: `
            linear-gradient(135deg, 
              rgba(30, 144, 255, 0.1) 25%, rgba(255, 255, 255, 0.9) 25%),
            linear-gradient(225deg, 
              rgba(0, 191, 255, 0.1) 25%, rgba(255, 255, 255, 0.9) 25%),
            linear-gradient(45deg, 
              rgba(173, 216, 230, 0.1) 50%, rgba(255, 255, 255, 0.95) 50%),
            linear-gradient(315deg, 
              rgba(135, 206, 250, 0.1) 50%, rgba(255, 255, 255, 0.95) 50%)
          `,
          backgroundSize: '400px 400px'
        }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/company-management" element={<CompanyManagement />} />
            <Route path="/admin/communication-methods" element={<CommunicationMethodManagement />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/reporting" element={<ReportingDashboard />} />
          </Routes>
        </Box>
      </Box>
      </Router>
        </ThemeProvider>
      )}
    </CustomThemeProvider>
  );
};

export default App;
