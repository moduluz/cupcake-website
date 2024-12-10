import React, { useState, useEffect } from 'react';
import { 
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Divider,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto',
  padding: theme.spacing(2)
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px'
});

const ErrorContainer = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  padding: theme.spacing(2)
}));

const InfoSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3)
}));

const ProfileOverview = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout, isAuthenticated } = useAuth(); // Added isAuthenticated from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Attempting to fetch profile with token:', token);

        if (!token) {
          throw new Error('No token found, please log in');
        }

        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        console.log('Profile response status:', response.status);

        if (response.status === 401) {
          console.log('Unauthorized access, redirecting to login');
          logout();
          navigate('/login');
          return;
        }

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Error response:', errorData);
          throw new Error(errorData || 'Failed to fetch profile');
        }

        const data = await response.json();
        console.log('Successfully fetched profile data:', data);
        setProfileData(data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.message);

        if (err.message.includes('401') || err.message.includes('auth')) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, logout, navigate]);

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer variant="body1">
        Error: {error}
      </ErrorContainer>
    );
  }

  const userData = profileData || user;

  if (!userData) {
    return (
      <Typography variant="body1" sx={{ p: 2 }}>
        No user information available
      </Typography>
    );
  }

  return (
    <StyledCard>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontSize: '2rem',
              bgcolor: 'primary.main'
            }}
          >
            {userData.username?.charAt(0)?.toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="h5" component="h2">
            {userData.username}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle1" color="text.secondary">
            Member since {new Date(userData.created_at).toLocaleDateString()}
          </Typography>
        }
      />
      <CardContent>
        <InfoSection>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body1">
            Email: {userData.email}
          </Typography>
        </InfoSection>
        
        <Divider sx={{ my: 2 }} />
        
        <InfoSection>
          <Typography variant="h6" gutterBottom>
            Account Details
          </Typography>
          <Typography variant="body1" paragraph>
            Role: {userData.role || 'Customer'}
          </Typography>
          <Typography variant="body1">
            User ID: {userData.id}
          </Typography>
        </InfoSection>
      </CardContent>
    </StyledCard>
  );
};

export default ProfileOverview;