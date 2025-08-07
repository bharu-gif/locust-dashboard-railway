import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Fade,
  Slide,
  Zoom,
  Stack,
  Divider,
  Avatar,
  LinearProgress,
  CircularProgress,
  Card,
  Grid,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  RocketLaunch,
  Google,
  GitHub,
  Speed,
  TrendingUp,
  Assessment,
  Security,
  Memory,
  NetworkCheck,
  BugReport,
  Timer,
  MonitorHeart,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';

export default function AdvancedLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAnimate(true);
    // Check for success message from signup redirect
    if (location.state?.message) {
      // Clear the location state to prevent showing message on refresh
      window.history.replaceState({}, document.title);
    }
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        const errorMsg = typeof result.error === 'string' ? result.error : 'Invalid credentials. Please try again.';
        setError(errorMsg);
      }
    } catch (err) {
      console.error('Login catch error:', err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const performanceIcons = [
    { icon: Speed, label: 'Performance', color: '#4caf50' },
    { icon: TrendingUp, label: 'Analytics', color: '#2196f3' },
    { icon: Assessment, label: 'Load Testing', color: '#ff9800' },
    { icon: Security, label: 'Security', color: '#9c27b0' },
    { icon: Memory, label: 'Memory', color: '#f44336' },
    { icon: NetworkCheck, label: 'Network', color: '#00bcd4' },
    { icon: BugReport, label: 'Debugging', color: '#795548' },
    { icon: Timer, label: 'Timing', color: '#607d8b' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Branding & Features */}
          <Grid item xs={12} md={6}>
            <Fade in={animate} timeout={800}>
              <Box sx={{ p: 4, background: 'white', borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      mr: 2,
                    }}
                  >
                    🚀
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#1e293b',
                        fontWeight: 800,
                      }}
                    >
                      LoadZen
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#64748b',
                        fontWeight: 600,
                      }}
                    >
                      Performance Testing Platform
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    color: '#1e293b',
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  🎯 Advanced Load Testing Suite
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#64748b',
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  Unleash the power of distributed load testing with real-time analytics, 
                  comprehensive monitoring, and intelligent performance insights.
                </Typography>

                {/* Performance Features Grid */}
                <Grid container spacing={2} mb={4}>
                  {performanceIcons.map((item, index) => (
                    <Grid item xs={6} sm={3} key={item.label}>
                      <Zoom in={animate} timeout={1000 + index * 100}>
                        <Card
                          sx={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: 2,
                            textAlign: 'center',
                            p: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              background: '#f1f5f9',
                              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        >
                          <item.icon 
                            sx={{ 
                              fontSize: 32, 
                              color: item.color,
                              mb: 1,
                            }} 
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'white',
                              fontWeight: 600,
                              display: 'block',
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Card>
                      </Zoom>
                    </Grid>
                  ))}
                </Grid>

                {/* Key Features */}
                <Stack spacing={2}>
                  {[
                    '📊 Real-time Performance Monitoring',
                    '⚡ Distributed Load Generation',
                    '🔒 Enterprise Security Standards',
                    '📈 Advanced Analytics & Reporting',
                  ].map((feature, index) => (
                    <Slide key={feature} in={animate} direction="right" timeout={1200 + index * 100}>
                      <Box display="flex" alignItems="center">
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 500,
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    </Slide>
                  ))}
                </Stack>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Slide in={animate} direction="left" timeout={600}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                {/* Header */}
                <Box textAlign="center" sx={{ mb: 4 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    <MonitorHeart sx={{ fontSize: 40, color: 'white' }} />
                  </Avatar>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#1e293b',
                      fontWeight: 800,
                      mb: 1,
                    }}
                  >
                    Welcome Back!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#64748b',
                      mb: 2,
                    }}
                  >
                    Sign in to access your performance testing dashboard
                  </Typography>

                  {/* Success Message */}
                  {location.state?.message && (
                    <Fade in timeout={300}>
                      <Alert 
                        severity="success" 
                        sx={{ 
                          mb: 2,
                          background: '#dcfce7',
                          border: '1px solid #bbf7d0',
                          color: '#16a34a',
                        }}
                      >
                        {location.state.message}
                      </Alert>
                    </Fade>
                  )}

                  {/* Error Message */}
                  {error && (
                    <Fade in timeout={300}>
                      <Alert 
                        severity="error" 
                        sx={{ 
                          mb: 2,
                          background: '#fee2e2',
                          border: '1px solid #fecaca',
                          color: '#dc2626',
                        }}
                      >
                        {error}
                      </Alert>
                    </Fade>
                  )}
                </Box>

                {/* Login Form */}
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        background: 'white',
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e1',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#64748b',
                        '&.Mui-focused': {
                          color: '#667eea',
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: '#1e293b',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#64748b' }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        background: 'white',
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e1',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#64748b',
                        '&.Mui-focused': {
                          color: '#667eea',
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: '#1e293b',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#64748b' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#64748b' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Loading Progress */}
                  {isLoading && (
                    <LinearProgress
                      sx={{
                        mb: 3,
                        borderRadius: 2,
                        height: 4,
                        background: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        },
                      }}
                    />
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      mb: 3,
                      py: 2,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      position: 'relative',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)',
                      },
                      '&:disabled': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.5)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    startIcon={
                      isLoading ? (
                        <CircularProgress size={20} sx={{ color: 'white' }} />
                      ) : (
                        <RocketLaunch />
                      )
                    }
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  {/* Social Login */}
                  <Box sx={{ mb: 3 }}>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 2 }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', px: 2 }}>
                        Or continue with
                      </Typography>
                    </Divider>
                    <Stack direction="row" spacing={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Google />}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          color: 'white',
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          '&:hover': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            background: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        Google
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GitHub />}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          color: 'white',
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          '&:hover': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            background: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        GitHub
                      </Button>
                    </Stack>
                  </Box>

                  {/* Footer Links */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Link
                      href="#"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                          color: 'white',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Forgot password?
                    </Link>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Don't have an account?{' '}
                      <Link
                        component={RouterLink}
                        to="/signup"
                        sx={{
                          color: '#667eea',
                          textDecoration: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </Stack>
                </Box>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
