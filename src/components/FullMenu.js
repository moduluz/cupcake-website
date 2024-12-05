// FullMenu.js
import React from "react";
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent,
  Divider,
  Box,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledSection = styled("section")({
  padding: "80px 0",
  backgroundColor: "#f5fffa",
  minHeight: "100vh"
});

const menuCategories = {
  cheesecakes: {
    title: "Signature Cheesecakes",
    items: [
      {
        id: 1,
        title: "Classic New York",
        description: "Rich and creamy traditional cheesecake with graham cracker crust",
        price: "₹299",
        image: "https://source.unsplash.com/300x300/?cheesecake"
      },
      {
        id: 2,
        title: "Blueberry Swirl",
        description: "Swirled with fresh blueberry compote throughout",
        price: "₹349",
        image: "https://source.unsplash.com/300x300/?blueberry-cheesecake"
      },
      {
        id: 3,
        title: "Chocolate Marble",
        description: "Classic cheesecake marbled with rich Belgian chocolate",
        price: "₹379",
        image: "https://source.unsplash.com/300x300/?chocolate-cheesecake"
      }
    ]
  },
  layerCakes: {
    title: "Layer Cakes",
    items: [
      {
        id: 4,
        title: "Red Velvet",
        description: "Three layers of moist red velvet with cream cheese frosting",
        price: "₹499",
        image: "https://source.unsplash.com/300x300/?red-velvet-cake"
      },
      {
        id: 5,
        title: "Dark Chocolate",
        description: "Rich chocolate layers with chocolate ganache filling",
        price: "₹549",
        image: "https://source.unsplash.com/300x300/?chocolate-cake"
      },
      {
        id: 6,
        title: "Vanilla Bean",
        description: "Light vanilla cake with Madagascar vanilla bean buttercream",
        price: "₹479",
        image: "https://source.unsplash.com/300x300/?vanilla-cake"
      }
    ]
  },
  cupcakes: {
    title: "Gourmet Cupcakes",
    items: [
      {
        id: 7,
        title: "Salted Caramel",
        description: "Vanilla cupcake filled with caramel, topped with sea salt",
        price: "₹99",
        image: "https://source.unsplash.com/300x300/?caramel-cupcake"
      },
      {
        id: 8,
        title: "Lemon Raspberry",
        description: "Lemon cupcake with raspberry filling and lemon buttercream",
        price: "₹109",
        image: "https://source.unsplash.com/300x300/?raspberry-cupcake"
      },
      {
        id: 9,
        title: "Triple Chocolate",
        description: "Chocolate cupcake with chocolate filling and chocolate frosting",
        price: "₹119",
        image: "https://source.unsplash.com/300x300/?chocolate-cupcake"
      }
    ]
  }
};

const FullMenu = () => {
  return (
    <StyledSection>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-start" sx={{ mb: 4 }}>
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            color="primary"
            size="large"
          >
            &lt;&lt; Back to Home
          </Button>
        </Box>

        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          align="center" 
          sx={{ mb: 6 }}
        >
          Our Complete Menu
        </Typography>
        
        {Object.entries(menuCategories).map(([category, { title, items }]) => (
          <Box key={category} sx={{ mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              align="center" 
              sx={{ mb: 4 }}
            >
              {title}
            </Typography>
            
            <Grid container spacing={4}>
              {items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.03)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="260"
                      image={item.image}
                      alt={item.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
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
                      <Typography variant="h6" color="primary">
                        {item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {category !== Object.keys(menuCategories).slice(-1)[0] && (
              <Divider sx={{ my: 8 }} />
            )}
          </Box>
        ))}
        
        <Box 
          sx={{ 
            bgcolor: 'background.paper', 
            p: 4, 
            borderRadius: 2, 
            boxShadow: 1,
            mt: 8 
          }}
        >
          <Typography 
            variant="h4" 
            component="h3" 
            gutterBottom 
            align="center"
          >
            Custom Orders
          </Typography>
          <Typography align="center" color="text.secondary">
            Want something special? We take custom orders for all occasions with 48 hours notice.
            Contact us to discuss your dream cake!
          </Typography>
        </Box>
      </Container>
    </StyledSection>
  );
};

export default FullMenu;