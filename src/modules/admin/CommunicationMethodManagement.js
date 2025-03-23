import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Grid, Paper, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragHandleIcon from '@mui/icons-material/DragHandle';

const defaultMethods = [
  { name: 'LinkedIn Post', description: 'Post on company LinkedIn page', sequence: 1, mandatory: true },
  { name: 'LinkedIn Message', description: 'Send message on LinkedIn', sequence: 2, mandatory: true },
  { name: 'Email', description: 'Send email to company', sequence: 3, mandatory: true },
  { name: 'Phone Call', description: 'Call company representative', sequence: 4, mandatory: true },
  { name: 'Other', description: 'Other communication method', sequence: 5, mandatory: false }
];

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState(defaultMethods);
  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: methods.length + 1,
    mandatory: false
  });

  const handleAddMethod = () => {
    setMethods([...methods, newMethod]);
    setNewMethod({
      name: '',
      description: '',
      sequence: methods.length + 2,
      mandatory: false
    });
  };

  const handleDeleteMethod = (index) => {
    const updatedMethods = methods.filter((_, i) => i !== index);
    setMethods(updatedMethods);
  };

  return (
    <Box sx={{ 
      p: 3,
      height: 'calc(100vh - 64px)', // Subtract header height
      display: 'flex',
      gap: 3
    }}>
      <Box sx={{ 
        width: '40%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography variant="h4" gutterBottom>
          Communication Method Management
        </Typography>
        
        <Paper sx={{ 
          p: 3,
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Typography variant="h6" gutterBottom>
          Add New Communication Method
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Method Name"
              value={newMethod.name}
              onChange={(e) => setNewMethod({...newMethod, name: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Description"
              value={newMethod.description}
              onChange={(e) => setNewMethod({...newMethod, description: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Sequence"
              type="number"
              value={newMethod.sequence}
              onChange={(e) => setNewMethod({...newMethod, sequence: parseInt(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newMethod.mandatory}
                  onChange={(e) => setNewMethod({...newMethod, mandatory: e.target.checked})}
                />
              }
              label="Mandatory"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddMethod}
            >
              Add Method
            </Button>
          </Grid>
        </Grid>
        </Paper>
      </Box>

      <Box sx={{ 
        width: '60%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography variant="h4" gutterBottom>
          Communication Methods
        </Typography>
        <Box sx={{ 
          flex: 1,
          overflowY: 'auto',
          pr: 2
        }}>
          {methods.sort((a, b) => a.sequence - b.sequence).map((method, index) => (
            <Paper key={index} sx={{ p: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DragHandleIcon />
                  <Typography variant="h6">{method.name}</Typography>
                </Box>
                <Box>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteMethod(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body1"><strong>Description:</strong> {method.description}</Typography>
              <Typography variant="body1"><strong>Sequence:</strong> {method.sequence}</Typography>
              <Typography variant="body1"><strong>Mandatory:</strong> {method.mandatory ? 'Yes' : 'No'}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CommunicationMethodManagement;
