import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Avatar, 
  Divider, 
  Typography 
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileOverview = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('No authentication token found, redirect to login');
          logout();
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Profile fetch response:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Full error response:', errorText);
          throw new Error(`Failed to fetch profile: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [logout, navigate]);  // Removed user dependency to avoid unnecessary re-fetches

  if (loading) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <CardContent>
          <Typography align="center">Loading profile...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <CardContent>
          <Typography color="error" align="center">
            Error: {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const userData = profileData || user;

  if (!userData) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <CardContent>
          <Typography align="center">No user information available</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            {userData.username?.charAt(0)?.toUpperCase()}
          </Avatar>
        }
        title={<Typography variant="h5" fontWeight="bold">{userData.username}</Typography>}
        subheader={`Member since ${new Date(userData.created_at).toLocaleDateString()}`}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>Contact Information</Typography>
        <Typography>Email: {userData.email}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>Account Details</Typography>
        <Typography>Role: {userData.role || 'Customer'}</Typography>
        <Typography>User ID: {userData.id}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;