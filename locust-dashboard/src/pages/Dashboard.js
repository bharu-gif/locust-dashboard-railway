import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  Fade,
  Zoom,
  Slide,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Badge,
  Paper,
  LinearProgress,
  Stack,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
  Tooltip,
  Skeleton,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp,
  TrendingDown,
  Speed,
  People,
  Timer,
  PlayArrow,
  Stop,
  Refresh,
  Timeline,
  Warning,
  CheckCircle,
  Settings,
  ExitToApp,
  BugReport,
  Memory,
  Storage,
  NetworkCheck,
  CloudUpload,
  Assessment,
  ShowChart,
  Notifications,
  Security,
  Api,
  Code,
  Psychology,
  Analytics,
  MonitorHeart,
  FlashOn,
  RocketLaunch,
  Menu,
  Search,
  BarChart as BarChartIcon,
  Computer,
  CloudQueue,
  AccountCircle,
  MoreVert,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 280;

export default function Dashboard() {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setAnimate(true);
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/login');
    setLogoutDialogOpen(false);
  };

  const cancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const handleStartTest = () => {
    setIsRunning(!isRunning);
    setSnackbarMessage(isRunning ? 'Load test stopped' : 'Load test started');
    setSnackbarOpen(true);
  };

  // Enhanced real-time data with more comprehensive metrics
  const [realtimeData, setRealtimeData] = useState([
    { time: '10:00', users: 45, responseTime: 245, rps: 1200, errors: 2, cpuUsage: 45, memoryUsage: 62 },
    { time: '10:05', users: 52, responseTime: 267, rps: 1150, errors: 1, cpuUsage: 52, memoryUsage: 65 },
    { time: '10:10', users: 68, responseTime: 189, rps: 1300, errors: 0, cpuUsage: 38, memoryUsage: 58 },
    { time: '10:15', users: 85, responseTime: 312, rps: 1100, errors: 5, cpuUsage: 72, memoryUsage: 78 },
    { time: '10:20', users: 93, responseTime: 278, rps: 1250, errors: 2, cpuUsage: 68, memoryUsage: 71 },
    { time: '10:25', users: 100, responseTime: 234, rps: 1280, errors: 1, cpuUsage: 55, memoryUsage: 69 },
  ]);

  const performanceMetrics = [
    {
      title: 'Active Virtual Users',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: People,
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Concurrent simulated users',
    },
    {
      title: 'Avg Response Time',
      value: '234ms',
      change: '-8.2%',
      trend: 'down',
      icon: Speed,
      color: '#4ecdc4',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
      description: 'Server response latency',
    },
    {
      title: 'Requests/sec',
      value: '1,280',
      change: '+15.3%',
      trend: 'up',
      icon: FlashOn,
      color: '#45b7d1',
      gradient: 'linear-gradient(135deg, #45b7d1 0%, #2196f3 100%)',
      description: 'Request throughput',
    },
    {
      title: 'Error Rate',
      value: '0.1%',
      change: '-2.1%',
      trend: 'down',
      icon: BugReport,
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
      description: 'Failed requests percentage',
    },
    {
      title: 'CPU Usage',
      value: '65%',
      change: '+3.2%',
      trend: 'up',
      icon: Memory,
      color: '#f39c12',
      gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
      description: 'Server CPU utilization',
    },
    {
      title: 'Network I/O',
      value: '124 MB/s',
      change: '+18.7%',
      trend: 'up',
      icon: NetworkCheck,
      color: '#9b59b6',
      gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
      description: 'Network bandwidth usage',
    },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: DashboardIcon, badge: null },
    { id: 'tests', label: 'Load Tests', icon: RocketLaunch, badge: '3' },
    { id: 'reports', label: 'Analytics', icon: Analytics, badge: null },
    { id: 'metrics', label: 'Real-time', icon: MonitorHeart, badge: '!' },
    { id: 'performance', label: 'Performance', icon: Assessment, badge: null },
    { id: 'api', label: 'API Testing', icon: Api, badge: '2' },
    { id: 'security', label: 'Security', icon: Security, badge: null },
    { id: 'infrastructure', label: 'Infrastructure', icon: CloudUpload, badge: null },
  ];

  const testSuites = [
    {
      name: 'User Authentication Flow',
      status: 'running',
      duration: '00:15:32',
      users: 500,
      progress: 65,
      icon: Security,
      color: '#4caf50'
    },
    {
      name: 'Payment Gateway Stress Test',
      status: 'completed',
      duration: '01:23:45',
      users: 1000,
      progress: 100,
      icon: Assessment,
      color: '#2196f3'
    },
    {
      name: 'API Endpoint Load Test',
      status: 'queued',
      duration: '00:00:00',
      users: 750,
      progress: 0,
      icon: Api,
      color: '#ff9800'
    },
  ];

  const Sidebar = () => (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'white',
          border: 'none',
          borderRight: '1px solid #e2e8f0',
          boxShadow: '4px 0 12px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      {/* User Profile Section */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <Avatar
          sx={{
            width: 70,
            height: 70,
            mx: 'auto',
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
          }}
        >
          {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            color: '#1e293b',
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          {user?.full_name || 'User'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            mb: 1,
          }}
        >
          Performance Engineer
        </Typography>
        <Chip
          label="Pro Plan"
          size="small"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        />
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={selectedMenu === item.id}
            onClick={() => setSelectedMenu(item.id)}
            sx={{
              borderRadius: 2,
              mb: 1,
              py: 1.5,
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                },
              },
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedMenu === item.id ? 'white' : '#8892b0',
                minWidth: 45,
              }}
            >
              <item.icon />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': {
                  color: selectedMenu === item.id ? 'white' : '#ccd6f6',
                  fontWeight: selectedMenu === item.id ? 600 : 500,
                  fontSize: '0.95rem',
                },
              }}
            />
            {item.badge && (
              <Badge 
                badgeContent={item.badge} 
                color={item.badge === '!' ? 'error' : 'primary'}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    minWidth: '18px',
                    height: '18px',
                  }
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>

      {/* Test Status Section */}
      <Box sx={{ mx: 2, mb: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: '#8892b0',
            fontWeight: 600,
            mb: 2,
            px: 2,
          }}
        >
          Active Tests
        </Typography>
        <Stack spacing={1}>
          {testSuites.slice(0, 2).map((test, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <test.icon sx={{ color: test.color, fontSize: 18, mr: 1 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    flexGrow: 1,
                  }}
                >
                  {test.name.substring(0, 20)}...
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Chip
                  label={test.status}
                  size="small"
                  sx={{
                    background: test.status === 'running' ? 'rgba(76, 175, 80, 0.2)' : 
                               test.status === 'completed' ? 'rgba(33, 150, 243, 0.2)' : 
                               'rgba(255, 152, 0, 0.2)',
                    color: test.status === 'running' ? '#4caf50' : 
                           test.status === 'completed' ? '#2196f3' : '#ff9800',
                    fontSize: '0.7rem',
                  }}
                />
                <Typography variant="caption" sx={{ color: '#8892b0' }}>
                  {test.users} users
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={test.progress}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: test.color,
                    borderRadius: 2,
                  },
                }}
              />
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Bottom Actions */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />
        <ListItemButton
          onClick={() => setSelectedMenu('settings')}
          sx={{
            borderRadius: 2,
            mb: 1,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#8892b0', minWidth: 40 }}>
            <Settings />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            sx={{
              '& .MuiListItemText-primary': {
                color: '#ccd6f6',
                fontSize: '0.95rem',
              },
            }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            '&:hover': {
              background: 'rgba(244, 67, 54, 0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ff5252', minWidth: 40 }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{
              '& .MuiListItemText-primary': {
                color: '#ff5252',
                fontSize: '0.95rem',
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );

  const TopBar = () => (
    <AppBar
      position="fixed"
      sx={{
        width: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
        ml: sidebarOpen ? `${drawerWidth}px` : 0,
        background: 'white',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid #e2e8f0',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          edge="start"
          sx={{ 
            mr: 2, 
            color: '#64748b',
            background: '#f1f5f9',
            '&:hover': {
              background: '#e2e8f0',
            }
          }}
        >
          <Menu />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: '#1e293b',
              fontWeight: 700,
            }}
          >
            🚀 Locust Performance Dashboard
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            Real-time Load Testing & Performance Monitoring
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          {/* Status Indicator */}
          <Chip
            label={isRunning ? 'Test Running' : 'Ready'}
            size="small"
            sx={{
              background: isRunning ? '#dcfce7' : '#f1f5f9',
              color: isRunning ? '#16a34a' : '#64748b',
              border: `1px solid ${isRunning ? '#bbf7d0' : '#e2e8f0'}`,
              fontWeight: 600,
            }}
            icon={isRunning ? <PlayArrow /> : <CheckCircle />}
          />
          
          <IconButton 
            sx={{ 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <Search />
          </IconButton>
          
          <IconButton 
            sx={{ 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          <IconButton 
            sx={{ 
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <AccountCircle />
          </IconButton>
          
          <Button
            onClick={handleLogout}
            variant="outlined"
            size="small"
            startIcon={<ExitToApp />}
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                borderColor: 'rgba(244, 67, 54, 0.5)',
                background: 'rgba(244, 67, 54, 0.1)',
                color: '#ff5252',
              },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );

  const StatCard = ({ stat, index }) => (
    <Zoom in={animate} timeout={300 + index * 100}>
      <Card
        sx={{
          height: '100%',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: stat.gradient,
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
            borderColor: '#cbd5e1',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  mb: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem',
                }}
              >
                {stat.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: '#1e293b',
                  fontWeight: 800,
                  mb: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip
                  label={stat.change}
                  size="small"
                  sx={{
                    background: stat.trend === 'up' 
                      ? '#dcfce7' 
                      : '#fee2e2',
                    color: stat.trend === 'up' ? '#4caf50' : '#f44336',
                    border: `1px solid ${stat.trend === 'up' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
                    fontWeight: 700,
                    fontSize: '0.7rem',
                  }}
                  icon={stat.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                />
              </Box>
            </Box>
            <Avatar
              sx={{
                width: 70,
                height: 70,
                background: stat.gradient,
                boxShadow: `0 12px 40px ${stat.color}40`,
                animation: isLoading ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              <stat.icon sx={{ fontSize: 32, color: 'white' }} />
            </Avatar>
          </Box>
          
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontStyle: 'italic',
            }}
          >
            {stat.description}
          </Typography>
        </CardContent>
      </Card>
    </Zoom>
  );

  const ActionButton = ({ icon: Icon, label, primary = false, onClick }) => (
    <Button
      variant={primary ? 'contained' : 'outlined'}
      startIcon={<Icon />}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        py: 1.5,
        px: 3,
        background: primary
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        fontWeight: 600,
        textTransform: 'none',
        '&:hover': {
          background: primary
            ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
            : 'rgba(255, 255, 255, 0.15)',
          transform: 'translateY(-2px)',
          boxShadow: primary
            ? '0 12px 40px rgba(102, 126, 234, 0.4)'
            : '0 8px 32px rgba(255, 255, 255, 0.1)',
        },
        transition: 'all 0.3s ease',
      }}
    >
      {label}
    </Button>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f8fafc',
        position: 'relative',
      }}
    >
      <TopBar />
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: sidebarOpen ? `${drawerWidth}px` : 0,
          mt: '80px',
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Header Section */}
        <Fade in timeout={500}>
          <Container maxWidth="xl" sx={{ mb: 4 }}>
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome back, {user?.full_name?.split(' ')[0] || 'User'}! 🚀
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                Monitor your performance testing in real-time with advanced analytics
              </Typography>

              {/* Action Buttons */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={isRunning ? <Stop /> : <RocketLaunch />}
                  onClick={handleStartTest}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 4,
                    background: isRunning 
                      ? 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)'
                      : 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                    boxShadow: isRunning 
                      ? '0 8px 32px rgba(244, 67, 54, 0.4)'
                      : '0 8px 32px rgba(76, 175, 80, 0.4)',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: isRunning 
                        ? '0 12px 40px rgba(244, 67, 54, 0.5)'
                        : '0 12px 40px rgba(76, 175, 80, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isRunning ? 'Stop Load Test' : 'Start Load Test'}
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Timeline />}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 4,
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Analytics
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Assessment />}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 4,
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Create Test
                </Button>
              </Stack>
            </Box>
          </Container>
        </Fade>

        {/* Loading State */}
        {isLoading ? (
          <Container maxWidth="xl">
            <Grid container spacing={3} mb={4}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} lg={2} key={item}>
                  <Card sx={{ 
                    p: 3, 
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
                    <Skeleton variant="text" width="60%" height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Skeleton variant="text" width="40%" height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Skeleton variant="rectangular" width="100%" height={20} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          <>
        {/* Stats Grid */}
        <Container maxWidth="xl" sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            {performanceMetrics.map((stat, index) => (
              <Grid item xs={12} sm={6} lg={2} key={stat.title}>
                <StatCard stat={stat} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>            {/* Charts and Analytics Section */}
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                {/* Real-time Performance Chart */}
                <Grid item xs={12} lg={8}>
                  <Slide in={animate} direction="up" timeout={800}>
                    <Paper
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        height: 450,
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: '#1e293b',
                            fontWeight: 700,
                          }}
                        >
                          📊 Real-time Performance Metrics
                        </Typography>
                        <Tabs
                          value={currentTab}
                          onChange={(e, value) => setCurrentTab(value)}
                          sx={{
                            '& .MuiTab-root': {
                              color: '#64748b',
                              '&.Mui-selected': {
                                color: 'white',
                              },
                            },
                            '& .MuiTabs-indicator': {
                              backgroundColor: 'white',
                            },
                          }}
                        >
                          <Tab label="Response Time" />
                          <Tab label="Throughput" />
                          <Tab label="Errors" />
                        </Tabs>
                      </Box>
                      <ResponsiveContainer width="100%" height={320}>
                        <AreaChart data={realtimeData}>
                          <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#667eea" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4ecdc4" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#4ecdc4" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorCPU" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="time" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <RechartsTooltip
                            contentStyle={{
                              background: 'white',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              color: '#1e293b',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#667eea"
                            fillOpacity={1}
                            fill="url(#colorUsers)"
                            strokeWidth={3}
                            name="Active Users"
                          />
                          <Area
                            type="monotone"
                            dataKey="responseTime"
                            stroke="#4ecdc4"
                            fillOpacity={1}
                            fill="url(#colorResponse)"
                            strokeWidth={3}
                            name="Response Time (ms)"
                          />
                          <Area
                            type="monotone"
                            dataKey="cpuUsage"
                            stroke="#ff6b6b"
                            fillOpacity={1}
                            fill="url(#colorCPU)"
                            strokeWidth={3}
                            name="CPU Usage (%)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Paper>
                  </Slide>
                </Grid>

                {/* System Status & Test Suites */}
                <Grid item xs={12} lg={4}>
                  <Stack spacing={3}>
                    {/* System Health */}
                    <Slide in={animate} direction="up" timeout={1000}>
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            mb: 3,
                          }}
                        >
                          🏥 System Health
                        </Typography>

                        <Box mb={3}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                              Overall Performance
                            </Typography>
                            <Chip
                              label="Excellent"
                              size="small"
                              sx={{
                                background: 'rgba(76, 175, 80, 0.2)',
                                color: '#4caf50',
                                border: '1px solid rgba(76, 175, 80, 0.3)',
                                fontWeight: 600,
                              }}
                              icon={<CheckCircle />}
                            />
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={92}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              background: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                                borderRadius: 4,
                              },
                            }}
                          />
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 1 }}>
                            92% - All systems operational
                          </Typography>
                        </Box>

                        <Stack spacing={2}>
                          {[
                            { label: 'API Response', value: 98, color: '#4caf50' },
                            { label: 'Database', value: 89, color: '#ff9800' },
                            { label: 'Cache Layer', value: 95, color: '#4caf50' },
                            { label: 'Load Balancer', value: 97, color: '#4caf50' },
                          ].map((metric) => (
                            <Box key={metric.label}>
                              <Box display="flex" justifyContent="space-between" mb={0.5}>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                  {metric.label}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                                  {metric.value}%
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={metric.value}
                                sx={{
                                  height: 4,
                                  borderRadius: 2,
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  '& .MuiLinearProgress-bar': {
                                    background: metric.color,
                                    borderRadius: 2,
                                  },
                                }}
                              />
                            </Box>
                          ))}
                        </Stack>
                      </Paper>
                    </Slide>

                    {/* Active Test Suites */}
                    <Slide in={animate} direction="up" timeout={1200}>
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            mb: 3,
                          }}
                        >
                          🧪 Active Test Suites
                        </Typography>

                        <Stack spacing={2}>
                          {testSuites.map((test, index) => (
                            <Paper
                              key={index}
                              sx={{
                                p: 2.5,
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                              <Box display="flex" alignItems="center" mb={2}>
                                <test.icon sx={{ color: test.color, fontSize: 20, mr: 1.5 }} />
                                <Box flexGrow={1}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      color: 'white',
                                      fontWeight: 600,
                                      mb: 0.5,
                                    }}
                                  >
                                    {test.name}
                                  </Typography>
                                  <Box display="flex" alignItems="center" gap={1}>
                                    <Chip
                                      label={test.status}
                                      size="small"
                                      sx={{
                                        background: test.status === 'running' ? 'rgba(76, 175, 80, 0.2)' : 
                                                   test.status === 'completed' ? 'rgba(33, 150, 243, 0.2)' : 
                                                   'rgba(255, 152, 0, 0.2)',
                                        color: test.status === 'running' ? '#4caf50' : 
                                               test.status === 'completed' ? '#2196f3' : '#ff9800',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                      }}
                                    />
                                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                      {test.users} users • {test.duration}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              
                              <LinearProgress
                                variant="determinate"
                                value={test.progress}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  '& .MuiLinearProgress-bar': {
                                    background: test.color,
                                    borderRadius: 3,
                                  },
                                }}
                              />
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 1 }}>
                                {test.progress}% complete
                              </Typography>
                            </Paper>
                          ))}
                        </Stack>
                      </Paper>
                    </Slide>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={cancelLogout}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 700 }}>
          🚪 Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Are you sure you want to logout? You will need to sign in again to access the dashboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={cancelLogout} 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              '&:hover': { color: 'white' }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmLogout} 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
              }
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={isRunning ? "error" : "success"}
          sx={{ 
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: isRunning ? '#f44336' : '#4caf50'
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
