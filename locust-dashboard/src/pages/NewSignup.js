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
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  PersonAdd,
  Google,
  GitHub,
  RocketLaunch,
  Speed,
  Analytics,
  Security,
  Assessment,
  CloudUpload,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NewSignup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      await signup(formData.email, formData.password, formData.full_name);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
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
      icon: CloudUpload,
      title: 'Cloud Scalability',
      description: 'Unlimited scalability with distributed load generation',
      color: '#f59e0b',
    },
  ];

  const steps = ['Account Details', 'Verification', 'Complete'];

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, label: '', color: '#e5e7eb' };
    if (password.length < 4) return { strength: 25, label: 'Weak', color: '#ef4444' };
    if (password.length < 6) return { strength: 50, label: 'Fair', color: '#f59e0b' };
    if (password.length < 8) return { strength: 75, label: 'Good', color: '#3b82f6' };
    return { strength: 100, label: 'Strong', color: '#10b981' };
  };

  const strength = passwordStrength();

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
                        Join Locust Pro
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
                    🎯 Start Your Performance Journey
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
                <Grid container spacing={3} mb={4}>
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
            </Fade>
          </Grid>

          {/* Right Side - Signup Form */}
          <Grid item xs={12} md={6}>
            <Slide in={animate} direction="left" timeout={600}>
              <Card
                sx={{
                  maxWidth: 450,
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
                      <PersonAdd sx={{ fontSize: 32, color: 'white' }} />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#111827',
                        fontWeight: 800,
                        mb: 1,
                      }}
                    >
                      Create Account
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#6b7280',
                        mb: 3,
                      }}
                    >
                      Start your performance testing journey today
                    </Typography>

                    {/* Progress Stepper */}
                    <Stepper activeStep={currentStep} sx={{ mb: 3 }}>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel
                            sx={{
                              '& .MuiStepLabel-label': {
                                color: '#6b7280',
                                fontSize: '0.8rem',
                                '&.Mui-active': {
                                  color: '#111827',
                                  fontWeight: 600,
                                },
                                '&.Mui-completed': {
                                  color: '#10b981',
                                },
                              },
                              '& .MuiStepIcon-root': {
                                color: '#e5e7eb',
                                '&.Mui-active': {
                                  color: '#3b82f6',
                                },
                                '&.Mui-completed': {
                                  color: '#10b981',
                                },
                              },
                            }}
                          >
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    {/* Error Message */}
                    {error && (
                      <Fade in timeout={300}>
                        <Alert
                          severity="error"
                          sx={{
                            mb: 2,
                            borderRadius: 2,
                          }}
                        >
                          {error}
                        </Alert>
                      </Fade>
                    )}
                  </Box>

                  {/* Signup Form */}
                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="full_name"
                      value={formData.full_name}
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
                            <Person sx={{ color: '#6b7280' }} />
                          </InputAdornment>
                        ),
                      }}
                    />

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
                        mb: 2,
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

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <Box mb={3}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="caption" sx={{ color: '#6b7280' }}>
                            Password Strength
                          </Typography>
                          <Typography variant="caption" sx={{ color: strength.color, fontWeight: 600 }}>
                            {strength.label}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={strength.strength}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: '#e5e7eb',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: strength.color,
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    )}

                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
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
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* Terms Agreement */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          sx={{
                            color: '#6b7280',
                            '&.Mui-checked': {
                              color: '#3b82f6',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          I agree to the{' '}
                          <Link href="#" sx={{ color: '#3b82f6', textDecoration: 'none' }}>
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="#" sx={{ color: '#3b82f6', textDecoration: 'none' }}>
                            Privacy Policy
                          </Link>
                        </Typography>
                      }
                      sx={{ mb: 3 }}
                    />

                    {/* Loading Progress */}
                    {isLoading && (
                      <LinearProgress
                        sx={{
                          mb: 3,
                          borderRadius: 2,
                          height: 4,
                          bgcolor: '#e5e7eb',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#3b82f6',
                          },
                        }}
                      />
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isLoading || !agreedToTerms}
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
                        '&:disabled': {
                          bgcolor: '#e5e7eb',
                          color: '#9ca3af',
                        },
                      }}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>

                    {/* Social Signup */}
                    <Box sx={{ mb: 3 }}>
                      <Divider sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ color: '#6b7280', px: 2 }}>
                          Or sign up with
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
                        Already have an account?{' '}
                        <Link
                          component={RouterLink}
                          to="/login"
                          sx={{
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Sign in here
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
