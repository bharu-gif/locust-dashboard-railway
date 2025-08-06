import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Download,
  PictureAsPdf,
  TableChart,
  Assessment,
  Visibility,
  DateRange,
} from '@mui/icons-material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const [open, setOpen] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    type: 'performance',
    format: 'pdf',
    dateRange: '7d',
  });

  // Mock data for charts
  const performanceData = [
    { time: '00:00', responseTime: 245, throughput: 1200, errors: 2 },
    { time: '00:05', responseTime: 267, throughput: 1150, errors: 1 },
    { time: '00:10', responseTime: 189, throughput: 1300, errors: 0 },
    { time: '00:15', responseTime: 312, throughput: 1100, errors: 5 },
    { time: '00:20', responseTime: 278, throughput: 1250, errors: 2 },
    { time: '00:25', responseTime: 234, throughput: 1280, errors: 1 },
  ];

  // Mock data for reports
  const reports = [
    {
      id: 1,
      name: 'Weekly Performance Report',
      type: 'Performance',
      date: '2024-01-15',
      format: 'PDF',
      size: '2.3 MB',
      status: 'Ready',
    },
    {
      id: 2,
      name: 'API Load Test Summary',
      type: 'Summary',
      date: '2024-01-14',
      format: 'Excel',
      size: '1.8 MB',
      status: 'Ready',
    },
    {
      id: 3,
      name: 'Stress Test Analysis',
      type: 'Analysis',
      date: '2024-01-13',
      format: 'PDF',
      size: '3.1 MB',
      status: 'Generating',
    },
  ];

  const handleGenerateReport = () => {
    console.log('Generating report with config:', reportConfig);
    setOpen(false);
    // Add report generation logic here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready':
        return 'success';
      case 'Generating':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Reports & Analytics</Typography>
        <Button
          variant="contained"
          startIcon={<Assessment />}
          onClick={() => setOpen(true)}
        >
          Generate Report
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Overview (Last 30 minutes)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#8884d8"
                    name="Response Time (ms)"
                  />
                  <Line
                    type="monotone"
                    dataKey="throughput"
                    stroke="#82ca9d"
                    name="Throughput (req/s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PictureAsPdf sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6">PDF Reports</Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed analysis reports
              </Typography>
              <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                Generate PDF
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TableChart sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h6">Excel Reports</Typography>
              <Typography variant="body2" color="text.secondary">
                Raw data exports
              </Typography>
              <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                Export Excel
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assessment sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h6">Analytics</Typography>
              <Typography variant="body2" color="text.secondary">
                Performance insights
              </Typography>
              <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <DateRange sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h6">Scheduled</Typography>
              <Typography variant="body2" color="text.secondary">
                Automated reports
              </Typography>
              <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Generated Reports
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Format</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.format}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell>
                      <Chip
                        label={report.status}
                        color={getStatusColor(report.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" disabled={report.status !== 'Ready'}>
                        <Download />
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
        <DialogTitle>Generate New Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Report Type"
                value={reportConfig.type}
                onChange={(e) => setReportConfig({ ...reportConfig, type: e.target.value })}
              >
                <MenuItem value="performance">Performance Report</MenuItem>
                <MenuItem value="summary">Test Summary</MenuItem>
                <MenuItem value="analysis">Detailed Analysis</MenuItem>
                <MenuItem value="comparison">Comparison Report</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Format"
                value={reportConfig.format}
                onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value })}
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Date Range"
                value={reportConfig.dateRange}
                onChange={(e) => setReportConfig({ ...reportConfig, dateRange: e.target.value })}
              >
                <MenuItem value="1d">Last 24 hours</MenuItem>
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleGenerateReport} variant="contained">
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
