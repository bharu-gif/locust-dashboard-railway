import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Save,
  Refresh,
  Notifications,
  Security,
  Palette,
  Storage,
  Delete,
  Edit,
} from '@mui/icons-material';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      browser: true,
      testComplete: true,
      errorAlert: true,
    },
    performance: {
      refreshInterval: 5,
      maxDataPoints: 1000,
      autoScroll: true,
    },
    appearance: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC',
    },
    security: {
      sessionTimeout: 30,
      requireMFA: false,
      passwordExpiry: 90,
    },
  });

  const [saved, setSaved] = useState(false);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetDefaults = () => {
    setSettings({
      notifications: {
        email: true,
        browser: true,
        testComplete: true,
        errorAlert: true,
      },
      performance: {
        refreshInterval: 5,
        maxDataPoints: 1000,
        autoScroll: true,
      },
      appearance: {
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
      },
      security: {
        sessionTimeout: 30,
        requireMFA: false,
        passwordExpiry: 90,
      },
    });
    setSaved(false);
  };

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      permissions: ['read', 'write'],
    },
    {
      id: 2,
      name: 'Development API Key',
      created: '2024-01-10',
      lastUsed: '2024-01-19',
      permissions: ['read'],
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Settings</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleResetDefaults}
            sx={{ mr: 2 }}
          >
            Reset Defaults
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Notifications sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.email}
                    onChange={(e) =>
                      handleSettingChange('notifications', 'email', e.target.checked)
                    }
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.browser}
                    onChange={(e) =>
                      handleSettingChange('notifications', 'browser', e.target.checked)
                    }
                  />
                }
                label="Browser Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.testComplete}
                    onChange={(e) =>
                      handleSettingChange('notifications', 'testComplete', e.target.checked)
                    }
                  />
                }
                label="Test Completion Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.errorAlert}
                    onChange={(e) =>
                      handleSettingChange('notifications', 'errorAlert', e.target.checked)
                    }
                  />
                }
                label="Error Alerts"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Performance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Storage sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Performance</Typography>
              </Box>
              <TextField
                fullWidth
                label="Refresh Interval (seconds)"
                type="number"
                value={settings.performance.refreshInterval}
                onChange={(e) =>
                  handleSettingChange('performance', 'refreshInterval', parseInt(e.target.value))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Max Data Points"
                type="number"
                value={settings.performance.maxDataPoints}
                onChange={(e) =>
                  handleSettingChange('performance', 'maxDataPoints', parseInt(e.target.value))
                }
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.performance.autoScroll}
                    onChange={(e) =>
                      handleSettingChange('performance', 'autoScroll', e.target.checked)
                    }
                  />
                }
                label="Auto-scroll Charts"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Appearance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Palette sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Appearance</Typography>
              </Box>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={settings.appearance.theme}
                  label="Theme"
                  onChange={(e) =>
                    handleSettingChange('appearance', 'theme', e.target.value)
                  }
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="auto">Auto</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.appearance.language}
                  label="Language"
                  onChange={(e) =>
                    handleSettingChange('appearance', 'language', e.target.value)
                  }
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={settings.appearance.timezone}
                  label="Timezone"
                  onChange={(e) =>
                    handleSettingChange('appearance', 'timezone', e.target.value)
                  }
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">EST</MenuItem>
                  <MenuItem value="PST">PST</MenuItem>
                  <MenuItem value="CET">CET</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Security */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Security sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Security</Typography>
              </Box>
              <TextField
                fullWidth
                label="Session Timeout (minutes)"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password Expiry (days)"
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) =>
                  handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))
                }
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.requireMFA}
                    onChange={(e) =>
                      handleSettingChange('security', 'requireMFA', e.target.checked)
                    }
                  />
                }
                label="Require Multi-Factor Authentication"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* API Keys */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">API Keys</Typography>
                <Button variant="outlined" size="small">
                  Generate New Key
                </Button>
              </Box>
              <List>
                {apiKeys.map((key, index) => (
                  <React.Fragment key={key.id}>
                    <ListItem>
                      <ListItemText
                        primary={key.name}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Created: {key.created} | Last used: {key.lastUsed}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              {key.permissions.map((permission) => (
                                <Chip
                                  key={permission}
                                  label={permission}
                                  size="small"
                                  variant="outlined"
                                  sx={{ mr: 1 }}
                                />
                              ))}
                            </Box>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" size="small" sx={{ mr: 1 }}>
                          <Edit />
                        </IconButton>
                        <IconButton edge="end" size="small" color="error">
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < apiKeys.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
