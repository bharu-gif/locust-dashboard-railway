import React, { useState } from 'react';
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
  FormControlLabel,
  Checkbox,
  LinearProgress,
  CircularProgress,
  Card,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Google,
  GitHub,
  PersonAdd,
  Security,
  Speed,
  Analytics,
  CloudUpload,
  RocketLaunch,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function AdvancedSignup() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [currentStep] = useState(0);
  const { signup } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!formData.full_name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signup(formData.email, formData.password, formData.full_name);
      if (result.success) {
        // Redirect to login page after successful signup
        navigate('/login', { 
          state: { 
            message: result.message || 'Account created successfully! Please login.',
            email: formData.email 
          }
        });
      } else {
        const errorMsg = typeof result.error === 'string' ? result.error : 'Signup failed. Please try again.';
        setError(errorMsg);
      }
    } catch (err) {
      console.error('Signup catch error:', err);
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const performanceFeatures = [
    {
      icon: Speed,
      title: 'High Performance',
      description: 'Lightning-fast load testing with optimized resource usage',
      color: '#4caf50'
    },
    {
      icon: Analytics,
      title: 'Advanced Analytics',
      description: 'Real-time insights and comprehensive performance reports',
      color: '#2196f3'
    },
    {
      icon: Security,
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption',
      color: '#9c27b0'
    },
    {
      icon: CloudUpload,
      title: 'Cloud Scalability',
      description: 'Unlimited scalability with distributed load generation',
      color: '#ff9800'
    },
  ];

  const steps = ['Account Details', 'Verification', 'Complete'];

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return { strength: 0, label: '', color: '#ccc' };
    if (password.length < 4) return { strength: 25, label: 'Weak', color: '#f44336' };
    if (password.length < 6) return { strength: 50, label: 'Fair', color: '#ff9800' };
    if (password.length < 8) return { strength: 75, label: 'Good', color: '#2196f3' };
    return { strength: 100, label: 'Strong', color: '#4caf50' };
  };

  const strength = passwordStrength();

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
          {/* Left Side - Features & Benefits */}
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
                      Join Locust Pro
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#64748b',
                        fontWeight: 600,
                      }}
                    >
                      Performance Testing Excellence
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
                  🎯 Start Your Performance Journey
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#64748b',
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  Join thousands of developers and QA engineers who trust our platform 
                  for mission-critical performance testing and monitoring solutions.
                </Typography>

                {/* Feature Cards */}
                <Grid container spacing={2} mb={4}>
                  {performanceFeatures.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={feature.title}>
                      <Zoom in={animate} timeout={1000 + index * 100}>
                        <Card
                          sx={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: 3,
                            p: 3,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              background: '#f1f5f9',
                              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        >
                          <Box display="flex" alignItems="flex-start" mb={2}>
                            <Avatar
                              sx={{
                                width: 50,
                                height: 50,
                                background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                                mr: 2,
                              }}
                            >
                              <feature.icon sx={{ fontSize: 24, color: 'white' }} />
                            </Avatar>
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: '#1e293b',
                                  fontWeight: 700,
                                  mb: 1,
                                }}
                              >
                                {feature.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#64748b',
                                  lineHeight: 1.4,
                                }}
                              >
                                {feature.description}
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Zoom>
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
                      <Box display="flex" alignItems="center">
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            fontWeight: 500,
                          }}
                        >
                          {indicator}
                        </Typography>
                      </Box>
                    </Slide>
                  ))}
                </Stack>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Signup Form */}
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
                    <PersonAdd sx={{ fontSize: 40, color: 'white' }} />
                  </Avatar>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#1e293b',
                      fontWeight: 800,
                      mb: 1,
                    }}
                  >
                    Create Account
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#64748b',
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
                              color: '#64748b',
                              '&.Mui-active': {
                                color: '#1e293b',
                              },
                              '&.Mui-completed': {
                                color: '#4caf50',
                              },
                            },
                            '& .MuiStepIcon-root': {
                              color: '#e2e8f0',
                              '&.Mui-active': {
                                color: '#667eea',
                              },
                              '&.Mui-completed': {
                                color: '#4caf50',
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
                          background: 'rgba(244, 67, 54, 0.1)',
                          border: '1px solid rgba(244, 67, 54, 0.3)',
                          color: '#f44336',
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
                          <Person sx={{ color: '#64748b' }} />
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
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    sx={{
                      mb: 2,
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

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <Box mb={3}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
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
                          height: 4,
                          borderRadius: 2,
                          background: '#e2e8f0',
                          '& .MuiLinearProgress-bar': {
                            background: strength.color,
                            borderRadius: 2,
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
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: '#64748b' }}
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
                          color: '#64748b',
                          '&.Mui-checked': {
                            color: '#667eea',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        I agree to the{' '}
                        <Link href="#" sx={{ color: '#667eea', textDecoration: 'none' }}>
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" sx={{ color: '#667eea', textDecoration: 'none' }}>
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
                        background: '#e2e8f0',
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
                    disabled={isLoading || !agreedToTerms}
                    sx={{
                      mb: 3,
                      py: 2,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      textTransform: 'none',
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
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  {/* Social Signup */}
                  <Box sx={{ mb: 3 }}>
                    <Divider sx={{ borderColor: '#e2e8f0', mb: 2 }}>
                      <Typography variant="caption" sx={{ color: '#64748b', px: 2 }}>
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
                          color: '#64748b',
                          borderColor: '#e2e8f0',
                          background: 'white',
                          '&:hover': {
                            borderColor: '#cbd5e1',
                            background: '#f8fafc',
                            color: '#1e293b',
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
                          color: '#64748b',
                          borderColor: '#e2e8f0',
                          background: 'white',
                          '&:hover': {
                            borderColor: '#cbd5e1',
                            background: '#f8fafc',
                            color: '#1e293b',
                          },
                        }}
                      >
                        GitHub
                      </Button>
                    </Stack>
                  </Box>

                  {/* Footer Link */}
                  <Box textAlign="center">
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      Already have an account?{' '}
                      <Link
                        component={RouterLink}
                        to="/login"
                        sx={{
                          color: '#667eea',
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
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
