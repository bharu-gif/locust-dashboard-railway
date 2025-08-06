import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import {
  PlayArrow,
  Stop,
  Add,
  Edit,
  Delete,
  Visibility,
} from '@mui/icons-material';
import axios from 'axios';

export default function LoadTests() {
  const [open, setOpen] = useState(false);
  const [testConfig, setTestConfig] = useState({
    users: 10,
    rate: 2,
    time: '10m',
    host: 'https://your-api-url.com',
  });
  const [loading, setLoading] = useState(false);

  const handleStartTest = async () => {
    setLoading(true);
    try {
      await axios.post('/api/start-locust', testConfig);
      setOpen(false);
      // Refresh the test list or show success message
    } catch (error) {
      console.error('Failed to start test:', error);
    }
    setLoading(false);
  };

  const handleStopTest = async () => {
    try {
      await axios.post('/api/stop-locust');
      // Refresh the test list or show success message
    } catch (error) {
      console.error('Failed to stop test:', error);
    }
  };

  // Mock data for test history
  const testHistory = [
    {
      id: 1,
      name: 'API Performance Test',
      status: 'Running',
      users: 100,
      duration: '15m',
      startTime: '2024-01-15 10:30:00',
    },
    {
      id: 2,
      name: 'Login Stress Test',
      status: 'Completed',
      users: 50,
      duration: '5m',
      startTime: '2024-01-15 09:15:00',
    },
    {
      id: 3,
      name: 'Database Load Test',
      status: 'Failed',
      users: 200,
      duration: '20m',
      startTime: '2024-01-14 16:45:00',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running':
        return 'success';
      case 'Completed':
        return 'primary';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Load Tests</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Create New Test
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Start
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Start a basic load test with default settings
              </Typography>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                fullWidth
                onClick={() => setOpen(true)}
              >
                Quick Test
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Status
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Monitor active tests and system status
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Stop />}
                fullWidth
                color="error"
                onClick={handleStopTest}
              >
                Stop All Tests
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Test Templates
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Use predefined test configurations
              </Typography>
              <Button variant="outlined" fullWidth>
                Browse Templates
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Test History
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Test Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Users</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testHistory.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell>{test.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={test.status}
                        color={getStatusColor(test.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{test.users}</TableCell>
                    <TableCell>{test.duration}</TableCell>
                    <TableCell>{test.startTime}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                      <IconButton size="small">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Load Test</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Users"
                type="number"
                value={testConfig.users}
                onChange={(e) => setTestConfig({ ...testConfig, users: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Spawn Rate"
                type="number"
                value={testConfig.rate}
                onChange={(e) => setTestConfig({ ...testConfig, rate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Test Duration"
                value={testConfig.time}
                onChange={(e) => setTestConfig({ ...testConfig, time: e.target.value })}
                helperText="e.g., 10m, 1h, 30s"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Target Host"
                value={testConfig.host}
                onChange={(e) => setTestConfig({ ...testConfig, host: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleStartTest}
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Starting...' : 'Start Test'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
