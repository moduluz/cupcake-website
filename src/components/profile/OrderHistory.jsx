// src/components/profile/OrderHistory.jsx
import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  LocalMall as OrderIcon
} from '@mui/icons-material';

const OrderHistory = () => {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-03-15",
      items: ["2x Chocolate Cupcake", "1x Vanilla Muffin"],
      total: 12.99,
      status: "Delivered"
    },
    {
      id: "ORD-002",
      date: "2024-03-10",
      items: ["4x Red Velvet Cupcake", "2x Blueberry Muffin"],
      total: 24.99,
      status: "Delivered"
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">
          Order History
        </Typography>
        <Box display="flex" alignItems="center">
          <OrderIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography color="text.secondary">
            {orders.length} Orders
          </Typography>
        </Box>
      </Box>

      {orders.map((order) => (
        <Paper key={order.id} elevation={2} sx={{ mb: 3, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Box>
                  <Typography variant="h6">{order.id}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <CalendarIcon sx={{ fontSize: 'small', mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {order.date}
                    </Typography>
                  </Box>
                </Box>
                <Box textAlign="right">
                  <Typography variant="h6">${order.total}</Typography>
                  <Chip 
                    label={order.status} 
                    color="success" 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Items
              </Typography>
              {order.items.map((item, index) => (
                <Typography key={index} variant="body2">
                  {item}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default OrderHistory;

