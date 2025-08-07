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
  Container,
  Tooltip,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
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
  Timeline,
  CheckCircle,
  Settings,
  ExitToApp,
  BugReport,
  Memory,
  NetworkCheck,
  Assessment,
  Analytics,
  MonitorHeart,
  FlashOn,
  RocketLaunch,
  Menu,
  Search,
  Computer,
  CloudQueue,
  AccountCircle,
  Notifications,
  Security,
  Api,
  CloudUpload,
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

export default function NewDashboard() {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleStartTest = () => {
    setIsRunning(!isRunning);
  };

  // Sample data for charts
  const realtimeData = [
    { time: '10:00', users: 45, responseTime: 245, rps: 1200, errors: 2 },
    { time: '10:05', users: 52, responseTime: 267, rps: 1150, errors: 1 },
    { time: '10:10', users: 68, responseTime: 189, rps: 1300, errors: 0 },
    { time: '10:15', users: 85, responseTime: 312, rps: 1100, errors: 5 },
    { time: '10:20', users: 93, responseTime: 278, rps: 1250, errors: 2 },
    { time: '10:25', users: 100, responseTime: 234, rps: 1280, errors: 1 },
  ];

  const performanceMetrics = [
    {
      title: 'Active Users',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: People,
      color: '#3b82f6',
    },
    {
      title: 'Response Time',
      value: '234ms',
      change: '-8.2%',
      trend: 'down',
      icon: Speed,
      color: '#10b981',
    },
    {
      title: 'Requests/sec',
      value: '1,280',
      change: '+15.3%',
      trend: 'up',
      icon: FlashOn,
      color: '#8b5cf6',
    },
    {
      title: 'Error Rate',
      value: '0.1%',
      change: '-2.1%',
      trend: 'down',
      icon: BugReport,
      color: '#ef4444',
    },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'tests', label: 'Load Tests', icon: RocketLaunch },
    { id: 'analytics', label: 'Analytics', icon: Analytics },
    { id: 'monitoring', label: 'Monitoring', icon: MonitorHeart },
    { id: 'api', label: 'API Testing', icon: Api },
    { id: 'security', label: 'Security', icon: Security },
    { id: 'infrastructure', label: 'Infrastructure', icon: CloudUpload },
  ];

  const TopBar = () => (
    <AppBar
      position="fixed"
      sx={{
        width: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
        ml: sidebarOpen ? `${drawerWidth}px` : 0,
        background: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ py: 1, px: 3 }}>
        <IconButton
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{
            mr: 2,
            color: '#6b7280',
            '&:hover': { bgcolor: '#f3f4f6' },
          }}
        >
          <Menu />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#111827',
              fontWeight: 700,
              fontSize: '1.25rem',
            }}
          >
            🚀 Locust Performance Dashboard
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#6b7280',
              fontWeight: 500,
            }}
          >
            Real-time Load Testing & Performance Monitoring
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Chip
            label={isRunning ? 'Test Running' : 'Ready'}
            size="small"
            sx={{
              bgcolor: isRunning ? '#dcfce7' : '#f1f5f9',
              color: isRunning ? '#16a34a' : '#64748b',
              border: `1px solid ${isRunning ? '#bbf7d0' : '#e2e8f0'}`,
              fontWeight: 600,
            }}
            icon={isRunning ? <PlayArrow sx={{ fontSize: 16 }} /> : <CheckCircle sx={{ fontSize: 16 }} />}
          />

          <IconButton
            sx={{
              color: '#6b7280',
              '&:hover': { bgcolor: '#f3f4f6' },
            }}
          >
            <Search />
          </IconButton>

          <IconButton
            sx={{
              color: '#6b7280',
              '&:hover': { bgcolor: '#f3f4f6' },
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            sx={{
              color: '#6b7280',
              '&:hover': { bgcolor: '#f3f4f6' },
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
              color: '#ef4444',
              borderColor: '#fecaca',
              bgcolor: '#fef2f2',
              '&:hover': {
                borderColor: '#f87171',
                bgcolor: '#fee2e2',
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
          borderRight: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* User Profile */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mx: 'auto',
            mb: 2,
            bgcolor: '#3b82f6',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            color: '#111827',
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          {user?.full_name || 'User'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#6b7280',
            mb: 2,
          }}
        >
          Performance Engineer
        </Typography>
        <Chip
          label="Pro Plan"
          size="small"
          sx={{
            bgcolor: '#dbeafe',
            color: '#1d4ed8',
            fontWeight: 600,
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
                bgcolor: '#dbeafe',
                color: '#1d4ed8',
                '&:hover': {
                  bgcolor: '#bfdbfe',
                },
              },
              '&:hover': {
                bgcolor: '#f3f4f6',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedMenu === item.id ? '#1d4ed8' : '#6b7280',
                minWidth: 40,
              }}
            >
              <item.icon />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': {
                  color: selectedMenu === item.id ? '#1d4ed8' : '#374151',
                  fontWeight: selectedMenu === item.id ? 600 : 500,
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* System Status */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: '#6b7280',
            fontWeight: 600,
            mb: 2,
          }}
        >
          System Status
        </Typography>
        <Paper
          sx={{
            p: 2,
            bgcolor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: 2,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
              All Systems
            </Typography>
            <Chip
              label="Operational"
              size="small"
              sx={{
                bgcolor: '#dcfce7',
                color: '#16a34a',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={98}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#10b981',
                borderRadius: 3,
              },
            }}
          />
          <Typography variant="caption" sx={{ color: '#6b7280', mt: 1 }}>
            98% uptime
          </Typography>
        </Paper>
      </Box>
    </Drawer>
  );

  const StatCard = ({ stat, index }) => (
    <Zoom in={animate} timeout={300 + index * 100}>
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="between">
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                fontWeight: 600,
                mb: 1,
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
                color: '#111827',
                fontWeight: 800,
                mb: 1,
              }}
            >
              {stat.value}
            </Typography>
            <Chip
              label={stat.change}
              size="small"
              sx={{
                bgcolor: stat.trend === 'up' ? '#dcfce7' : '#fee2e2',
                color: stat.trend === 'up' ? '#16a34a' : '#dc2626',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
              icon={stat.trend === 'up' ? <TrendingUp sx={{ fontSize: 14 }} /> : <TrendingDown sx={{ fontSize: 14 }} />}
            />
          </Box>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: stat.color,
              ml: 2,
            }}
          >
            <stat.icon sx={{ fontSize: 28, color: 'white' }} />
          </Avatar>
        </Box>
      </Card>
    </Zoom>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9fafb' }}>
      <TopBar />
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '80px',
          ml: sidebarOpen ? `${drawerWidth}px` : 0,
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Welcome Section */}
        <Fade in timeout={500}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: '#111827',
                fontWeight: 800,
                mb: 1,
              }}
            >
              Welcome back, {user?.full_name?.split(' ')[0] || 'User'}! 👋
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#6b7280',
                fontWeight: 400,
                mb: 4,
              }}
            >
              Monitor your performance testing with real-time analytics
            </Typography>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={isRunning ? <Stop /> : <RocketLaunch />}
                onClick={handleStartTest}
                sx={{
                  bgcolor: isRunning ? '#ef4444' : '#3b82f6',
                  '&:hover': {
                    bgcolor: isRunning ? '#dc2626' : '#2563eb',
                  },
                  borderRadius: 2,
                  py: 1.5,
                  px: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                {isRunning ? 'Stop Test' : 'Start Load Test'}
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<Timeline />}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#9ca3af',
                    bgcolor: '#f9fafb',
                  },
                  borderRadius: 2,
                  py: 1.5,
                  px: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                View Analytics
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<Assessment />}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#9ca3af',
                    bgcolor: '#f9fafb',
                  },
                  borderRadius: 2,
                  py: 1.5,
                  px: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                Create Test
              </Button>
            </Stack>
          </Box>
        </Fade>

        {/* Metrics Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {performanceMetrics.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={stat.title}>
              <StatCard stat={stat} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3}>
          {/* Main Chart */}
          <Grid item xs={12} lg={8}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                height: 400,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#111827',
                    fontWeight: 700,
                  }}
                >
                  📊 Performance Metrics
                </Typography>
                <Tabs
                  value={currentTab}
                  onChange={(e, value) => setCurrentTab(value)}
                  sx={{
                    '& .MuiTab-root': {
                      color: '#6b7280',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&.Mui-selected': {
                        color: '#3b82f6',
                      },
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#3b82f6',
                    },
                  }}
                >
                  <Tab label="Response Time" />
                  <Tab label="Throughput" />
                  <Tab label="Users" />
                </Tabs>
              </Box>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={realtimeData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip
                    contentStyle={{
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#111827',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                    strokeWidth={2}
                    name="Active Users"
                  />
                  <Area
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorResponse)"
                    strokeWidth={2}
                    name="Response Time (ms)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          {/* Side Panel */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* Test Status */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#111827',
                    fontWeight: 700,
                    mb: 3,
                  }}
                >
                  🧪 Active Tests
                </Typography>

                <Stack spacing={2}>
                  {[
                    { name: 'Login Flow Test', status: 'running', progress: 75, users: 500 },
                    { name: 'API Stress Test', status: 'completed', progress: 100, users: 1000 },
                    { name: 'Payment Gateway', status: 'queued', progress: 0, users: 750 },
                  ].map((test, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        bgcolor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: 2,
                      }}
                    >
                      <Box display="flex" alignItems="center" justifyContent="between" mb={1}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: '#111827',
                            fontWeight: 600,
                            flexGrow: 1,
                          }}
                        >
                          {test.name}
                        </Typography>
                        <Chip
                          label={test.status}
                          size="small"
                          sx={{
                            bgcolor: test.status === 'running' ? '#dcfce7' : 
                                     test.status === 'completed' ? '#dbeafe' : '#fef3c7',
                            color: test.status === 'running' ? '#16a34a' : 
                                   test.status === 'completed' ? '#1d4ed8' : '#d97706',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ color: '#6b7280', mb: 1 }}>
                        {test.users} users
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={test.progress}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          bgcolor: '#e5e7eb',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: test.status === 'running' ? '#10b981' : 
                                     test.status === 'completed' ? '#3b82f6' : '#f59e0b',
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Paper>
                  ))}
                </Stack>
              </Card>

              {/* Quick Actions */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#111827',
                    fontWeight: 700,
                    mb: 3,
                  }}
                >
                  ⚡ Quick Actions
                </Typography>

                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<RocketLaunch />}
                    sx={{
                      borderColor: '#d1d5db',
                      color: '#374151',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        bgcolor: '#f9fafb',
                      },
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                    }}
                  >
                    Create New Test
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Analytics />}
                    sx={{
                      borderColor: '#d1d5db',
                      color: '#374151',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        bgcolor: '#f9fafb',
                      },
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                    }}
                  >
                    View Reports
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Settings />}
                    sx={{
                      borderColor: '#d1d5db',
                      color: '#374151',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        bgcolor: '#f9fafb',
                      },
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                    }}
                  >
                    Settings
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
