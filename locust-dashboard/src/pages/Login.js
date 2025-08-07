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
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  RocketLaunch,
  Google,
  GitHub,
  FingerprintOutlined,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        // Ensure error is always a string
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={600}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'white',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box textAlign="center" sx={{ mb: 4 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <RocketLaunch sx={{ fontSize: 32, color: 'white' }} />
              </Avatar>
              
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 1,
                }}
              >
                Welcome Back
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#666',
                  fontWeight: 400,
                }}
              >
                Sign in to continue your testing journey
              </Typography>
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                {typeof error === 'string' ? error : 'An error occurred. Please try again.'}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#666' }} />
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
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#666' }}
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
                  py: 2,
                  mb: 3,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                  },
                  '&:disabled': {
                    background: '#ccc',
                  },
                }}
                startIcon={isLoading ? null : <FingerprintOutlined />}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Divider sx={{ mb: 3, color: '#666' }}>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Or continue with
                </Typography>
              </Divider>

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    color: '#666',
                    borderColor: '#ddd',
                    '&:hover': {
                      borderColor: '#667eea',
                      color: '#667eea',
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
                    color: '#666',
                    borderColor: '#ddd',
                    '&:hover': {
                      borderColor: '#667eea',
                      color: '#667eea',
                    },
                  }}
                >
                  GitHub
                </Button>
              </Stack>

              <Box textAlign="center">
                <Typography variant="body2" sx={{ color: '#666' }}>
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
                    Sign up here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
