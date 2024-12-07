// src/components/profile/Settings.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Lock as SecurityIcon,
  Language as LanguageIcon
} from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    profileVisibility: true,
    orderHistoryPrivacy: true,
    language: 'English',
    timezone: 'UTC-5'
  });

  const handleToggleChange = (setting) => (event) => {
    setSettings(prev => ({
      ...prev,
      [setting]: event.target.checked
    }));
  };

  const handleSelectChange = (setting) => (event) => {
    setSettings(prev => ({
      ...prev,
      [setting]: event.target.value
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h4">Settings</Typography>
      </Box>

      <Paper elevation={2} sx={{ mb: 3, p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <NotificationsIcon color="action" sx={{ mr: 2 }} />
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Box sx={{ ml: 4 }}>
          <FormControlLabel
            control={
              <Switch 
                checked={settings.emailNotifications}
                onChange={handleToggleChange('emailNotifications')}
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch 
                checked={settings.orderUpdates}
                onChange={handleToggleChange('orderUpdates')}
              />
            }
            label="Order Updates"
          />
          <FormControlLabel
            control={
              <Switch 
                checked={settings.promotionalEmails}
                onChange={handleToggleChange('promotionalEmails')}
              />
            }
            label="Promotional Emails"
          />
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ mb: 3, p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <SecurityIcon color="action" sx={{ mr: 2 }} />
          <Typography variant="h6">Privacy</Typography>
        </Box>
        <Box sx={{ ml: 4 }}>
          <FormControlLabel
            control={
              <Switch 
                checked={settings.profileVisibility}
                onChange={handleToggleChange('profileVisibility')}
              />
            }
            label="Profile Visibility"
          />
          <FormControlLabel
            control={
              <Switch 
                checked={settings.orderHistoryPrivacy}
                onChange={handleToggleChange('orderHistoryPrivacy')}
              />
            }
            label="Order History Privacy"
          />
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <LanguageIcon color="action" sx={{ mr: 2 }} />
          <Typography variant="h6">Preferences</Typography>
        </Box>
        <Box sx={{ ml: 4 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={settings.language}
              label="Language"
              onChange={handleSelectChange('language')}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
              <MenuItem value="French">French</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Time Zone</InputLabel>
            <Select
              value={settings.timezone}
              label="Time Zone"
              onChange={handleSelectChange('timezone')}
            >
              <MenuItem value="UTC-5">Eastern Time (UTC-5)</MenuItem>
              <MenuItem value="UTC-6">Central Time (UTC-6)</MenuItem>
              <MenuItem value="UTC-7">Mountain Time (UTC-7)</MenuItem>
              <MenuItem value="UTC-8">Pacific Time (UTC-8)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;