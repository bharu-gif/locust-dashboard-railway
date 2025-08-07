import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Container,
  Grid,
  Avatar,
  Fade,
  Slide,
  Stack,
  IconButton,
  InputAdornment,
  Divider,
  Paper,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Google,
  GitHub,
  RocketLaunch,
  Speed,
  Analytics,
  Security,
  TrendingUp,
  Assessment,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NewLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: RocketLaunch,
      title: 'High Performance',
      description: 'Lightning-fast load testing with optimized resource usage',
      color: '#3b82f6',
    },
    {
      icon: Analytics,
      title: 'Advanced Analytics',
      description: 'Real-time insights and comprehensive performance reports',
      color: '#10b981',
    },
    {
      icon: Security,
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption',
      color: '#8b5cf6',
    },
    {
      icon: Assessment,
      title: 'Smart Monitoring',
      description: 'Intelligent monitoring with predictive analytics',
      color: '#f59e0b',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Features */}
          <Grid item xs={12} md={6}>
            <Fade in={animate} timeout={800}>
              <Box>
                {/* Brand Header */}
                <Box sx={{ mb: 6 }}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        mr: 2,
                        fontSize: '2rem',
                      }}
                    >
                      🚀
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          color: 'white',
                          fontWeight: 800,
                          mb: 0.5,
                        }}
                      >
                        Locust Pro
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontWeight: 400,
                        }}
                      >
                        Performance Testing Excellence
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    🎯 The Ultimate Load Testing Platform
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      mb: 4,
                    }}
                  >
                    Join thousands of developers and QA engineers who trust our platform
                    for mission-critical performance testing and monitoring solutions.
                  </Typography>
                </Box>

                {/* Features Grid */}
                <Grid container spacing={3}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={feature.title}>
                      <Slide in={animate} direction="right" timeout={1000 + index * 100}>
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              background: 'rgba(255, 255, 255, 0.15)',
                            },
                          }}
                        >
                          <Box display="flex" alignItems="flex-start">
                            <Avatar
                              sx={{
                                width: 48,
                                height: 48,
                                bgcolor: feature.color,
                                mr: 2,
                              }}
                            >
                              <feature.icon sx={{ fontSize: 24, color: 'white' }} />
                            </Avatar>
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: 'white',
                                  fontWeight: 700,
                                  mb: 1,
                                }}
                              >
                                {feature.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.8)',
                                  lineHeight: 1.5,
                                }}
                              >
                                {feature.description}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </Slide>
                    </Grid>
                  ))}
                </Grid>

                {/* Trust Indicators */}
                <Box sx={{ mt: 4 }}>
                  <Stack spacing={2}>
                    {[
                      '✨ Trusted by 10,000+ developers worldwide',
                      '🔒 SOC 2 Type II certified security',
                      '⚡ 99.9% uptime SLA guarantee',
                      '🎯 Free tier with advanced features',
                    ].map((indicator, index) => (
                      <Slide key={indicator} in={animate} direction="right" timeout={1200 + index * 100}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {indicator}
                        </Typography>
                      </Slide>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Slide in={animate} direction="left" timeout={600}>
              <Card
                sx={{
                  maxWidth: 400,
                  mx: 'auto',
                  borderRadius: 3,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  background: 'white',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Header */}
                  <Box textAlign="center" sx={{ mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: '#3b82f6',
                      }}
                    >
                      <LoginIcon sx={{ fontSize: 32, color: 'white' }} />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#111827',
                        fontWeight: 800,
                        mb: 1,
                      }}
                    >
                      Welcome Back
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#6b7280',
                        mb: 3,
                      }}
                    >
                      Sign in to your performance testing dashboard
                    </Typography>
                  </Box>

                  {/* Error Alert */}
                  {error && (
                    <Fade in timeout={300}>
                      <Alert
                        severity="error"
                        sx={{
                          mb: 3,
                          borderRadius: 2,
                        }}
                      >
                        {error}
                      </Alert>
                    </Fade>
                  )}

                  {/* Login Form */}
                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#6b7280' }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#6b7280' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isLoading}
                      sx={{
                        mb: 3,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: '#3b82f6',
                        fontWeight: 700,
                        fontSize: '1rem',
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: '#2563eb',
                        },
                      }}
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    {/* Social Login */}
                    <Box sx={{ mb: 3 }}>
                      <Divider sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: '#6b7280', px: 2 }}>
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
                            borderColor: '#d1d5db',
                            color: '#374151',
                            '&:hover': {
                              borderColor: '#9ca3af',
                              bgcolor: '#f9fafb',
                            },
                            textTransform: 'none',
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
                            borderColor: '#d1d5db',
                            color: '#374151',
                            '&:hover': {
                              borderColor: '#9ca3af',
                              bgcolor: '#f9fafb',
                            },
                            textTransform: 'none',
                          }}
                        >
                          GitHub
                        </Button>
                      </Stack>
                    </Box>

                    {/* Footer Link */}
                    <Box textAlign="center">
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        Don't have an account?{' '}
                        <Link
                          component={RouterLink}
                          to="/signup"
                          sx={{
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Sign up here
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
