import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import { saveAs } from 'file-saver';

const ReportingDashboard = () => {
  const [activeSection, setActiveSection] = useState('communication');

  // Sample data for demonstration
  const communicationData = [
    { method: 'Email', count: 120, successRate: 0.75 },
    { method: 'LinkedIn', count: 80, successRate: 0.65 },
    { method: 'Phone', count: 50, successRate: 0.85 },
  ];

  const trendData = [
    { date: '2024-01-01', overdue: 5 },
    { date: '2024-01-02', overdue: 7 },
    { date: '2024-01-03', overdue: 3 },
  ];

  const activityLog = [
    { id: 1, date: '2024-01-01', user: 'John Doe', company: 'ENTNT', method: 'Email', status: 'Completed' },
    { id: 2, date: '2024-01-02', user: 'Jane Smith', company: 'GOOGLE', method: 'LinkedIn', status: 'Pending' },
  ];

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };


  const handleExport = (format) => {
    const data = JSON.stringify({
      communicationData,
      trendData,
      activityLog
    }, null, 2);
    
    const blob = new Blob([data], { type: format === 'csv' ? 'text/csv' : 'application/pdf' });
    saveAs(blob, `report.${format}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{
          color: 'primary.main',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
          mb: 4
        }}
      >
        Reporting & Analytics Dashboard
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item>
          <Button 
            variant={activeSection === 'communication' ? 'contained' : 'outlined'}
            onClick={() => handleSectionChange('communication')}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            Communication Frequency
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant={activeSection === 'engagement' ? 'contained' : 'outlined'}
            onClick={() => handleSectionChange('engagement')}
          >
            Engagement Effectiveness
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant={activeSection === 'trends' ? 'contained' : 'outlined'}
            onClick={() => handleSectionChange('trends')}
          >
            Overdue Trends
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant={activeSection === 'activity' ? 'contained' : 'outlined'}
            onClick={() => handleSectionChange('activity')}
          >
            Activity Log
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handleExport('pdf')} sx={{ mr: 2 }}>
            Export as PDF
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handleExport('csv')}>
            Export as CSV
          </Button>
        </Grid>
      </Grid>

      {activeSection === 'communication' && (
        <Paper 
          sx={{ 
            p: 2, 
            mb: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Communication Frequency
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: communicationData.map(d => d.method) }]}
            series={[{ 
              data: communicationData.map(d => d.count),
              color: '#1976d2'
            }]}
            colors={['#1976d2', '#4caf50', '#ff9800']}
            width={500}
            height={300}
          />
        </Paper>
      )}

      {activeSection === 'engagement' && (
        <Paper 
          sx={{ 
            p: 2, 
            mb: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Engagement Effectiveness
          </Typography>
          <PieChart
            series={[
              {
                data: communicationData.map((d, index) => ({
                  id: index,
                  value: d.successRate * 100,
                  label: d.method
                })),
                colors: ['#1976d2', '#4caf50', '#ff9800']
              }
            ]}
            width={400}
            height={200}
          />
        </Paper>
      )}

      {activeSection === 'trends' && (
        <Paper 
          sx={{ 
            p: 2, 
            mb: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Overdue Communication Trends
          </Typography>
          <LineChart
            xAxis={[{ data: trendData.map(d => d.date), scaleType: 'point' }]}
            series={[{ 
              data: trendData.map(d => d.overdue),
              color: '#ff9800'
            }]}
            width={500}
            height={300}
          />
        </Paper>
      )}

      {activeSection === 'activity' && (
        <Paper 
          sx={{ 
            p: 2,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Real-Time Activity Log
          </Typography>
          <DataGrid
            rows={activityLog}
            columns={[
              { field: 'date', headerName: 'Date', width: 150 },
              { field: 'user', headerName: 'User', width: 150 },
              { field: 'company', headerName: 'Company', width: 150 },
              { field: 'method', headerName: 'Method', width: 150 },
              { field: 'status', headerName: 'Status', width: 150 }
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
        </Paper>
      )}
    </Box>
  );
};

export default ReportingDashboard;
