import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();

  const handleReturnToMenu = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for your order! Your order is being processed.
      </Typography>
      <Button
        onClick={handleReturnToMenu}
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
      >
        Return to Home
      </Button>
    </Container>
  );
};

export default Confirmation;