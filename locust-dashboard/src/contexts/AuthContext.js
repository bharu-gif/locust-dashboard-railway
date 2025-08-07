import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configure API base URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-railway-app-name.railway.app' 
    : 'http://localhost:8000');

// Utility function to safely extract error messages
const extractErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.response?.data) {
    const data = error.response.data;
    
    // Handle FastAPI validation errors (array format)
    if (Array.isArray(data)) {
      return data.map(err => err.msg || err.message || 'Invalid input').join(', ');
    }
    
    // Handle FastAPI HTTPException with detail
    if (data.detail) {
      if (typeof data.detail === 'string') {
        return data.detail;
      }
      if (Array.isArray(data.detail)) {
        return data.detail.map(err => 
          typeof err === 'string' ? err : (err.msg || err.message || 'Invalid input')
        ).join(', ');
      }
    }
    
    // Handle other message formats
    if (data.message) {
      return typeof data.message === 'string' ? data.message : 'An error occurred';
    }
  }
  
  // Fallback to error message or default
  return error?.message || 'An unexpected error occurred';
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      axios.get(`${API_BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email, apiUrl: API_BASE_URL });
      console.log('Full API URL:', `${API_BASE_URL}/api/login`);
      
      const response = await axios.post(`${API_BASE_URL}/api/login`, { 
        email, 
        password 
      });
      
      console.log('Login response:', response.data);
      
      const { access_token } = response.data;
      
      // Store token
      localStorage.setItem('token', access_token);
      
      // Get user info
      const userResponse = await axios.get(`${API_BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      
      // Check for network errors specifically
      if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        return { 
          success: false, 
          error: 'Unable to connect to server. Please check if the backend is running.'
        };
      }
      
      return { 
        success: false, 
        error: extractErrorMessage(error) || 'Login failed'
      };
    }
  };

  const signup = async (email, password, full_name) => {
    try {
      console.log('Attempting signup with:', { email, full_name, apiUrl: API_BASE_URL });
      console.log('Full API URL:', `${API_BASE_URL}/api/signup`);
      
      await axios.post(`${API_BASE_URL}/api/signup`, { 
        email, 
        password, 
        full_name 
      });
      
      // After successful signup, login the user
      return await login(email, password);
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      
      // Check for network errors specifically
      if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        return { 
          success: false, 
          error: 'Unable to connect to server. Please check if the backend is running.'
        };
      }
      
      return { 
        success: false, 
        error: extractErrorMessage(error) || 'Signup failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
