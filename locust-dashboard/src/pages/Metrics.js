// src/components/MetricsDashboard.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Grid, Paper, Typography, Tabs, Tab, Switch, AppBar
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Download, PictureAsPdf, InsertDriveFile } from '@mui/icons-material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { exportAsExcel, exportAsCSV, exportAsJSON } from '../utils/exportUtils.js';
import logo from '../assets/logo.png';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: 100,
}));

export default function Metrics() {
  const [themeMode, setThemeMode] = useState('light');
  const [metrics, setMetrics] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [status, setStatus] = useState('stopped');
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const fetchMetrics = async () => {
    const res = await axios.get('/api/metrics');
    setMetrics((prev) => [...prev, res.data]);
  };

  const startLoadTest = async () => {
    try {
      const res = await axios.post('/api/start');
      if (res.data.status === 'Locust started') {
        setStatus('running');
        const id = setInterval(() => {
          setTimer((t) => t + 1);
          fetchMetrics();
        }, 1000);
        setIntervalId(id);
      }
    } catch {
      alert('Failed to start load test');
    }
  };

  const stopLoadTest = async () => {
    const res = await axios.post('/api/stop');
    if (res.data.status === 'Locust stopped') {
      setStatus('stopped');
      clearInterval(intervalId);
    }
  };

  const clearMetrics = () => {
    setMetrics([]);
    setTimer(0);
  };

  const exportPDF = () => {
    const input = document.getElementById('report');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(logo, 'PNG', 10, 10, 50, 20);
      pdf.addImage(imgData, 'PNG', 10, 40, 190, 0);
      pdf.save('report.pdf');
    });
  };

  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
      <Box sx={{ p: 2 }}>
        <AppBar position="static">
          <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
            <Typography variant="h6">📊 Load Test Dashboard</Typography>
            <Switch checked={themeMode === 'dark'} onChange={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} />
          </Box>
        </AppBar>

        <Box my={2}>
          <Button variant="contained" onClick={startLoadTest} disabled={status === 'running'}>
            {status === 'running' ? 'Running...' : 'Start'}
          </Button>
          <Button variant="outlined" onClick={stopLoadTest} sx={{ mx: 1 }}>Stop</Button>
          <Button variant="text" onClick={clearMetrics}>Clear</Button>
        </Box>

        <Box id="report">
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <StyledPaper>Status: {status}</StyledPaper>
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledPaper>Uptime: {timer}s</StyledPaper>
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledPaper>Total Requests: {metrics.length}</StyledPaper>
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledPaper>Average RPS: {/* calculate */}</StyledPaper>
            </Grid>
          </Grid>

          <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)}>
            <Tab label="Response Time" />
            <Tab label="RPS" />
            <Tab label="Failures" />
          </Tabs>

          {tabIndex === 0 && (
            <LineChart width={600} height={300} data={metrics}>
              <Line type="monotone" dataKey="avg_response_time" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          )}
          {tabIndex === 1 && (
            <LineChart width={600} height={300} data={metrics}>
              <Line type="monotone" dataKey="rps" stroke="#82ca9d" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          )}
          {tabIndex === 2 && (
            <LineChart width={600} height={300} data={metrics}>
              <Line type="monotone" dataKey="failures" stroke="#ff0000" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          )}
        </Box>

        <Box mt={2}>
          <Button startIcon={<PictureAsPdf />} onClick={exportPDF}>Export PDF</Button>
          <Button startIcon={<Download />} onClick={() => exportAsCSV(metrics)}>Export CSV</Button>
          <Button startIcon={<InsertDriveFile />} onClick={() => exportAsJSON(metrics)}>Export JSON</Button>
          <Button onClick={() => exportAsExcel(metrics)}>Export Excel</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
