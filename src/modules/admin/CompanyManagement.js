import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Grid, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedIn: '',
    emails: [''],
    phones: [''],
    comments: '',
    periodicity: ''
  });

  const handleAddCompany = () => {
    setCompanies([...companies, newCompany]);
    setNewCompany({
      name: '',
      location: '',
      linkedIn: '',
      emails: [''],
      phones: [''],
      comments: '',
      periodicity: ''
    });
  };

  const handleDeleteCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  return (
    <Box sx={{
      p: 3,
      display: 'flex',
      gap: 3,
      height: 'calc(100vh - 64px)', // Subtract header height
      background: 'linear-gradient(145deg, #f5f5f5 0%, #ffffff 100%)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <Box sx={{ 
        width: '40%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add New Company
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={newCompany.name}
                onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                      borderRadius: '8px'
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                    }
                  },
                  transition: 'all 0.3s ease'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={newCompany.location}
                onChange={(e) => setNewCompany({...newCompany, location: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                value={newCompany.linkedIn}
                onChange={(e) => setNewCompany({...newCompany, linkedIn: e.target.value})}
              />
            </Grid>
            {newCompany.emails.map((email, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TextField
                  fullWidth
                  label={`Email ${index + 1}`}
                  value={email}
                  onChange={(e) => {
                    const newEmails = [...newCompany.emails];
                    newEmails[index] = e.target.value;
                    setNewCompany({...newCompany, emails: newEmails});
                  }}
                />
              </Grid>
            ))}
            {newCompany.phones.map((phone, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TextField
                  fullWidth
                  label={`Phone ${index + 1}`}
                  value={phone}
                  onChange={(e) => {
                    const newPhones = [...newCompany.phones];
                    newPhones[index] = e.target.value;
                    setNewCompany({...newCompany, phones: newPhones});
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comments"
                multiline
                rows={3}
                value={newCompany.comments}
                onChange={(e) => setNewCompany({...newCompany, comments: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Communication Periodicity"
                value={newCompany.periodicity}
                onChange={(e) => setNewCompany({...newCompany, periodicity: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddCompany}
                sx={{
                  backgroundColor: '#1976d2',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 4,
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                    transform: 'scale(1.02)'
                  },
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(25, 118, 210, 0.2)'
                }}
              >
                Add Company
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box sx={{ 
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        <Typography variant="h4" gutterBottom>
          Company Management
        </Typography>

      {companies.map((company, index) => (
        <Paper 
          key={index} 
          sx={{ 
            p: 3, 
            mb: 2,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#1976d2'
              }}
            >
              {company.name}
            </Typography>
            <Box>
              <IconButton
                sx={{
                  color: '#1976d2',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)'
                  }
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleDeleteCompany(index)}
                sx={{
                  color: '#d32f2f',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.1)'
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Location:</Box>
              {company.location}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>LinkedIn:</Box>
              {company.linkedIn}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Emails:</Box>
              {company.emails.join(', ')}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Phones:</Box>
              {company.phones.join(', ')}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Comments:</Box>
              {company.comments}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>Periodicity:</Box>
              {company.periodicity}
            </Typography>
          </Box>
        </Paper>
      ))}
      </Box>
    </Box>
  );
};

export default CompanyManagement;
