import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the custom hook
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Access user data from context
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('bakeryCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [user, navigate]);

  // If no cart items, redirect back to menu
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('bakeryCart', JSON.stringify(cart));
  }, [cart]);

  const handleDeliveryAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCart(prevCart =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id) => {
    setCart(prevCart => prevCart.filter((item) => item.id !== id));
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const handlePlaceOrder = async () => {
    if (!deliveryAddress || !paymentMethod) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to place an order');
      }

      const orderData = {
        total_amount: calculateTotal(),
        delivery_address: deliveryAddress,
        payment_method: paymentMethod
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to place order');
      }

      // Clear cart and redirect on success
      localStorage.removeItem('bakeryCart');
      navigate('/confirmation');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Delivery Address
              </Typography>
              <TextField
                label="Address"
                variant="outlined"
                value={deliveryAddress}
                onChange={handleDeliveryAddressChange}
                fullWidth
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Payment
              </Typography>
              <Select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="card">Credit/Debit Card</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="cod">Cash on Delivery</MenuItem>
              </Select>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Your Order
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell align="right">₹{item.price}</TableCell>
                  <TableCell align="right">₹{calculateItemTotal(item)}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  Total:
                </TableCell>
                <TableCell align="right">₹{calculateTotal().toFixed(2)}</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/fullmenu')}
          >
            Continue Shopping
          </Button>
        </Grid>
      </Grid>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Checkout;
