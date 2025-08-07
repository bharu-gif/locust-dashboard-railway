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
  Menu,
  Notifications,
  Search,
  BarChart as BarChartIcon,
  Assessment,
  Storage,
  Computer,
  CloudQueue,
  Security,
  AccountCircle,
  MoreVert,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
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

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock real-time data
  const [realtimeData, setRealtimeData] = useState([
    { time: '10:00', users: 45, responseTime: 245, rps: 1200, errors: 2 },
    { time: '10:05', users: 52, responseTime: 267, rps: 1150, errors: 1 },
    { time: '10:10', users: 68, responseTime: 189, rps: 1300, errors: 0 },
    { time: '10:15', users: 85, responseTime: 312, rps: 1100, errors: 5 },
    { time: '10:20', users: 93, responseTime: 278, rps: 1250, errors: 2 },
    { time: '10:25', users: 100, responseTime: 234, rps: 1280, errors: 1 },
  ]);

  const stats = [
    {
      title: 'Active Users',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: People,
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Avg Response Time',
      value: '234ms',
      change: '-8.2%',
      trend: 'down',
      icon: Speed,
      color: '#4ecdc4',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
    },
    {
      title: 'Requests/sec',
      value: '1,280',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: '#45b7d1',
      gradient: 'linear-gradient(135deg, #45b7d1 0%, #2196f3 100%)',
    },
    {
      title: 'Error Rate',
      value: '0.1%',
      change: '-2.1%',
      trend: 'down',
      icon: Warning,
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'tests', label: 'Load Tests', icon: Assessment },
    { id: 'reports', label: 'Reports', icon: BarChartIcon },
    { id: 'metrics', label: 'Real-time Metrics', icon: Timeline },
    { id: 'infrastructure', label: 'Infrastructure', icon: Computer },
    { id: 'monitoring', label: 'Monitoring', icon: CloudQueue },
    { id: 'security', label: 'Security', icon: Security },
    { id: 'storage', label: 'Data Storage', icon: Storage },
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
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          border: 'none',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            mx: 'auto',
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {user?.full_name || 'User'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#ccc',
            mb: 2,
          }}
        >
          Load Testing Dashboard
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#555', mx: 2 }} />

      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={selectedMenu === item.id}
            onClick={() => setSelectedMenu(item.id)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                },
              },
              '&:hover': {
                background: '#555',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedMenu === item.id ? 'white' : '#ccc',
                minWidth: 40,
              }}
            >
              <item.icon />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': {
                  color: selectedMenu === item.id ? 'white' : '#ddd',
                  fontWeight: selectedMenu === item.id ? 600 : 400,
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ borderColor: '#555', mb: 2 }} />
        <ListItemButton
          onClick={() => setSelectedMenu('settings')}
          sx={{
            borderRadius: 2,
            mb: 1,
            '&:hover': {
              background: '#555',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ccc', minWidth: 40 }}>
            <Settings />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            sx={{
              '& .MuiListItemText-primary': {
                color: '#ddd',
              },
            }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            '&:hover': {
              background: '#d32f2f',
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
        background: '#1976d2',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          edge="start"
          sx={{ mr: 2, color: 'white' }}
        >
          <Menu />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: 'white',
            fontWeight: 600,
          }}
        >
          Load Testing Dashboard
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton sx={{ color: 'white' }}>
            <Search />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <AccountCircle />
          </IconButton>
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
          border: '1px solid #e0e0e0',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
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
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                {stat.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: '#333',
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Chip
                label={stat.change}
                size="small"
                sx={{
                  background: stat.trend === 'up' ? '#e8f5e8' : '#ffebee',
                  color: stat.trend === 'up' ? '#4caf50' : '#f44336',
                  border: stat.trend === 'up' ? '1px solid #4caf50' : '1px solid #f44336',
                }}
                icon={stat.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
              />
            </Box>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                background: stat.gradient,
                boxShadow: `0 8px 32px ${stat.color}40`,
              }}
            >
              <stat.icon sx={{ fontSize: 30, color: 'white' }} />
            </Avatar>
          </Box>
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
          `,
        },
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
          mt: '64px',
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Header Section */}
        <Fade in timeout={500}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 1,
              }}
            >
              Welcome back, {user?.full_name?.split(' ')[0] || 'User'}! 👋
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 3,
              }}
            >
              Monitor your load testing performance and system metrics
            </Typography>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <ActionButton
                icon={isRunning ? Stop : PlayArrow}
                label={isRunning ? 'Stop Test' : 'Start Load Test'}
                primary
                onClick={() => setIsRunning(!isRunning)}
              />
              <ActionButton icon={Refresh} label="Refresh Data" />
              <ActionButton icon={Timeline} label="View Reports" />
              <ActionButton icon={Settings} label="Configure Tests" />
            </Stack>
          </Box>
        </Fade>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={stat.title}>
              <StatCard stat={stat} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3}>
          {/* Real-time Metrics Chart */}
          <Grid item xs={12} lg={8}>
            <Slide in={animate} direction="up" timeout={800}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  height: 400,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  Real-time Performance Metrics
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
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
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.7)" />
                    <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
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
                    />
                    <Area
                      type="monotone"
                      dataKey="responseTime"
                      stroke="#4ecdc4"
                      fillOpacity={1}
                      fill="url(#colorResponse)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </Slide>
          </Grid>

          {/* Status Overview */}
          <Grid item xs={12} lg={4}>
            <Slide in={animate} direction="up" timeout={1000}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  height: 400,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  Test Status Overview
                </Typography>

                <Stack spacing={3}>
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Test Progress
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                        75%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={75}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        System Health
                      </Typography>
                      <Chip
                        label="Excellent"
                        size="small"
                        sx={{
                          background: 'rgba(76, 175, 80, 0.2)',
                          color: '#4caf50',
                          border: '1px solid rgba(76, 175, 80, 0.3)',
                        }}
                        icon={<CheckCircle />}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      Recent Activity
                    </Typography>
                    <Stack spacing={2}>
                      {[
                        { time: '2 min ago', event: 'Load test started', status: 'success' },
                        { time: '5 min ago', event: 'System health check', status: 'success' },
                        { time: '10 min ago', event: 'Warning: High response time', status: 'warning' },
                        { time: '15 min ago', event: 'Test configuration updated', status: 'info' },
                      ].map((activity, index) => (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'white',
                                fontWeight: 500,
                                mb: 0.5,
                              }}
                            >
                              {activity.event}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                              }}
                            >
                              {activity.time}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background:
                                activity.status === 'success'
                                  ? '#4caf50'
                                  : activity.status === 'warning'
                                  ? '#ff9800'
                                  : '#2196f3',
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
