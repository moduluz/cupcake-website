import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  IconButton,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ShoppingCart, Close, Add, Remove } from '@mui/icons-material';


const GradientBackground = styled(Box)({
  background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  minHeight: '100vh',
  padding: '40px 0',
});

const ModernCard = styled(Card)({
  transition: 'all 0.3s ease',
  borderRadius: '16px',
  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
  },
});

const CartBubble = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '50px',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  zIndex: 1000,
  cursor: 'pointer',
}));

// Menu data
const menuCategories = {
  cheesecakes: {
    title: 'Signature Cheesecakes',
    items: [
      {
        id: 1,
        title: 'Classic New York',
        description: 'Rich and creamy traditional cheesecake with graham cracker crust',
        price: 299,
        image: 'https://source.unsplash.com/300x300/?cheesecake',
      },
      {
        id: 2,
        title: 'Blueberry Swirl',
        description: 'Swirled with fresh blueberry compote throughout',
        price: 349,
        image: 'https://source.unsplash.com/300x300/?blueberry-cheesecake',
      },
      {
        id: 3,
        title: 'Chocolate Marble',
        description: 'Classic cheesecake marbled with rich Belgian chocolate',
        price: 379,
        image: 'https://source.unsplash.com/300x300/?chocolate-cheesecake',
      },
    ],
  },
  layerCakes: {
    title: 'Layer Cakes',
    items: [
      {
        id: 4,
        title: 'Red Velvet',
        description: 'Three layers of moist red velvet with cream cheese frosting',
        price: 499,
        image: 'https://source.unsplash.com/300x300/?red-velvet-cake',
      },
      {
        id: 5,
        title: 'Dark Chocolate',
        description: 'Rich chocolate layers with chocolate ganache filling',
        price: 549,
        image: 'https://source.unsplash.com/300x300/?chocolate-cake',
      },
      {
        id: 6,
        title: 'Vanilla Bean',
        description: 'Light vanilla cake with Madagascar vanilla bean buttercream',
        price: 479,
        image: 'https://source.unsplash.com/300x300/?vanilla-cake',
      },
    ],
  },
  cupcakes: {
    title: 'Gourmet Cupcakes',
    items: [
      {
        id: 7,
        title: 'Salted Caramel',
        description: 'Vanilla cupcake filled with caramel, topped with sea salt',
        price: 99,
        image: 'https://source.unsplash.com/300x300/?caramel-cupcake',
      },
      {
        id: 8,
        title: 'Lemon Raspberry',
        description: 'Lemon cupcake with raspberry filling and lemon buttercream',
        price: 109,
        image: 'https://source.unsplash.com/300x300/?raspberry-cupcake',
      },
      {
        id: 9,
        title: 'Triple Chocolate',
        description: 'Chocolate cupcake with chocolate filling and chocolate frosting',
        price: 119,
        image: 'https://source.unsplash.com/300x300/?chocolate-cupcake',
      },
    ],
  },
};

const FullMenu = () => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage
    const savedCart = localStorage.getItem('bakeryCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const navigate = useNavigate();

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('bakeryCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) }
          : cartItem
      );
      
      // Remove item if quantity becomes 0
      return updatedCart.filter((cartItem) => cartItem.quantity > 0);
    });
  };

  const getItemQuantityInCart = (itemId) => {
    const cartItem = cart.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const navigateToCheckout = () => {
    navigate('/checkout');
  };

  const clearCart = (e) => {
    e.stopPropagation();
    setCart([]);
    localStorage.removeItem('bakeryCart');
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCartValue = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            mb: 6,
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Sweet Delights Bakery
        </Typography>

        {Object.entries(menuCategories).map(([category, { title, items }]) => (
          <Box key={category} sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              align="center"
              sx={{
                mb: 4,
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {title}
            </Typography>

            <Grid container spacing={4}>
              {items.map((item) => {
                const itemQuantity = getItemQuantityInCart(item.id);
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <ModernCard>
                      <CardMedia
                        component="img"
                        height="260"
                        image={item.image}
                        alt={item.title}
                        sx={{ objectFit: 'cover' }}
                      />

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h3">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {item.description}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="h6" color="primary">
                            ₹{item.price}
                          </Typography>

                          {itemQuantity === 0 ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => addToCart(item)}
                            >
                              Add to Cart
                            </Button>
                          ) : (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid',
                                borderColor: 'primary.main',
                                borderRadius: '4px',
                              }}
                            >
                              <IconButton
                                color="primary"
                                onClick={() => removeFromCart(item.id)}
                                size="small"
                              >
                                <Remove />
                              </IconButton>
                              <Typography
                                variant="body1"
                                sx={{ mx: 2, color: 'primary.main' }}
                              >
                                {itemQuantity}
                              </Typography>
                              <IconButton
                                color="primary"
                                onClick={() => addToCart(item)}
                                size="small"
                              >
                                <Add />
                              </IconButton>
                            </Box>
                          )}
                        </Box>
                      </CardContent>
                    </ModernCard>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}

        {/* Cart Bubble */}
        {cart.length > 0 && (
          <CartBubble onClick={navigateToCheckout}>
            <Badge badgeContent={totalCartItems} color="error" sx={{ mr: 2 }}>
              <ShoppingCart />
            </Badge>
            <Typography variant="body1" sx={{ mr: 2 }}>
              ₹{totalCartValue}
            </Typography>
            <IconButton
              size="small"
              color="inherit"
              onClick={clearCart}
            >
              <Close fontSize="small" />
            </IconButton>
          </CartBubble>
        )}
      </Container>
    </GradientBackground>
  );
};

export default FullMenu;
